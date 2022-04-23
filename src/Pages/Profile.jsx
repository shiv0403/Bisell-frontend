import React, { useState } from "react";
import ProfileNav from "../components/molecules/ProfileNav/ProfileNav";
import MyAds from "../components/organisms/Profile/MyAds";
import ProfileMain from "../components/organisms/Profile/Profile";

function Profile() {
  const [editProfile, setEditProfile] = useState(true);
  const [ads, setAds] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(true);
    setAds(false);
  };

  const handleMyAds = () => {
    setEditProfile(false);
    setAds(true);
  };

  return (
    <div className="p-10 mx-10">
      <div className="flex">
        <div className="w-1/3 mr-10 mt-1">
          <ProfileNav
            editProfile={editProfile}
            ads={ads}
            handleEditProfile={handleEditProfile}
            handleMyAds={handleMyAds}
          />
        </div>
        {editProfile && (
          <div className="w-full">
            <ProfileMain />
          </div>
        )}

        {ads && (
          <div className="w-full">
            <MyAds />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
