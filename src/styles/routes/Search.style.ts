import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1024px;
  margin: auto;
  padding: 50px 0;
`;
export const Title = styled.h2`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`;
export const Form = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  input {
    width: 300px;
    outline: none;
    border: none;
    border-bottom: 1px solid #dcdcdc;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 5px;
    border-radius: 5px 0 0 5px;
  }
  button {
    width: 100px;
    border: none;
    background-color: #efefef;
    padding: 5px;
    transition: 0.3s;
    border-radius: 0 5px 5px 0;
    border-bottom: 1px solid #dcdcdc;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    &:hover {
      background-color: #dcdcdc;
    }
  }
`;
export const FeedBox = styled.div`
  border-top: 1px solid #dcdcdc;
  padding-top: 20px;
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      width: calc(25% - 10px);
      aspect-ratio: 1/1;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.7;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          scale: 1.1;
          opacity: 1;
        }
      }
    }
  }
`;
