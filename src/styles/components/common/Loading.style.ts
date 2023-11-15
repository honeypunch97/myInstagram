import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;

  @media screen and (max-width: 480px) {
    font-size: 6.25vw;
  }
`;
