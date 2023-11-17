import { useState } from "react";
import { TFeed } from "../../types/feed";
import {
  ButtonBox,
  CommentSection,
  ContentSection,
  HeaderSection,
  ImageSection,
  MenuBox,
  MenuButton,
  Name,
  OptionSection,
  Profile,
  TagSection,
  TextSection,
  Wrapper,
} from "../../styles/components/feed/FeedItem.style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { auth, db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { feedDataState } from "../../recoil/feed/atoms";
import { getNow } from "../../util/getDate";

import { toggleLike } from "../../util/toggleLike";
import { toggleSave } from "../../util/toggleSave";
import { deleteFeed } from "../../util/deleteFeed";
import { Auth } from "firebase/auth";
import { Link } from "react-router-dom";

const FeedItem = ({ item }: { item: TFeed }) => {
  const [feedData, setFeedData] = useRecoilState(feedDataState);
  const user = auth.currentUser;
  const { id, date, like, save, photo, tag, text, userId, userName, comment, userProfileURL } = item;
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isCommentOn, setIsCommentOn] = useState(false);

  const onDeleteFeed = async () => {
    setIsDeleteLoading(true);
    await deleteFeed(user, userId, id, setFeedData);
    setIsDeleteLoading(false);
  };

  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addComment = async (auth: Auth, comment: string) => {
      const authorId = auth.currentUser?.uid;
      const name = auth.currentUser?.displayName;

      if (!auth || !authorId || !name) {
        toast.info("로그인이 필요합니다.");
        return;
      }
      try {
        const ref = doc(db, "feed", id);
        await updateDoc(ref, {
          comment: arrayUnion({
            authorId: authorId,
            name: name,
            text: comment,
            date: getNow(),
          }),
        });

        setFeedData(
          feedData.map(item =>
            item.id === id
              ? {
                  ...item,
                  comment: [
                    ...item.comment,
                    {
                      authorId: authorId,
                      name: name,
                      text: comment,
                      date: getNow(),
                    },
                  ],
                }
              : item,
          ),
        );
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    addComment(auth, commentInput);
    // 후처리
    setCommentInput("");
  };
  return (
    <Wrapper style={{ textAlign: "center" }}>
      <HeaderSection>
        <Link to={`/search?userParam=${userName}`}>
          <Profile src={userProfileURL} />
        </Link>
        <Name>
          <Link to={`/search?userParam=${userName}`}>{userName}</Link>
        </Name>
        {auth.currentUser?.uid === userId && (
          <MenuButton title="옵션 더보기" onClick={() => setIsMenuOn(!isMenuOn)}>
            <i className="xi-ellipsis-h"></i>
          </MenuButton>
        )}
        {isMenuOn && (
          <MenuBox>
            <li>수정</li>
            <li onClick={onDeleteFeed}>{isDeleteLoading ? <i className="xi-spinner-1 xi-spin"></i> : "삭제"}</li>
          </MenuBox>
        )}
      </HeaderSection>
      <ContentSection>
        <ImageSection>
          <Swiper
            spaceBetween={10}
            navigation={true}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Navigation, Pagination]}>
            {photo.map((item, idx) => (
              <SwiperSlide key={idx}>
                <img src={item} alt="" loading="lazy" />
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageSection>
        <OptionSection>
          <ButtonBox>
            <i
              className={user && like.includes(user.uid) ? "xi-heart" : "xi-heart-o"}
              title="좋아요"
              onClick={() => toggleLike(user, id, feedData, setFeedData)}></i>
            <i
              className={user && save.includes(user.uid) ? "xi-label" : "xi-label-o"}
              title="피드저장"
              onClick={() => toggleSave(user, id, feedData, setFeedData)}></i>
          </ButtonBox>
          <span>좋아요 {like.length}개</span>
        </OptionSection>
        <TextSection>{text}</TextSection>
        {tag && (
          <TagSection>
            {tag?.map((item, idx) => (
              <li key={idx}>
                <Link to={`/search?tagParam=${item}`}>{item}</Link>
              </li>
            ))}
          </TagSection>
        )}

        <CommentSection>
          <span onClick={() => setIsCommentOn(true)}>댓글 {comment.length}개 모두 보기</span>
          {isCommentOn && (
            <>
              <ul>
                {comment.map((item, idx) => (
                  <li key={idx}>
                    <b>{item.name}</b>
                    {item.text}
                  </li>
                ))}
              </ul>
              <span onClick={() => setIsCommentOn(false)}>댓글 접기</span>
            </>
          )}

          <form onSubmit={onSubmitComment}>
            <input
              type="text"
              placeholder="댓글 달기..."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
            />
          </form>
        </CommentSection>
      </ContentSection>
    </Wrapper>
  );
};

export default FeedItem;
