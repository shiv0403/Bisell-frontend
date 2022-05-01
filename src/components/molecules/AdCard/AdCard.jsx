import React, { useState, useEffect } from "react";
import Flower from "../../../assets/sample.jpeg";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bookmark: {
    cursor: "pointer",
  },
});

function AdCard() {
  const classes = useStyles();

  const [college, setCollege] = useState("Jaypee Institute of Information");
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div
      className="border-lightGray relative rounded cursor-pointer bg-white"
      style={{ width: "40vh", borderWidth: "1px" }}
    >
      {/* image */}
      <div className="px-10 pt-3">
        <img src={Flower} className="h-50" />
      </div>

      {/* quote and desc */}
      <div className="px-4 py-3">
        <h3 className="font-bold text-2xl font-sans">$ 22,000</h3>
        <p className="text-lightText font-sans">
          Lorem ipsum dolor sit amet....
        </p>
      </div>

      {/* org and time */}
      <div className="flex justify-between py-2 px-4 ">
        <p className="text-black1 text-11">
          {college.slice(0, 40).toUpperCase()}
        </p>
        <p className="text-black1 text-11">09 APRIL</p>
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
