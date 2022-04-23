import React, { useState } from "react";
import CustomInput from "../components/atoms/CustomInput/CustomInput";
import CustomMultiselect from "../components/atoms/CustomMultiselect/CustomMultiselect";
import AdCard from "../components/molecules/AdCard/AdCard";

function SearchPage() {
  const [collegesSelected, setCollegesSelected] = useState([]);

  const colleges = [
    "Jaypee institute of information technology, noida",
    "Indian institute of technology, Bombay",
    "All india institute of medical sciences",
    "Manipal institute of technology, manglore",
    "Jawaharlal national institute of tenchnology, delhi",
  ];

  return (
    <div className="w-85p m-auto flex justify-between mt-7">
      {/* filters and sort */}
      <div className="w-30p mr-5 mt-12 border-2 border-offWhite p-5 bg-white">
        {/* filters */}
        <div>
          <div>
            <p className="text-coolGray">Filters</p>
          </div>
          {/* college */}
          <div className="mt-4">
            <div>
              <p className="font-bold text-lg text-primary">COLLEGE</p>
            </div>

            <div className="mt-2">
              <p className="text-coolGray">Choose one or more college</p>
            </div>

            <div className="mt-2">
              <CustomMultiselect
                items={colleges}
                className="w-full"
                onChange={(e) =>
                  setCollegesSelected((prev) => [...prev, e.target.value])
                }
              />
            </div>

            {/* selected colleges */}
            <div className="mt-3">
              {collegesSelected?.map((college) => (
                <p className="mb-2 bg-primary text-white inline-block mr-3 px-2 py-1 rounded-full text-sm">
                  <span>{college}</span>
                </p>
              ))}
            </div>
          </div>

          {/* budget */}
          <div className="mt-4">
            <div>
              <p className="font-bold text-lg text-primary">BUDGET</p>
            </div>
            <div className="mt-2">
              <p className="text-coolGray">Choose a range below</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <CustomInput
                placeholder="min"
                className="w-70p inline-block px-2 border-2 border-offWhite"
              />
              <span className="mx-5">to</span>
              <CustomInput
                placeholder="max"
                className="w-70p inline-block px-2 border-2 border-offWhite"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div>
          <h1 className="text-2xl font-bold mb-4 tracking-wider">
            Results of "random query"
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
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
    </div>
  );
}

export default SearchPage;
