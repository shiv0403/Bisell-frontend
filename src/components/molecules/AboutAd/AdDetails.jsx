import React from "react";

function AdDetails({ ad }) {
  return (
    <div className="border-offWhite border-2 p-4 rounded">
      <div>
        <h3 className="font-bold text-3xl tracking-wider text-primary">
          Details
        </h3>
      </div>
      <div className="mt-5">
        <p className="w-80p">{ad?.description}</p>
      </div>
    </div>
  );
}

export default AdDetails;
