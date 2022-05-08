import React from "react";
import SiteMap from "../../../assets/sitemap.png";

function MapContainer({ ad }) {
  return (
    <div
      className="border-lightGray relative rounded cursor-pointer py-4 px-5"
      style={{ width: "60vh", borderWidth: "1px" }}
    >
      <div>
        <p className="font-bold text-2xl tracking-wide text-primary">
          Posted in
        </p>
      </div>

      <div>
        <p className="my-2">{ad?.user.college.college}</p>
      </div>

      {/* google map image */}
      <div>
        <img src={SiteMap} />
      </div>
    </div>
  );
}

export default MapContainer;
