import { toast } from "react-toastify";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db } from "../firebase";
import { TFeed } from "../types/feed";

export const getFeeds = async (setFeedData: (feedData: TFeed[]) => void) => {
  try {
    const feedsQuery = query(collection(db, "feed"), orderBy("date", "desc"), limit(25));
    const snapshot = await getDocs(feedsQuery);
    const feeds = snapshot.docs.map(doc => {
      const { date, like, photo, tag, text, userId, userName, save, comment, userProfileURL } = doc.data();
      return { id: doc.id, date, like, photo, tag, text, userId, userName, save, comment, userProfileURL };
    });
    setFeedData(feeds);
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.message);
    }
  }
};
