import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 244px;
  height: 100vh;
  padding: 8px 12px 20px 12px;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid #dcdcdc;
  background-color: white;
  @media screen and (max-width: 1023px) {
    width: 72px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 48px;
    padding: 0;
    top: auto;
    bottom: 0;
    border-right: none;
    border-top: 1px solid #dcdcdc;

    button {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    height: 10vw;
    border-top: 0.2083vw solid #dcdcdc;
  }
`;

export const Logo = styled.h1`
  padding: 25px 12px 16px 12px;
  font-size: 20px;
  margin-bottom: 19px;
  font-weight: 900;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const MenuBox = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
export const ButtonBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const MenuButton = styled.li`
  width: 100%;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    transition: 0.3s;
  }
  &:hover {
    background-color: #efefef;
    img {
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 1023px) {
    justify-content: center;
    img {
      margin-right: 0;
    }
    span {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    &:hover {
      background-color: transparent;
    }
  }
  @media screen and (max-width: 480px) {
    border-radius: 1.0417vw;

    a {
      padding: 2.5vw;
      img {
        width: 5vw;
        height: 5vw;
      }
    }
  }
`;
export const MoreWrap = styled.div`
  width: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const MoreButton = styled.button`
  width: 100%;
  display: flex;
  background-color: white;
  border: none;
  transition: 0.3s;
  padding: 12px;
  border-radius: 5px;
  img {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    transition: 0.3s;
  }
  &:hover {
    background-color: #efefef;
    img {
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 1023px) {
    img {
      margin-right: 0;
    }
    span {
      display: none;
    }
  }
`;
export const MoreBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 60px;
  width: 240px;
  padding: 15px 10px;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (max-width: 1023px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
`;
export const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  border: none;
  padding: 12px;
  transition: 0.3s;
  background-color: white;
  &:hover {
    background-color: #efefef;
  }
`;
