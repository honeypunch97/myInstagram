import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FeedBox, Form, Title, Wrapper } from "../styles/routes/Search.style";
import { toast } from "react-toastify";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { TFeed } from "../types/feed";
import { FirebaseError } from "firebase/app";
import { useSetRecoilState } from "recoil";
import { detailFeedIdState, isDetailFeedOnState } from "../recoil/feed/atoms";

const Search = () => {
  const setIsDetailFeedOn = useSetRecoilState(isDetailFeedOnState);
  const setDetailFeedId = useSetRecoilState(detailFeedIdState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userParam = queryParams.get("userParam");
  const tagParam = queryParams.get("tagParam");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<TFeed[]>([]);

  const onSearchUser = async (userKeyword: string) => {
    try {
      setIsLoading(true);
      const feedsQuery = query(
        collection(db, "feed"),
        where("userName", "==", userKeyword),
        orderBy("date", "desc"),
        limit(25),
      );
      const snapshot = await getDocs(feedsQuery);
      const feeds = snapshot.docs.map(doc => {
        const { date, like, photo, tag, text, userId, userName, save, comment, userProfileURL } = doc.data();
        return { id: doc.id, date, like, photo, tag, text, userId, userName, save, comment, userProfileURL };
      });
      setSearchData(feeds);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onSearchTag = async (tagKeyword: String) => {
    try {
      setIsLoading(true);
      const feedsQuery = query(
        collection(db, "feed"),
        where("tag", "array-contains", tagKeyword),
        orderBy("date", "desc"),
        limit(25),
      );
      const snapshot = await getDocs(feedsQuery);
      const feeds = snapshot.docs.map(doc => {
        const { date, like, photo, tag, text, userId, userName, save, comment, userProfileURL } = doc.data();
        return { id: doc.id, date, like, photo, tag, text, userId, userName, save, comment, userProfileURL };
      });
      setSearchData(feeds);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    else if (searchInput === "") {
      toast.error("검색어를 입력하세요.");
      return;
    }
    let searchMode = "userName";
    if (searchInput[0] === "#") searchMode = "tag";
    if (searchMode === "userName") {
      onSearchUser(searchInput);
    } else {
      onSearchTag(searchInput.slice(1));
    }
  };
  const onOpenDetailFeed = (feedId: string) => {
    setDetailFeedId(feedId);
    setIsDetailFeedOn(true);
  };
  useEffect(() => {
    const searchParam = async () => {
      if (userParam) {
        setSearchInput(userParam);
        await onSearchUser(userParam);
      } else if (tagParam) {
        setSearchInput(`#${tagParam}`);
        await onSearchTag(tagParam);
      }
    };
    searchParam();
  }, []);
  return (
    <Wrapper>
      <Title>검색</Title>
      <Form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="이름 or #태그"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button>
          <i className="xi-search"></i>
        </button>
      </Form>

      <FeedBox>
        {isLoading ? (
          <i className="xi-spinner-1 xi-spin"></i>
        ) : (
          <>
            <h2>검색결과 : {searchData.length}건</h2>
            {searchData.length !== 0 ? (
              <ul>
                {searchData.map(item => (
                  <li key={item.id}>
                    <img src={item.photo[0]} alt="" loading="lazy" onClick={() => onOpenDetailFeed(item.id)} />
                  </li>
                ))}
              </ul>
            ) : (
              <span>검색결과가 없습니다.</span>
            )}
          </>
        )}
      </FeedBox>
    </Wrapper>
  );
};

export default Search;
