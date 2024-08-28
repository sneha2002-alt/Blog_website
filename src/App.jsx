import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import DemoPage from "./components/DemoPage/DemoPage";
import HomeHeader from "./components/Home/HomeHeader";
import DemoHeader from "./components/DemoPage/DemoHeader";

function App() {
  const auth = false;
  return (
    <>
      {auth ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </>
  );
}

export default App;
