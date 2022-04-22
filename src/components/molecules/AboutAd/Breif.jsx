import React, { useState } from "react";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

function Breif() {
  const [college, setCollege] = useState("Jaypee Institute of Information");
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div
      className="border-lightGray relative rounded cursor-pointer py-4 px-5 mb-5"
      style={{ width: "60vh", borderWidth: "1px" }}
    >
      {/* quote and desc */}
      <div className="flex items-center justify-between">
        {/* quote */}
        <div className="">
          <h3 className="font-bold text-3xl font-sans tracking-wide">
            $22,000
          </h3>
        </div>

        {/* bookmark and share */}
        <div className="flex items-center">
          <div>
            <ShareOutlinedIcon fontSize="medium" />
          </div>
          <div
            className="cursor-pointer ml-4"
            onClick={() => setIsBookmarked((prev) => !prev)}
          >
            {isBookmarked ? (
              <BookmarkIcon fontSize="medium" />
            ) : (
              <BookmarkBorderIcon fontSize="medium" />
            )}
          </div>
        </div>
      </div>

      {/* description */}
      <div>
        <p className="text-lightText text-lg font-sans mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          dignissimos!
        </p>
      </div>

      {/* org and time */}
      <div className="flex justify-between mt-5 mb-1">
        <p className="text-black1 text-11">
          {college.slice(0, 40).toUpperCase()}
        </p>
        <p className="text-black1 text-11">09 APRIL</p>
      </div>
    </div>
  );
}

export default Breif;
