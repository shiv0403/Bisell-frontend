import Navbar from "./components/organisms/Navbar/Navbar";
import AdPage from "./Pages/AdPage";
import Home from "./Pages/Home";
import PostAd from "./Pages/PostAd";
import Profile from "./Pages/Profile";
import SearchPage from "./Pages/SearchPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-back">
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-ad" element={<PostAd />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/ad-page/:adId" element={<AdPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
