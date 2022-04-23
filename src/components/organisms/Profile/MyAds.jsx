import React, { useState } from "react";
import AdCard from "../../molecules/AdCard/AdCard";
import MyAdCard from "../../molecules/MyAdCard/MyAdCard";

function MyAds() {
  const [ads, setAds] = useState(true);
  const [bookmarks, setBookmarks] = useState(false);

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
          <div className="mb-3 border-y-2 border-r-2 border-offWhite rounded">
            <MyAdCard />
          </div>
          <div className="mb-3 border-y-2 border-r-2 border-offWhite rounded">
            <MyAdCard />
          </div>
          <div className="mb-3 border-y-2 border-r-2 border-offWhite rounded">
            <MyAdCard />
          </div>
          <div className="mb-3 border-y-2 border-r-2 border-offWhite rounded">
            <MyAdCard />
          </div>
          <div className="mb-3 border-y-2 border-r-2 border-offWhite rounded">
            <MyAdCard />
          </div>
          <div className="mb-3 border-y-2 border-r-2 border-offWhite rounded">
            <MyAdCard />
          </div>
        </div>
      )}

      {/* bookmarks */}
      {bookmarks && (
        <div className="grid grid-cols-3 mt-6 gap-8">
          <div>
            <AdCard />
          </div>
          <div>
            <AdCard />
          </div>
          <div>
            <AdCard />
          </div>
          <div>
            <AdCard />
          </div>
          <div>
            <AdCard />
          </div>
          <div>
            <AdCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAds;
