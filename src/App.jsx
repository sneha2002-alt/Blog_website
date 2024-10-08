import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import DemoPage from "./components/DemoPage/DemoPage";
import HomeHeader from "./components/Home/Header/HomeHeader";
import DemoHeader from "./components/DemoPage/DemoHeader";
import { Blog } from "./context/BlogContext";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Home/Profile/Profile";
import Write from "./components/Home/Write/Write";
import SinglePost from "./components/Common/Posts/SinglePost";
import EditPost from "./components/Common/Posts/EditPost";
import FilterPost from "./components/DemoPage/FilterPost";

function App() {
  const { currentUser } = Blog();
  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <ToastContainer />
      <Routes>
        {currentUser && <Route path="/" element={<HomePage />} />}
        {!currentUser && <Route path="/demo" element={<DemoPage />} />}
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route path="/filter/:tag" element={<FilterPost />} />
        <Route
          path="*"
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
      </Routes>
    </>
  );
}

export default App;
