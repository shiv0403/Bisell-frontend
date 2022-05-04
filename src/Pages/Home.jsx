import React from "react";
import AdCard from "../components/molecules/AdCard/AdCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="w-80p m-auto">
      <div>
        <h1 className="text-2xl font-bold mb-4 mt-7 tracking-wider">
          Latest Ads
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {arr.map((el) => {
          return (
            <div key={el} onClick={() => navigate(`/ad-page/${el}`)}>
              <AdCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
