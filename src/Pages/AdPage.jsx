import React from "react";
import AboutSeller from "../components/molecules/AboutAd/AboutSeller";
import AdDetails from "../components/molecules/AboutAd/AdDetails";
import Breif from "../components/molecules/AboutAd/Breif";
import ImageCarousel from "../components/molecules/AboutAd/ImageCarousel";
import MapContainer from "../components/molecules/AboutAd/MapContainer";

function AdPage() {
  return (
    <div className="flex justify-around my-10 mx-20">
      <div className="mr-10">
        <div className="bg-white">
          <ImageCarousel />
        </div>
        <div className="bg-white">
          <AdDetails />
        </div>
      </div>

      <div>
        <div className="bg-white">
          <Breif />
        </div>
        <div className="bg-white">
          <AboutSeller />
        </div>
        <div className="bg-white">
          <MapContainer />
        </div>
      </div>
    </div>
  );
}

export default AdPage;
