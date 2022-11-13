import React, { useEffect, useState } from "react";
import AdCard from "../components/molecules/AdCard/AdCard";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { errorToast } from "../utils/toast";

function Home() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function getAds() {
      await axios
        .get("/ads-get", {
          params: {
            userId,
          },
        })
        .then((response) => {
          setAds(response.data);
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }

    getAds();
  }, []);

  return (
    <div className="w-80p m-auto h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-4 mt-7 tracking-wider">
          Latest Ads
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {ads.map((ad) => {
          return (
            <div key={ad?.id}>
              <AdCard ad={ad} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
