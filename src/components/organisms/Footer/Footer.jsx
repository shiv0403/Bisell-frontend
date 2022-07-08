import React from "react";
import Logo from "../../../assets/bisell_logo.png";

function Footer() {
  return (
    <div className="bg-white p-2">
      <div>
        <img
          src={Logo}
          alt="logo"
          style={{ height: "50px", width: "130px", margin: "auto" }}
        />
      </div>
      <div className="text-center mt-2 ml-4">
        <p className="tracking-widest text-md">2022 All rights reserved ©</p>
      </div>
    </div>
  );
}

export default Footer;
