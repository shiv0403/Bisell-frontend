import React, { useState } from "react";
import CustomInput from "../components/atoms/CustomInput/CustomInput";
import CustomMultiselect from "../components/atoms/CustomMultiselect/CustomMultiselect";
import AdCard from "../components/molecules/AdCard/AdCard";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function SearchPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [collegesSelected, setCollegesSelected] = useState([]);
  const [collegeSelected, setCollegeSelected] = useState("");
  const [sortBy, setSortBy] = useState("");

  const colleges = [
    "Jaypee institute of information technology, noida",
    "Indian institute of technology, Bombay",
    "All india institute of medical sciences",
    "Manipal institute of technology, manglore",
    "Jawaharlal national institute of tenchnology, delhi",
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSort = (param, order) => {
    setAnchorEl(null);
  };

  return (
    <div className="w-85p m-auto flex justify-between mt-7">
      {/* filters and sort */}
      <div
        className="mr-5 mt-12 border-2 border-offWhite p-5 bg-white"
        style={{ width: "500px" }}
      >
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
                value={
                  collegeSelected.slice(0, 40) +
                  `${collegeSelected.length > 40 && "..."}`
                }
                onChange={(e) => {
                  setCollegesSelected((prev) => [...prev, e.target.value]);
                  setCollegeSelected(e.target.value);
                }}
              />
            </div>

            {/* selected colleges */}
            <div className="mt-3">
              {collegesSelected?.map((college) => (
                <p
                  className="mb-2 bg-primary text-white inline-block mr-3 px-2 py-1 rounded-full text-sm"
                  key={college}
                >
                  <span>{college.slice(0, 40)}</span>
                  {college.length > 40 && <span>...</span>}
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

      <div className="w-full ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold mb-4 tracking-wider">
              <span className="font-normal">Results of </span>"random query"
            </h1>
          </div>

          {/* sort by */}
          <div className="flex items-center">
            <div>
              <p>
                <span className="font-bold">SORT BY</span>: {sortBy}
              </p>
            </div>
            <div>
              <div className="ml-2 cursor-pointer" onClick={handleClick}>
                <ExpandMoreIcon />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseSort}
              >
                <MenuItem
                  onClick={(e) => {
                    handleCloseSort("date");
                    setSortBy("Date published");
                  }}
                >
                  Date published
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSort("price", "asc");
                    setSortBy("Price low to high");
                  }}
                >
                  Price low to high
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSort("price", "desc");
                    setSortBy("Price high to low");
                  }}
                >
                  Price high to low
                </MenuItem>
              </Menu>
            </div>
          </div>
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
