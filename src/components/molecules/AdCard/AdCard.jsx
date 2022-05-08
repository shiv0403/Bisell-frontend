import React, { useState, useEffect } from "react";
import Flower from "../../../assets/sample.jpeg";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import * as timeago from "timeago.js";

const useStyles = makeStyles({
  bookmark: {
    cursor: "pointer",
  },
});

function AdCard({ ad }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [college, setCollege] = useState(ad.user.college.college);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [images, setImages] = useState("");

  useEffect(() => {
    function getImages() {
      const adImages = JSON.parse(ad?.images);
      setImages(adImages);
    }
    getImages();
  }, []);

  return (
    <div
      className="border-lightGray relative rounded cursor-pointer bg-white"
      style={{ width: "40vh", borderWidth: "1px" }}
      onClick={() => navigate(`/ad-page/${ad?.id}`, { state: ad })}
    >
      {/* image */}
      <div className="px-10 pt-3">
        <img src={images[0]} className="h-50" alt="ad-img" />
      </div>

      {/* quote and desc */}
      <div className="px-4 py-3">
        <h3 className="font-bold text-2xl font-sans">$ {ad.quote}</h3>
        <p className="text-lightText font-sans">{ad.description}</p>
      </div>

      {/* org and time */}
      <div className="flex justify-between py-2 px-4 ">
        <p className="text-black1 text-11">
          {college.slice(0, 40).toUpperCase()}
        </p>
        <p className="text-black1 text-11">{timeago.format(ad?.createdAt)}</p>
      </div>

      {/* bookmark */}
      <div
        className="absolute right-1 top-2 cursor-pointer"
        onClick={() => setIsBookmarked((prev) => !prev)}
      >
        {isBookmarked ? (
          <BookmarkIcon fontSize="medium" className={classes.bookmark} />
        ) : (
          <BookmarkBorderIcon fontSize="medium" className={classes.bookmark} />
        )}
      </div>
    </div>
  );
}

export default AdCard;
