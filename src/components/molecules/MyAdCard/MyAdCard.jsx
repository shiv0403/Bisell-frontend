import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import Sample from "../../../assets/sample.jpeg";

function MyAdCard() {
  return (
    <div className="flex items-center border-l-4 border-red w-90p">
      {/* date */}
      <div className="px-2 w-20p">
        <p className="text-sm text-center">
          <span className="text-coolGray">FROM:</span>{" "}
          <span className="text-gray font-bold">APR 22, 22</span>
        </p>
      </div>

      {/* details */}
      <div className="bg-white w-full">
        {/* breif of ad */}
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex items-start">
            <div className="mr-5">
              <img src={Sample} style={{ height: "70px", width: "80px" }} />
            </div>
            <div>
              <div>
                <p className="font-bold">This is ad title</p>
              </div>
              <div>
                <p>$22,000</p>
              </div>
            </div>
          </div>
          <div>
            <div className="cursor-pointer">
              <DeleteIcon fontSize="large" />
            </div>
          </div>
        </div>

        {/* views and bookmarks */}
        <div className="flex justify-between mt-2 border-t-2 border-offWhite px-3 py-1">
          <div className="flex">
            {/* views */}
            <div className="flex items-center mr-4 border-r-2 border-offWhite pr-4">
              <VisibilityIcon fontSize="small" className="mr-1" />
              <p className="mr-1 text-black1 text-sm">Views:</p>
              <p className="font-bold">23</p>
            </div>
            {/* likes */}
            <div className="flex items-center">
              <BookmarksIcon fontSize="small" className="mr-1" />
              <p className="mr-1 text-black1 text-sm">Bookmarks: </p>
              <p className="font-bold">5</p>
            </div>
          </div>
          <div>
            <CustomButton
              text="Edit"
              className="py-1 px-4 tracking-wider bg-white rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAdCard;
