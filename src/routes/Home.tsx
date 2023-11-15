import LoadingFeed from "../components/feed/LoadingFeed";
import { Wrapper } from "../styles/routes/Home.style";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { feedDataState } from "../recoil/feed/atoms";
import FeedItem from "../components/feed/FeedItem";
import { getFeeds } from "../util/getFeeds";

const Home = () => {
  const [feedData, setFeedData] = useRecoilState(feedDataState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getFeeds(setFeedData);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Wrapper>
      {isLoading ? (
        <LoadingFeed />
      ) : (
        <div>
          {feedData?.map(item => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Home;
