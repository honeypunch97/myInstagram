import { ImgBox, Name, Profile, UserBox, Wrapper } from "../../styles/components/feed/LoadingFeed.style";

const LoadingFeed = () => {
  return (
    <>
      <Wrapper>
        <UserBox>
          <Profile></Profile>
          <Name></Name>
        </UserBox>
        <ImgBox></ImgBox>
      </Wrapper>
      <Wrapper>
        <UserBox>
          <Profile></Profile>
          <Name></Name>
        </UserBox>
        <ImgBox></ImgBox>
      </Wrapper>
    </>
  );
};

export default LoadingFeed;
