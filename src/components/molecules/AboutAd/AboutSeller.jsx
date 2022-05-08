import React, { useState } from "react";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Flower from "../../../assets/sample.jpeg";

function AboutSeller({ ad }) {
  const [user, setUser] = useState(ad?.user);

  return (
    <div
      className="p-4 border-2 border-offWhite mb-5"
      style={{ width: "60vh", borderWidth: "1px" }}
    >
      <div>
        <p className="text-primary text-2xl font-bold">Seller description</p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center py-2">
          <div>
            <Avatar alt="shiv" src={Flower} />
          </div>
          <div className="ml-2">
            <p className="text-xl">{user.name}</p>
            <p className="text-sm">
              Member since {moment(user.createdAt).format("MMM Do YY")}
            </p>
          </div>
        </div>

        {/* report */}
        <div>
          <ReportOutlinedIcon fontSize="large" className="cursor-pointer" />
        </div>
      </div>

      <div className="mt-4 mb-2">
        <CustomButton
          text="Requst for details"
          className="px-5 py-3 tracking-widest text-20 w-full"
        />
      </div>
    </div>
  );
}

export default AboutSeller;
