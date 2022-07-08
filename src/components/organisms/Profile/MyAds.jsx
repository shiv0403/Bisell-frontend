import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { errorToast, successToast } from "../../../utils/toast";
import AdCard from "../../molecules/AdCard/AdCard";
import MyAdCard from "../../molecules/MyAdCard/MyAdCard";

function MyAds() {
  const userId = localStorage.getItem("userId");

  const [ads, setAds] = useState(true);
  const [bookmarks, setBookmarks] = useState(false);

  const [myAds, setMyAds] = useState([]);
  const [myBookmarks, setMyBookmarks] = useState([]);

  useEffect(() => {
    async function getMyAds() {
      await axios
        .get(`/ads-get/${userId}`)
        .then((response) => {
          setMyAds(response.data);
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }

    getMyAds();
  }, []);

  useEffect(() => {
    async function getMyBookmarks() {
      await axios
        .get(`/get-bookmarks/${userId}`)
        .then((response) => {
          setMyBookmarks(response.data);
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }

    getMyBookmarks();
  }, []);

  const handleDeleteAd = async (adId) => {
    await axios
      .delete(`/ad-delete/${adId}`)
      .then((response) => {
        successToast(response.data);
        setMyAds((prev) => prev.filter((ad) => ad.id !== adId));
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  return (
    <div>
      {/* tabs */}
      <div className="flex">
        <div
          className={
            ads
              ? "p-2 text-lg mr-4 cursor-pointer border-b-2 border-primary"
              : "p-2 text-lg mr-4 cursor-pointer"
          }
          onClick={() => {
            setAds(true);
            setBookmarks(false);
          }}
        >
          <p>Ads</p>
        </div>
        <div
          className={
            bookmarks
              ? "p-2 text-lg cursor-pointer border-b-2 border-primary"
              : "p-2 text-lg cursor-pointer"
          }
          onClick={() => {
            setAds(false);
            setBookmarks(true);
          }}
        >
          <p>Bookmarks</p>
        </div>
      </div>

      {/* ads */}
      {ads && (
        <div className="mt-6">
          {myAds?.map((ad) => (
            <div
              className="mb-3 border-y-2 border-r-2 border-offWhite rounded"
              key={ad.id}
            >
              <MyAdCard ad={ad} deleteAd={handleDeleteAd} />
            </div>
          ))}
        </div>
      )}

      {/* bookmarks */}
      {bookmarks && (
        <div className="grid grid-cols-3 mt-6 gap-8">
          {myBookmarks?.map((bookmarkAd) => {
            if (bookmarkAd?.ad) {
              return (
                <div key={bookmarkAd.id}>
                  <AdCard ad={bookmarkAd?.ad} />
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default MyAds;
