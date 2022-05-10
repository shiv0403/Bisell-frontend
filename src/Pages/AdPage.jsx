import React, { useEffect, useState } from "react";
import AboutSeller from "../components/molecules/AboutAd/AboutSeller";
import AdDetails from "../components/molecules/AboutAd/AdDetails";
import Breif from "../components/molecules/AboutAd/Breif";
import ImageCarousel from "../components/molecules/AboutAd/ImageCarousel";
import MapContainer from "../components/molecules/AboutAd/MapContainer";
import axios from "../utils/axios";
import { errorToast } from "../utils/toast";

function AdPage() {
  const url = window.location.href;
  const adId = url.split("/")[4];

  const [ad, setAd] = useState("");

  useEffect(() => {
    async function viewAd() {
      await axios
        .put("/ad-view/", { adId })
        .then((response) => {})
        .catch((err) => {
          errorToast(err.message);
        });
    }

    viewAd();
  }, []);

  useEffect(() => {
    async function getAdData() {
      await axios
        .get(`/ad-get/${adId}`)
        .then((response) => {
          setAd(response.data);
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }
    getAdData();
  }, []);

  return (
    <div className="h-screen">
      {ad && (
        <div className="flex justify-around my-10 mx-20">
          <div className="mr-10">
            <div className="bg-white">
              <ImageCarousel ad={ad} />
            </div>
            <div className="bg-white">
              <AdDetails ad={ad} />
            </div>
          </div>

          <div>
            <div className="bg-white">
              <Breif ad={ad} />
            </div>
            <div className="bg-white">
              <AboutSeller ad={ad} />
            </div>
            <div className="bg-white">
              <MapContainer ad={ad} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdPage;
