import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1024px;
  margin: auto;
  padding: 50px 0;
  .title {
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 50px;
  }
`;
export const UpdateProfileImageSection = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  .background {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    .closeBtn {
      position: absolute;
      right: 20px;
      top: 20px;
      background-color: transparent;
      border: none;
      border-radius: 5px;
      transition: 0.2s;
      &:hover {
        background-color: #efefef;
      }
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        display: block;
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        margin-bottom: 5px;
      }
      label {
        cursor: pointer;
        margin-bottom: 30px;
      }
      button {
        background-color: transparent;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      }
    }
  }
`;
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .image-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      margin-bottom: 5px;
    }
    span {
      font-size: 12px;
      cursor: pointer;
      color: #dcdcdc;
      transition: 0.2s;
      &:hover {
        color: black;
      }
    }
  }
  .name {
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
  }
  button {
    background-color: white;
    border: none;
    width: 60px;
    height: 20px;
    font-size: 12px;
    padding: 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 5px;
    transition: 0.2s;
    color: #dcdcdc;
    &:hover {
      background-color: #efefef;
      color: black;
    }
  }
`;
export const FeedSection = styled.div`
  .buttonBox {
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    button {
      width: 50%;
      background-color: transparent;
      border: none;
      transition: 0.2s;
      &.on {
        background-color: #efefef;
        font-weight: 600;
      }
    }
  }
`;
export const FeedBox = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      width: calc(25% - 10px);
      aspect-ratio: 1/1;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
