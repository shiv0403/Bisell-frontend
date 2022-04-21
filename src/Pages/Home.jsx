import React from "react";
import AdCard from "../components/molecules/AdCard/AdCard";

function Home() {
  return (
    <div className="w-80p m-auto">
      <div>
        <h1 className="text-30 font-bold mb-4 mt-7 tracking-wider">
          Latest Ads
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
      </div>
    </div>
  );
}

export default Home;
