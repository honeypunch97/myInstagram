import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Button,
  ButtonBox,
  Logo,
  MenuBox,
  MenuButton,
  MoreBox,
  MoreButton,
  MoreWrap,
  Wrapper,
} from "../../styles/components/common/Layout.style";
import { useState } from "react";
import { auth } from "../../firebase";
import { useSetRecoilState } from "recoil";
import { isAddFeedOnState } from "../../recoil/feed/atoms";

const Layout = () => {
  const setAddFeedOn = useSetRecoilState(isAddFeedOnState);
  const navigate = useNavigate();
  const [isMoreOn, setIsMoreOn] = useState(false);
  const user = auth.currentUser;

  const onLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/");
    }
  };
  const handleGoAddFeed = () => {
    setAddFeedOn(true);
  };
  return (
    <>
      <Wrapper>
        <Logo>
          <Link to="/">MyInstagram</Link>
        </Logo>
        <MenuBox>
          <ButtonBox>
            <MenuButton onClick={() => navigate("/")}>
              <img src="/icon/home_outline.svg" alt="" />
              <span>홈</span>
            </MenuButton>
            <MenuButton onClick={() => navigate("/search")}>
              <img src="/icon/search_outline.svg" alt="" />
              <span>검색</span>
            </MenuButton>
            {user && (
              <MenuButton onClick={handleGoAddFeed}>
                <img src="/icon/add.svg" alt="add" />
                <span>작성</span>
              </MenuButton>
            )}

            {user ? (
              <MenuButton onClick={() => navigate("/profile")}>
                <img src="/icon/user_outline.svg" alt="" />
                <span>프로필</span>
              </MenuButton>
            ) : (
              <MenuButton onClick={() => navigate("/login")}>
                <img src="/icon/login.svg" alt="" />
                <span>로그인</span>
              </MenuButton>
            )}
          </ButtonBox>
          {user && (
            <MoreWrap>
              <MoreButton onClick={() => setIsMoreOn(!isMoreOn)}>
                <img src="/icon/menu.svg" alt="" />
                <span>더 보기</span>
              </MoreButton>
              {isMoreOn && (
                <MoreBox>
                  <Button onClick={onLogOut}>로그아웃</Button>
                </MoreBox>
              )}
            </MoreWrap>
          )}
        </MenuBox>
      </Wrapper>
      <Outlet />
    </>
  );
};

export default Layout;
