import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;

    @media screen and (max-width: 480px) {
      font-size: 3.3333vw;
    }
  }
  body{
    
  }
  ul,li{
    list-style: none;
  }
  a{
    text-decoration: none;
    color: black;
  }
  button{
    cursor: pointer;
  }
`;
