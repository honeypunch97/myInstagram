import React, { useState } from "react";
import { Button, Form, InfoMsg, Input, Line, Title, Wrapper } from "../styles/routes/Auth.syle";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordChk, setInputPasswordChk] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      toast.error("로딩중입니다.");
      return;
    } else if (inputName === "") {
      toast.error("이름을 입력하세요.");
      return;
    } else if (inputEmail === "") {
      toast.error("이메일을 입력하세요.");
      return;
    } else if (inputPassword === "") {
      toast.error("비밀번호를 입력하세요.");
      return;
    } else if (inputPassword !== inputPasswordChk) {
      toast.error("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
      return;
    }

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
      await updateProfile(credentials.user, { displayName: inputName });
      toast.success(`회원가입 완료`);
      toast.success(`${inputName}님 환영합니다.`);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onCreateAccount}>
        <Title>Create Account</Title>
        <Input
          type="text"
          placeholder="Enter Name"
          required
          value={inputName}
          onChange={e => setInputName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter Email"
          required
          value={inputEmail}
          onChange={e => setInputEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          required
          value={inputPassword}
          onChange={e => setInputPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="ReEnter Password"
          required
          value={inputPasswordChk}
          onChange={e => setInputPasswordChk(e.target.value)}
        />
        <Line></Line>
        <Button className={!isLoading && inputName && inputEmail && inputPassword && inputPasswordChk ? "on" : ""}>
          {isLoading ? <i className="xi-spinner-1 xi-spin"></i> : "Create"}
        </Button>
        <InfoMsg>
          <Link to="/login">로그인 페이지로</Link>
        </InfoMsg>
      </Form>
    </Wrapper>
  );
};

export default CreateAccount;
