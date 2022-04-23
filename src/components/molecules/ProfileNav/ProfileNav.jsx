import React, { useState } from "react";
import CustomButton from "../../atoms/CustomButton/CustomButton";

function ProfileNav({ editProfile, ads, handleEditProfile, handleMyAds }) {
  return (
    <div>
      <div onClick={handleEditProfile}>
        <p
          className={
            editProfile
              ? "text-xl text-primary tracking-wide cursor-pointer font-bold"
              : "text-xl text-primary tracking-wide cursor-pointer"
          }
        >
          Edit profile
        </p>
      </div>
      <div className="mt-1" onClick={handleMyAds}>
        <p
          className={
            ads
              ? "text-xl text-primary tracking-wide cursor-pointer font-bold"
              : "text-xl text-primary tracking-wide cursor-pointer"
          }
        >
          My ads
        </p>
      </div>

      <div className="mt-5">
        <CustomButton text="Go to home" className="px-4 py-2 w-full text-lg" />
      </div>
    </div>
  );
}

export default ProfileNav;
