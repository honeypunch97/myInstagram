import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import { GlobalStyles } from "./styles/GlobalStyle";
import Home from "./routes/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateAccount from "./routes/CreateAccount";
import Login from "./routes/Login";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Loading from "./components/common/Loading";
import { useRecoilValue } from "recoil";
import { isAddFeedOnState, isDetailFeedOnState } from "./recoil/feed/atoms";
import AddFeed from "./components/feed/AddFeed";
import DetailFeed from "./components/feed/DetailFeed";
import Search from "./routes/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "search", element: <Search /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);
function App() {
  const isAddFeedOn = useRecoilValue(isAddFeedOnState);
  const isDetailFeedOn = useRecoilValue(isDetailFeedOnState);
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
      {isAddFeedOn && <AddFeed />}
      {isDetailFeedOn && <DetailFeed />}
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable={false} // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={3} // 알람 개수 제한
      />
    </>
  );
}

export default App;
