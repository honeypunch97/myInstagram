import React, { useState } from "react";
import {
  Wrapper,
  BackGround,
  Container,
  Form,
  ImageSection,
  ContentBox,
  Label,
  Input,
  ImageBox,
  Image,
  SwiperSection,
  PageNationSection,
  PageNationImage,
  DeleteButton,
  CloseButton,
  TextArea,
  TextAreaLength,
  SubmitButton,
  TagInput,
  TagBox,
  TgaItem,
} from "../../styles/components/feed/AddFeed.style";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getNow } from "../../util/getDate";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { feedDataState, isAddFeedOnState } from "../../recoil/feed/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getFeeds } from "../../util/getFeeds";

const AddFeed = () => {
  const setAddFeedOn = useSetRecoilState(isAddFeedOnState);
  const [feedData, setFeedData] = useRecoilState(feedDataState);

  const [isLoading, setIsLoading] = useState(false);
  const [localImgUrl, setLocalImgUrl] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputTextArea, setInputTextArea] = useState("");
  const [inputTag, setInputTag] = useState("");

  const maxTextAreaLength = 200;

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxSize = 1 * 1024 * 1024; // 최대 파일 사이즈
    const maxLength = 5; // 최대 파일 개수
    let isFilesOk = true; // 파일들 사이즈 체크

    if (files?.length) {
      if (selectedFiles.length + files.length > maxLength) {
        toast.error("최대 5개의 이미지를 업로드 할 수 있습니다.");
        return;
      }
      for (let i = 0; i < files?.length; i++) {
        if (files[i].size > maxSize) isFilesOk = false;
      }
      if (!isFilesOk) {
        toast.error("1MB이하의 이미지만 업로드 가능합니다.");
        return;
      }
      const imgStack: string[] = [];
      for (let i = 0; i < files?.length; i++) {
        const currentImageUrl = URL.createObjectURL(files[i]);
        imgStack.push(currentImageUrl);
      }
      setSelectedFiles([...selectedFiles, ...files]);
      setLocalImgUrl([...localImgUrl, ...imgStack]);
    }
  };

  const handleDeleteFile = (idx: number) => {
    setSelectedFiles([...selectedFiles].filter((_, index) => index !== idx));
    setLocalImgUrl([...localImgUrl].filter((_, index) => index !== idx));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (inputTextArea.length <= maxTextAreaLength) {
      setInputTextArea(e.target.value);
    }
  };
  const handleBlurTextArea = () => {
    if (inputTextArea.length > maxTextAreaLength) {
      setInputTextArea(inputTextArea.slice(0, maxTextAreaLength));
    }
  };
  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      toast.error("유저 정보가 없습니다.");
      return;
    } else if (selectedFiles.length === 0) {
      toast.error("최소 1개의 이미지를 업로드 해야 합니다.");
      return;
    } else if (selectedFiles.length > 5) {
      toast.error("최대 5개의 이미지를 업로드 할 수 있습니다.");
      return;
    } else if (inputTextArea.length === 0) {
      toast.error("텍스트 내용이 없습니다.");
      return;
    }
    let isTagOk = true;
    const tags = inputTag
      .split(" ")
      .map(item => item.trim())
      .filter(item => item !== "");
    if (inputTag !== "") {
      for (let tagItem of tags) {
        if (tagItem === "" || tagItem.length > 10) isTagOk = false;
      }
      if (!isTagOk) {
        toast.error("태그 형식이 맞지 않습니다.(공백태그 제한, 태그당 최대 글자수:10)");
        return;
      } else if (tags.length > 5) {
        toast.error("태그의 개수가 너무 많습니다.(제한:5)");
        return;
      }
    }

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "feed"), {
        userId: user.uid,
        userName: user.displayName,
        date: getNow(),
        text: inputTextArea,
        tag: tags,
        likes: 0,
        like: [],
        save: [],
        comment: [],
      });

      // firebase storage 이미지 업로드
      const uploadTasks = selectedFiles.map(async file => {
        const locationRef = ref(storage, `feed/${user.uid}/${doc.id}/${file.name}`);
        const result = await uploadBytes(locationRef, file);
        return getDownloadURL(result.ref);
      });
      const photoUrls = await Promise.all(uploadTasks);
      await updateDoc(doc, { photo: photoUrls });

      // 후처리
      toast.success("작성을 완료했습니다.");
      setSelectedFiles([]);
      setInputTextArea("");
      setInputTag("");
      setAddFeedOn(false);

      // feed 업데이트
      getFeeds(setFeedData);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <BackGround onClick={() => setAddFeedOn(false)}></BackGround>
      <Container>
        <ImageSection>
          {selectedFiles.length === 0 && localImgUrl.length === 0 ? (
            <img
              src="/icon/photo.svg"
              alt=""
              style={{ opacity: 0.05, width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <>
              <SwiperSection>
                <Swiper
                  observer
                  observeParents
                  observeSlideChildren
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  onSlideChange={swiper => {
                    setActiveIndex(swiper.activeIndex);
                  }}
                  className="mySwiper2">
                  {localImgUrl.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <ImageBox>
                        <Image src={item} alt="" />
                      </ImageBox>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperSection>
              <PageNationSection>
                <Swiper
                  observer
                  observeParents
                  observeSlideChildren
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper">
                  {localImgUrl.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <PageNationImage src={item} alt="" className={activeIndex === idx ? "on" : ""} />
                      <DeleteButton onClick={() => handleDeleteFile(idx)}>X</DeleteButton>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </PageNationSection>
            </>
          )}
        </ImageSection>
        <ContentBox>
          <CloseButton onClick={() => setAddFeedOn(false)}>
            <i className="xi-close"></i>
          </CloseButton>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="file" className={selectedFiles.length >= 5 || localImgUrl.length >= 5 ? "disable" : ""}>
              <img src="/icon/add.svg" alt="" />
              <span>이미지 추가</span>
            </Label>
            <Input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              multiple
              onChange={handleAddFile}
              disabled={selectedFiles.length >= 5 || localImgUrl.length >= 5}
            />
            <TextArea
              placeholder="내용을 입력하세요"
              required
              value={inputTextArea}
              maxLength={maxTextAreaLength}
              onChange={handleChangeTextArea}
              onBlur={handleBlurTextArea}
            />
            <TextAreaLength>{inputTextArea.length}/200</TextAreaLength>
            <TagInput type="text" placeholder="태그명 태그명" value={inputTag} onChange={handleChangeTag} />
            <TagBox>
              {inputTag !== "" &&
                inputTag
                  .split(" ")
                  .filter(item => item !== "")
                  .map((item, idx) => <TgaItem key={idx}>{item}</TgaItem>)}
            </TagBox>
            <SubmitButton disabled={isLoading} className={isLoading ? "disabled" : ""}>
              {isLoading ? <i className="xi-spinner-1 xi-spin"></i> : "작성완료"}
            </SubmitButton>
          </Form>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default AddFeed;
