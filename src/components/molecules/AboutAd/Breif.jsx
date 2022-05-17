import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import * as timeago from "timeago.js";
import { makeStyles } from "@material-ui/core/styles";
import { errorToast, successToast } from "../../../utils/toast";
import axios from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  share: {
    marginTop: "40px",
  },
}));

function Breif({ ad }) {
  const classes = useStyles();
  const userId = localStorage.getItem("userId");

  const [college, setCollege] = useState("Jaypee Institute of Information");
  const [isBookmarked, setIsBookmarked] = useState(ad.bookmark?.status);
  const [shareLink, setShareLink] = useState("");

  // copy to clipboard
  const handleClick = (event) => {
    navigator.clipboard.writeText(shareLink).then(() => {
      successToast("Link copied");
    });
  };

  const handleBookmark = async (status) => {
    await axios
      .put("/bookmark", {
        status,
        userId,
        adId: ad.id,
      })
      .then((response) => {
        let message = status === 0 ? "Bookmark removed" : "Ad bookmarked";
        successToast(message, 3000);
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  useEffect(() => {
    setShareLink(window.location.href);
  }, []);

  return (
    <div
      className="border-lightGray relative rounded py-4 px-5 mb-5"
      style={{ width: "60vh", borderWidth: "1px" }}
    >
      {/* quote and desc */}
      <div className="flex items-center justify-between">
        {/* quote */}
        <div className="">
          <h3 className="font-bold text-3xl font-sans tracking-wide">
            ₹{ad?.quote}
          </h3>
        </div>

        {/* bookmark and share */}
        <div className="flex items-center">
          <div className="cursor-pointer">
            <ShareOutlinedIcon fontSize="medium" onClick={handleClick} />
          </div>

          <div
            className="cursor-pointer ml-4"
            onClick={() => setIsBookmarked((prev) => !prev)}
          >
            {isBookmarked ? (
              <BookmarkIcon
                fontSize="medium"
                onClick={() => handleBookmark(0)}
              />
            ) : (
              <BookmarkBorderIcon
                fontSize="medium"
                onClick={() => handleBookmark(1)}
              />
            )}
          </div>
        </div>
      </div>

      {/* description */}
      <div>
        <p className="text-lightText text-lg font-sans mt-2">{ad?.title}</p>
      </div>

      {/* org and time */}
      <div className="flex justify-between mt-5 mb-1">
        <p className="text-black1 text-11">{ad?.user?.college.college}</p>
        <p className="text-black1 text-11">{timeago.format(ad.createdAt)}</p>
      </div>
    </div>
  );
}

export default Breif;
