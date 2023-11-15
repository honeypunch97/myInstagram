import styled from "styled-components";

export const Wrapper = styled.div`
  margin: auto;
  width: 470px;
  margin-bottom: 50px;
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 2.0833vw;
  }
`;
export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  @media screen and (max-width: 480px) {
    margin-bottom: 2.5vw;
  }
`;
export const Profile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #efefef;
  margin-right: 12px;
  @media screen and (max-width: 480px) {
    width: 6.6667vw;
    height: 6.6667vw;
    margin-right: 2.5vw;
  }
`;
export const Name = styled.div`
  width: 60px;
  height: 16px;
  background-color: #efefef;
  border-radius: 5px;
  @media screen and (max-width: 480px) {
    width: 12.5vw;
    height: 3.3333vw;
    background-color: #efefef;
    border-radius: 1.0417vw;
  }
`;
export const ImgBox = styled.div`
  width: 100%;
  height: 470px;
  background-color: #efefef;
  border-radius: 5px;
  @media screen and (max-width: 480px) {
    width: 100%;
    height: 97.9167vw;
    background-color: #efefef;
    border-radius: 1.0417vw;
  }
`;
