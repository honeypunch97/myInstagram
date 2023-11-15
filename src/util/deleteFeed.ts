import { User } from "firebase/auth";
import { deleteObject, listAll, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { TFeed } from "../types/feed";
import { getFeeds } from "./getFeeds";

let isProcessing = false;
/**
 * 피드삭제
 * @param user FireBase 유저
 * @param userId feed auth ID
 * @param id feed ID
 * @param setFeedData recoil state
 * @returns
 */
export const deleteFeed = async (
  user: User | null,
  userId: string,
  id: string,
  setFeedData: (feedData: TFeed[]) => void,
) => {
  if (isProcessing) return;
  isProcessing = true;
  if (!user) {
    toast.error("회원 정보가 없습니다.");
    return;
  } else if (user.uid !== userId) {
    toast.error("회원 정보와 작성자가 일치하지 않습니다.");
    return;
  }
  try {
    // 이미지(storage) 삭제
    const locationRef = ref(storage, `feed/${user.uid}/${id}`);
    const res = await listAll(locationRef);
    const imgPromise = res.items.map(itemRef => deleteObject(itemRef));

    // 데이터(fireStore) 삭제
    const docPromise = deleteDoc(doc(db, "feed", id));

    await Promise.all([imgPromise, docPromise]);
    // 후처리
    toast.success("삭제를 완료했습니다.");
    getFeeds(setFeedData);
  } catch (e) {
    console.log(e);
  } finally {
    isProcessing = false;
  }
};
