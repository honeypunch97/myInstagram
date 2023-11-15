import { toast } from "react-toastify";
import { User } from "firebase/auth";
import { TFeed } from "../types/feed";
import { arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

let isProcessing = false;
//옵티미스틱 업데이트(Optimistic Update) 이 방법은 서버 응답을 기다리지 않고 UI를 먼저 업데이트하는 방식입니다. 사용자가 '좋아요'를 눌렀을 때, 서버에 요청을 보내는 동시에 UI를 업데이트합니다. 서버로부터 응답이 오면 그때 실제 데이터를 업데이트하며, 오류가 발생한 경우에는 사용자에게 알리고 UI를 원래 상태로 돌립니다.
const updateFeedData = (feedData: TFeed[] | null, id: string, userId: string | undefined): TFeed[] => {
  return (feedData || []).map(item => {
    if (item.id !== id) return item;

    let updatedLikes = item.like;
    if (userId) {
      if (item.like.includes(userId)) {
        updatedLikes = item.like.filter(likeItem => likeItem !== userId);
      } else {
        updatedLikes = [...item.like, userId];
      }
    }
    return { ...item, like: updatedLikes };
  });
};

export const toggleLike = async (
  user: User | null,
  id: string,
  feedData: TFeed[] | null,
  setFeedData: (feedData: TFeed[]) => void,
) => {
  if (isProcessing) return;
  isProcessing = true;

  const userId = user?.uid;
  const ref = doc(db, "feed", id);
  const snap = await getDoc(ref);
  if (!user) {
    toast.info("로그인이 필요합니다.");
    return;
  } else if (!snap.exists) {
    toast.error("게시물을 찾을 수 없습니다.");
    return;
  }
  const data = snap.data();
  const likeArr = data?.like || [];

  try {
    setFeedData(updateFeedData(feedData, id, userId));
    if (likeArr.includes(userId)) {
      await updateDoc(ref, {
        like: arrayRemove(userId),
      });
    } else {
      await updateDoc(ref, {
        like: arrayUnion(userId),
      });
    }
  } catch (e) {
    console.log(e);
    setFeedData(updateFeedData(feedData, id, userId));
    toast.error("오류로인해 이전 상태로 되돌립니다. (좋아요)");
  } finally {
    isProcessing = false;
  }
};
