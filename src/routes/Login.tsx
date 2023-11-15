import React, { useState } from "react";
import { Button, Form, InfoMsg, Input, Line, Title, Wrapper } from "../styles/routes/Auth.syle";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      toast.error("로딩중입니다.");
      return;
    } else if (inputEmail === "") {
      toast.error("이메일을 입력하세요");
      return;
    } else if (inputPassword === "") {
      toast.error("비밀번호를 입력하세요");
      return;
    }
    try {
      setIsLoading(true);
      const signIn = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      navigate("/");
      toast.success(`${signIn.user.displayName}님 환영합니다.`);
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onLogin}>
        <Title>Login</Title>
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
        <Line></Line>
        <Button className={!isLoading && inputEmail && inputPassword ? "on" : ""}>
          {isLoading ? <i className="xi-spinner-1 xi-spin"></i> : "Login"}
        </Button>
        <InfoMsg>
          <Link to="/create-account">회원가입 페이지로</Link>
        </InfoMsg>
      </Form>
    </Wrapper>
  );
};

export default Login;
