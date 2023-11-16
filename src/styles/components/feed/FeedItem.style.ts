import styled from "styled-components";

export const Wrapper = styled.div`
  margin: auto;
  width: 480px;
  padding: 20px;
  margin-bottom: 50px;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (max-width: 480px) {
    width: 95vw;
    padding: 4.1667vw;
    margin-bottom: 10.4167vw;
    border-radius: 1.0417vw;
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
  }
`;
export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #efefef;
  gap: 20px;
  padding: 5px;
  margin-bottom: 10px;
  @media screen and (max-width: 480px) {
    border-bottom: 0.2083vw solid #efefef;
    gap: 4.1667vw;
    padding: 1.0417vw;
    margin-bottom: 2.0833vw;
  }
`;
export const Profile = styled.i`
  font-size: 30px;
  @media screen and (max-width: 480px) {
    font-size: 6.25vw;
  }
`;
export const Name = styled.span`
  font-size: 16px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    font-size: 3.3333vw;
  }
`;
export const MenuButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
`;
export const MenuBox = styled.ul`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: absolute;
  right: 0;
  top: 40px;
  background-color: white;
  z-index: 10;
  li {
    padding: 5px 10px;
    border-bottom: 1px solid #efefef;
    cursor: pointer;
    transition: 0.2s;
    font-size: 14px;
    &:hover {
      background-color: #dcdcdc;
    }
  }
  @media screen and (max-width: 480px) {
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
    top: 8.3333vw;
    li {
      padding: 1.0417vw 2.0833vw;
      border-bottom: 0.2083vw solid #efefef;
      font-size: 2.9167vw;
    }
  }
`;
export const ContentSection = styled.div``;
export const ImageSection = styled.div`
  img {
    display: block;
    width: 100%;
    height: 400px;
    object-fit: contain;
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    color: #dcdcdc;
  }
  .swiper-pagination-bullet {
    background-color: #dcdcdc;
  }
  @media screen and (max-width: 480px) {
    img {
      height: 83.3333vw;
    }
  }
`;
export const OptionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 5px;
  border-bottom: 1px solid #efefef;
  margin-bottom: 5px;
  span {
    font-size: 12px;
  }
  @media screen and (max-width: 480px) {
    padding-bottom: 1.0417vw;
    border-bottom: 0.2083vw solid #efefef;
    margin-bottom: 1.0417vw;
    span {
      font-size: 2.5vw;
    }
  }
`;
export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  i {
    font-size: 22px;
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 2.0833vw;
    i {
      font-size: 4.5833vw;
    }
  }
`;
export const TextSection = styled.div`
  width: 100%;
  font-weight: 300;
  font-size: 14px;
  white-space: pre-wrap;
  margin-bottom: 10px;
  text-align: left;
  @media screen and (max-width: 480px) {
    font-size: 2.9167vw;
    margin-bottom: 2.0833vw;
  }
`;
export const TagSection = styled.ul`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  li {
    font-size: 12px;
    padding: 5px;
    background-color: #efefef;
    border-radius: 5px;
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    gap: 1.0417vw;
    margin-bottom: 2.0833vw;
    li {
      font-size: 2.5vw;
      padding: 1.0417vw;
      border-radius: 1.0417vw;
      cursor: pointer;
    }
  }
`;
export const CommentSection = styled.div`
  span {
    display: block;
    text-align: left;
    font-size: 12px;
    cursor: pointer;
    margin-bottom: 5px;
  }
  ul {
    margin-bottom: 5px;
    li {
      text-align: left;
      font-size: 13px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-bottom: 2px;
      b {
        font-weight: 600;
        margin-right: 10px;
      }
    }
  }
  form {
    input {
      width: 100%;
      border: none;
      font-size: 12px;
      border-bottom: 1px solid #dcdcdc;
      outline: none;
      padding: 5px 0;
    }
  }
  @media screen and (max-width: 480px) {
    span {
      font-size: 2.5vw;
    }
    form {
      input {
        font-size: 2.5vw;
        border-bottom: 0.2083vw solid #dcdcdc;
        padding: 1.0417vw 0;
      }
    }
  }
`;
