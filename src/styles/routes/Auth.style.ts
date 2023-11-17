import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;
export const Form = styled.form`
  width: 480px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 10.4167vw 4.1667vw;
    gap: 3.125vw;
    border-radius: 4.1667vw;
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
  }
`;
export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 50px;
  @media screen and (max-width: 480px) {
    font-size: 5vw;
    margin-bottom: 10.4167vw;
  }
`;
export const Input = styled.input`
  width: 100%;
  text-align: center;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  outline: none;
  &::placeholder {
    font-size: 16px;
  }
  @media screen and (max-width: 480px) {
    border-radius: 1.0417vw;
    padding: 1.0417vw 2.0833vw;
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
    &::placeholder {
      font-size: 3.3333vw;
    }
  }
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
`;
export const Button = styled.button`
  width: 100%;
  text-align: center;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #dcdcdc;
  opacity: 0.3;
  transition: 0.2s;
  cursor: default;
  &.on {
    opacity: 1;
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    border-radius: 1.0417vw;
    padding: 1.0417vw 2.0833vw;
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
  }
`;
export const InfoMsg = styled.p`
  font-size: 12px;
  cursor: pointer;
`;
