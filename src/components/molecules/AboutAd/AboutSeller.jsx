import React, { useEffect, useState } from "react";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Flower from "../../../assets/sample.jpeg";
import axios from "../../../utils/axios";
import { errorToast, successToast } from "../../../utils/toast";

function AboutSeller({ ad }) {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(ad?.user);
  const [status, setStatus] = useState(0);

  const handleRequestDetails = async () => {
    await axios
      .put("/ad-request", {
        buyerId: userId,
        sellerId: user.id,
        type: "request",
        adId: ad.id,
        status: 2, //pending
      })
      .then((response) => {
        successToast("Request sent", 3000);
        setStatus(2);
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  useEffect(() => {
    console.log("ad details", ad);
    async function getStatus() {
      await axios
        .get("/ad-request-status", {
          params: {
            buyerId: userId,
            sellerId: user.id,
          },
        })
        .then((response) => {
          setStatus(response.data.status);
        })
        .catch((err) => {
          console.log(err);
          errorToast(err.message);
        });
    }

    getStatus();
  }, []);

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

      {status === 1 ? (
        <div className="ml-2 mt-3">
          {/* phone */}
          <div className="flex items-center">
            <div className="mr-5">
              <PhoneIcon />
            </div>
            <div>
              <p className="font-bold tracking-widest text-lg">{user?.phone}</p>
            </div>
          </div>

          {/* email */}
          <div className="flex items-center mt-2">
            <div className="mr-5">
              <EmailIcon />
            </div>
            <div>
              <p className="font-bold tracking-widest text-lg">{user?.email}</p>
            </div>
          </div>
        </div>
      ) : status === 2 ? (
        <div>
          <div className="mt-4 mb-2">
            <p className="px-5 py-3 tracking-widest text-20 w-full border-2 border-primary text-center bg-offWhite">
              Request pending
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 mb-2">
          <CustomButton
            text="Requst for details"
            className="px-5 py-3 tracking-widest text-20 w-full"
            onClick={handleRequestDetails}
          />
        </div>
      )}
    </div>
  );
}

export default AboutSeller;
