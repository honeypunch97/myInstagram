import React, { useEffect, useState } from "react";
import { BackGround, Wrapper } from "../../styles/components/feed/DetailFeed";
import { useRecoilState, useSetRecoilState } from "recoil";
import { detailFeedIdState, isDetailFeedOnState } from "../../recoil/feed/atoms";
import { TFeed } from "../../types/feed";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

const DetailFeed = () => {
  const setIsDetailFeedOn = useSetRecoilState(isDetailFeedOnState);
  const [detailFeedId, setDetailFeedId] = useRecoilState(detailFeedIdState);
  const [isLoading, setIsLoading] = useState(false);

  const [detailFeedData, setDetailFeedData] = useState<TFeed | null>(null);
  const onCloseDetailFeed = () => {
    setIsDetailFeedOn(false);
  };
  useEffect(() => {
    const getDetailFeedData = async () => {
      if (detailFeedId === "") return;
      try {
        setIsLoading(true);
        const feedDoc = doc(db, "feed", detailFeedId);
        const docSnap = await getDoc(feedDoc);
        if (docSnap.exists()) {
          const { date, like, photo, tag, text, userId, userName, save, comment } = docSnap.data();
          setDetailFeedData({ id: docSnap.id, date, like, photo, tag, text, userId, userName, save, comment });
        } else {
          console.log("error");
        }
      } catch (e) {
        if (e instanceof FirebaseError) {
          toast.error(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getDetailFeedData();
  }, [detailFeedId]);
  return (
    <Wrapper>
      <BackGround onClick={onCloseDetailFeed}></BackGround>
    </Wrapper>
  );
};

export default DetailFeed;
