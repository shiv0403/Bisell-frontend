import React from "react";
import CustomButton from "./components/atoms/CustomButton/CustomButton";
import CustomInput from "./components/atoms/CustomInput/CustomInput";
import AboutSeller from "./components/molecules/AboutAd/AboutSeller";
import AdDetails from "./components/molecules/AboutAd/AdDetails";
import ImageCarousel from "./components/molecules/AboutAd/ImageCarousel";
import MapContainer from "./components/molecules/AboutAd/MapContainer";
import AdCard from "./components/molecules/AdCard/AdCard";
import Navbar from "./components/organisms/Navbar/Navbar";
import AdPage from "./Pages/AdPage";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="bg-back">
      <div>
        <Navbar />
        {/* <Home /> */}
        <div>
          <AdPage />
        </div>
      </div>
    </div>
  );
}

export default App;
