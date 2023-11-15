import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
export const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;
export const Container = styled.div`
  position: absolute;
  width: 1024px;
  height: 600px;
  background-color: white;
  display: flex;
  border-radius: 20px;
  @media screen and (max-width: 1023px) {
    width: 95%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 95vh;
  }
  @media screen and (max-width: 480px) {
  }
`;
export const ImageSection = styled.div`
  width: 50%;
  height: 100%;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;
export const SwiperSection = styled.div`
  width: 100%;
  height: 80%;
  padding-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .swiper {
    height: 100%;
  }
  .swiper-slide {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    color: #efefef;
  }
`;
export const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Image = styled.img`
  display: block;
  /*   width: 100%;
  height: 100%; */
  object-fit: contain;
`;
export const PageNationSection = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  gap: 4px;
  .swiper {
    height: 100%;
    width: 100%;
    .swiper-wrapper {
      width: 100%;
    }
  }
`;

export const PageNationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #efefef;
  opacity: 0.6;
  cursor: pointer;
  transition: 0.3s;
  &.on {
    opacity: 1;
  }
`;
export const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dcdcdc;
  transition: 0.3s;
  background-color: transparent;
  &:hover {
    color: black;
  }
`;

export const ContentBox = styled.div`
  width: 50%;
  padding: 20px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
  @media screen and (max-width: 480px) {
    padding: 2.0833vw;
  }
`;
export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  border: none;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: 0.3s;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #efefef;
  }
  @media screen and (max-width: 480px) {
    right: 4.1667vw;
    top: 4.1667vw;
    border: none;
    background-color: white;
    border-radius: 1.0417vw;
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
    transition: 0.3s;
    width: 5.2083vw;
    height: 5.2083vw;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Label = styled.label`
  display: block;
  width: 160px;
  height: 160px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #efefef;
  margin-bottom: 10px;
  img {
    width: 80px;
    margin-bottom: 15px;
  }
  &:hover {
    background-color: #efefef;
  }
  &.disable {
    opacity: 0.1;
    cursor: auto;
    &:hover {
      background-color: white;
    }
  }
  @media screen and (max-width: 1023px) {
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 40px;
    flex-direction: row;
    img {
      width: 30px;
      margin-bottom: 0;
    }
    span {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 480px) {
    height: 6.25vw;
    img {
      width: 4.1667vw;
    }
    span {
      font-size: 2.5vw;
    }
  }
`;
export const Input = styled.input`
  display: none;
`;
export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 220px;
  padding: 20px;
  border-radius: 30px;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  outline: none;
  position: relative;
  @media screen and (max-width: 480px) {
    height: 33.3333vw;
    padding: 2.0833vw;
    border-radius: 4.1667vw;
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
  }
`;
export const TextAreaLength = styled.span`
  font-size: 12px;
  margin-bottom: 10px;
  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
    margin-bottom: 2.0833vw;
  }
`;
export const TagInput = styled.input`
  width: 100%;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
  @media screen and (max-width: 480px) {
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;
    padding: 0.625vw 1.25vw;
    border-radius: 1.0417vw;
  }
`;
export const TagBox = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  width: 100%;
  max-height: 62px;
  overflow-y: scroll;
  font-size: 16px;
  @media screen and (max-width: 480px) {
    gap: 1.0417vw;
    margin-bottom: 2.0833vw;
    max-height: 8.3333vw;
    font-size: 3.3333vw;
  }
`;
export const TgaItem = styled.li`
  background-color: #dcdcdc;
  border-radius: 5px;
  padding: 5px;
  @media screen and (max-width: 480px) {
    border-radius: 1.0417vw;
    padding: 1.0417vw;
  }
`;
export const SubmitButton = styled.button`
  background-color: white;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 100%;
  border-radius: 5px;
  padding: 5px 10px;
  transition: 0.3s;
  border: 1px solid #efefef;
  &:hover {
    background-color: #efefef;
  }
  &.disabled {
    background-color: #dcdcdc;
    cursor: auto;
  }
  @media screen and (max-width: 480px) {
    box-shadow: rgba(149, 157, 165, 0.2) 0vw 1.6667vw 5vw;

    border-radius: 1.0417vw;
    padding: 1.0417vw 2.0833vw;
    border: 0.2083vw solid #efefef;
  }
`;
