import React, { useEffect, useState } from "react";
import {
  FeedBox,
  FeedSection,
  ProfileSection,
  UpdateProfileImageSection,
  Wrapper,
} from "../styles/routes/Profile.style";
import { auth, db, storage } from "../firebase";
import { toast } from "react-toastify";
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { TFeed } from "../types/feed";

const Profile = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [isMyFeed, setIsMyFeed] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [myFeeds, setMyFeeds] = useState<TFeed[]>([]);
  const [mySavedFeeds, setMySavedFeeds] = useState<TFeed[]>([]);
  const [isGetMyFeedsLoading, setIsGetMyFeedsLoading] = useState(false);
  const [isGetMySavedFeedsLoading, setIsGetMySavedFeedsLoading] = useState(false);
  const [isOnChangeProfileImages, setIsOnChangeProfileImage] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileLocalSrc, setProfileLocalSrc] = useState<string | null | undefined>(user?.photoURL);
  const [isProfileImageChangeLoading, setIsProfileImageChangeLoading] = useState(false);

  const onDeleteUser = async () => {
    if (isDeleteLoading) return;
    if (user === null || user.email === null) {
      toast.error("계정 정보가 없습니다.");
      return;
    }
    const result = confirm("회원을 탈퇴하시겠습니까? 되돌릴 수 없습니다.");
    if (result) {
      const userPassword = prompt("비밀번호를 입력하세요.");
      if (!userPassword) {
        toast.error("비밀번호를 입력하지 않았습니다.");
        return;
      }
      try {
        setIsDeleteLoading(true);
        const feedsQuery = query(collection(db, "feed"), where("userId", "==", user.uid));
        const snapshot = await getDocs(feedsQuery);
        const feeds = snapshot.docs.map(doc => {
          const { photo, userId } = doc.data();
          return { id: doc.id, photo, userId };
        });
        // FireStore, Storage 정리
        const deletePromises = [];
        for (let feed of feeds) {
          const locationRef = ref(storage, `feed/${feed.userId}/${feed.id}`);
          const imgRefs = await listAll(locationRef);
          for (let imgRef of imgRefs.items) {
            const imgPath = imgRef.fullPath;
            deletePromises.push(deleteObject(ref(storage, imgPath)));
          }
          deletePromises.push(deleteDoc(doc(db, "feed", feed.id)));
        }
        await Promise.all(deletePromises);
        // 재인증
        const credential = EmailAuthProvider.credential(user.email, userPassword);
        await reauthenticateWithCredential(user, credential);
        // 회원 탈퇴 처리
        await deleteUser(user);
        toast.success("회원 탈퇴가 성공적으로 처리되었습니다.");
        navigate("/");
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/requires-recent-login") {
            toast.error("사용자 인증기간이 만료되었습니다. 재로그인이 필요합니다.");
            return;
          }
          toast.error(`회원 탈퇴 처리 중 오류가 발생했습니다. ${error.code}`);
        }
      } finally {
        setIsDeleteLoading(false);
      }
    }
  };
  const getMyFeeds = async () => {
    if (isGetMyFeedsLoading) return;
    if (user === null || user.email === null) {
      toast.error("계정 정보가 없습니다.");
      return;
    }
    try {
      setIsGetMyFeedsLoading(true);
      const feedsQuery = query(collection(db, "feed"), where("userId", "==", user.uid), orderBy("date", "desc"));
      const snapshot = await getDocs(feedsQuery);
      const feeds = snapshot.docs.map(doc => {
        const { date, like, photo, tag, text, userId, userName, save, comment, userProfileURL } = doc.data();
        return { id: doc.id, date, like, photo, tag, text, userId, userName, save, comment, userProfileURL };
      });
      setMyFeeds(feeds);
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast.error(e.message);
      }
    } finally {
      setIsGetMyFeedsLoading(false);
    }
  };
  const getMySavedFeeds = async () => {
    if (isGetMySavedFeedsLoading) return;
    if (user === null || user.email === null) {
      toast.error("계정 정보가 없습니다.");
      return;
    }
    try {
      setIsGetMySavedFeedsLoading(true);
      const feedsQuery = query(
        collection(db, "feed"),
        where("save", "array-contains", user.uid),
        orderBy("date", "desc"),
      );
      const snapshot = await getDocs(feedsQuery);
      const feeds = snapshot.docs.map(doc => {
        const { date, like, photo, tag, text, userId, userName, save, comment, userProfileURL } = doc.data();
        return { id: doc.id, date, like, photo, tag, text, userId, userName, save, comment, userProfileURL };
      });
      setMySavedFeeds(feeds);
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast.error(e.message);
      }
    } finally {
      setIsGetMySavedFeedsLoading(false);
    }
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1 * 1024 * 1024; // 최대 파일 사이즈
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > maxSize) {
        toast.error("1MB이하의 이미지만 업로드 가능합니다.");
        return;
      }
      setProfileFile(file);
      setProfileLocalSrc(URL.createObjectURL(file));
    }
  };
  const onSubmitProfileImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isProfileImageChangeLoading) return;
    if (!user) {
      toast.error("유저 정보가 없습니다.");
      return;
    } else if (profileFile === null) {
      toast.error("파일이 없습니다.");
      return;
    }
    try {
      setIsProfileImageChangeLoading(true);
      const upLoadTask = async () => {
        const storageRef = ref(storage, `profile/${user.uid}`);
        const result = await uploadBytes(storageRef, profileFile);
        const downloadURL = await getDownloadURL(result.ref);
        return downloadURL;
      };
      const url = await upLoadTask();
      await updateProfile(user, { photoURL: url });

      // 내가 작성한 feeds profileURL 수정해주기
      const feedsQuery = query(collection(db, "feed"), where("userId", "==", user.uid));
      const feedsSnapshot = await getDocs(feedsQuery);
      feedsSnapshot.forEach(async feedDoc => {
        const feedRef = doc(db, "feed", feedDoc.id);
        await updateDoc(feedRef, { userProfileURL: url });
      });
      toast.success("프로필 이미지가 성공적으로 업데이트되었습니다.");
      closeUpdateProfileContainer();
    } catch (e) {
      toast.error("프로필 이미지 업데이트에 실패했습니다.");
    } finally {
      setIsProfileImageChangeLoading(false);
    }
  };
  const closeUpdateProfileContainer = () => {
    setIsOnChangeProfileImage(false);
    setProfileLocalSrc(user?.photoURL);
  };
  useEffect(() => {
    getMyFeeds();
    getMySavedFeeds();
  }, []);
  return (
    <Wrapper>
      {isOnChangeProfileImages && (
        <UpdateProfileImageSection>
          <div className="background" onClick={closeUpdateProfileContainer}></div>
          <div className="container">
            <button className="closeBtn" onClick={closeUpdateProfileContainer}>
              <i className="xi-close"></i>
            </button>
            <h2 className="title">프로필 이미지 바꾸기</h2>
            <form onSubmit={onSubmitProfileImage}>
              {profileLocalSrc ? <img src={profileLocalSrc} /> : <img src="/icon/user_solid.svg" />}

              <input
                type="file"
                id="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChangeFile}
              />
              <label htmlFor="profileImage">이미지 바꾸기</label>
              <button>{isProfileImageChangeLoading ? <i className="xi-spinner-1 xi-spin"></i> : "저장"}</button>
            </form>
          </div>
        </UpdateProfileImageSection>
      )}

      <h2 className="title">프로필</h2>
      <ProfileSection>
        <div className="image-section">
          {user?.photoURL ? <img src={user?.photoURL} /> : <img src="/icon/user_solid.svg" />}
          <span className="go" onClick={() => setIsOnChangeProfileImage(true)}>
            프로필 이미지 바꾸기
          </span>
        </div>
        <span className="name">{user?.displayName}님 안녕하세요</span>
        <button onClick={onDeleteUser}>
          {isDeleteLoading ? <i className="xi-spinner-1 xi-spin"></i> : "회원탈퇴"}
        </button>
      </ProfileSection>
      <FeedSection>
        <div className="buttonBox">
          <button onClick={() => setIsMyFeed(true)} className={isMyFeed ? "on" : ""}>
            내 피드
          </button>
          <button onClick={() => setIsMyFeed(false)} className={isMyFeed ? "" : "on"}>
            저장한 피드
          </button>
        </div>
        {isMyFeed ? (
          <FeedBox>
            {isGetMyFeedsLoading ? (
              <i className="xi-spinner-1 xi-spin"></i>
            ) : (
              <ul>
                {myFeeds.map(item => (
                  <li key={item.id}>
                    <img src={item.photo[0]} />
                  </li>
                ))}
              </ul>
            )}
          </FeedBox>
        ) : (
          <FeedBox>
            {isGetMySavedFeedsLoading ? (
              <i className="xi-spinner-1 xi-spin"></i>
            ) : (
              <ul>
                {mySavedFeeds.map(item => (
                  <li key={item.id}>
                    <img src={item.photo[0]} />
                  </li>
                ))}
              </ul>
            )}
          </FeedBox>
        )}
      </FeedSection>
    </Wrapper>
  );
};

export default Profile;
