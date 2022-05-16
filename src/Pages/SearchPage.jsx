import React, { useEffect, useState } from "react";
import CustomInput from "../components/atoms/CustomInput/CustomInput";
import CustomMultiselect from "../components/atoms/CustomMultiselect/CustomMultiselect";
import AdCard from "../components/molecules/AdCard/AdCard";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { addQueryParams, addQueryParamsArray } from "../utils/queryParams";
import queryString from "query-string";
import { errorToast } from "../utils/toast";
import CustomButton from "../components/atoms/CustomButton/CustomButton";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  let searchQuery = queryString.parse(location.search)?.query || "";
  let minBudgetQuery = queryString.parse(location.search)?.minBudget || "";
  let maxBudgetQuery = queryString.parse(location.search)?.maxBudget || "";
  let collegeIdsQuery = queryString.parse(location.search)?.clgIds || "";
  let param = queryString.parse(location.search)?.param || "";
  let order = queryString.parse(location.search)?.order || "";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [collegesSelected, setCollegesSelected] = useState([]);
  const [collegeSelected, setCollegeSelected] = useState("");
  const [sortBy, setSortBy] = useState("Date published");

  const [results, setResults] = useState([]);

  const [colleges, setColleges] = useState([]);
  const [collegeIds, setCollegeIds] = useState([]);
  const [collegeNames, setCollegeNames] = useState([]);

  const [minBudget, setMinBudget] = useState(minBudgetQuery);
  const [maxBudget, setMaxBudget] = useState(maxBudgetQuery);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSort = (param, order) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function getColleges() {
      await axios
        .get("/colleges")
        .then((response) => {
          setColleges(response.data);

          setCollegeNames(() =>
            response.data?.map((college) => {
              return college.college;
            })
          );

          let alreadySelectedClgs = collegeIdsQuery
            ? collegeIdsQuery.split(",")
            : "";

          if (alreadySelectedClgs) {
            for (let i in alreadySelectedClgs) {
              let obj = response.data.find(
                (clg) => clg.id === parseInt(alreadySelectedClgs[i])
              );

              if (obj) {
                setCollegesSelected((prev) => [...prev, obj.college]);
              }
            }
          }
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }

    getColleges();
  }, []);

  useEffect(() => {
    async function getResults() {
      await axios
        .get("/ads-get", {
          params: {
            search: searchQuery,
            collegeIds: collegeIdsQuery ? collegeIdsQuery.split(",") : "",
            minBudget: minBudgetQuery,
            maxBudget: maxBudgetQuery,
            param,
            order,
          },
        })
        .then((response) => {
          console.log("response -->", response.data);
          setResults(response.data);
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }

    getResults();
  }, [location]);

  const handleFilter = () => {
    let arr = [];

    arr.push({ key: "minBudget", value: minBudget });

    arr.push({ key: "maxBudget", value: maxBudget });

    arr.push({ key: "clgIds", value: collegeIds.toString() });

    addQueryParamsArray(navigate, location, arr);
  };

  const handleSort = (param, order) => {
    let arr = [
      { key: "param", value: param },
      { key: "order", value: order },
    ];
    addQueryParamsArray(navigate, location, arr);
  };

  return (
    <div className="w-85p m-auto flex justify-between mt-7 h-screen">
      {/* filters and sort */}
      <div
        className="mr-5 h-fit mt-12 border-2 border-offWhite p-5 bg-white"
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
                items={collegeNames}
                className="w-full"
                value={
                  collegeSelected.slice(0, 40) +
                  `${collegeSelected.length > 40 && "..."}`
                }
                onChange={(e) => {
                  setCollegesSelected((prev) => [...prev, e.target.value]);
                  setCollegeSelected(e.target.value);

                  // find the id of clg
                  for (let i in colleges) {
                    if (colleges[i].college === e.target.value) {
                      setCollegeIds((prev) => [...prev, colleges[i].id]);
                      break;
                    }
                  }
                }}
              />
            </div>

            {/* selected colleges */}
            <div className="mt-3">
              {collegesSelected?.map((college) => (
                <p
                  className="mb-2 bg-primary text-white inline-block mr-3 px-2 py-1 rounded-full text-sm cursor-pointer"
                  key={college}
                  onClick={() => {
                    // find the id of clg
                    for (let i in colleges) {
                      if (colleges[i].college === college) {
                        setCollegeIds((prev) =>
                          prev.filter((id) => id !== colleges[i].id)
                        );
                        setCollegesSelected((prev) =>
                          prev.filter((clg) => clg !== colleges[i].college)
                        );
                        break;
                      }
                    }
                  }}
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
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
              />
              <span className="mx-5">to</span>
              <CustomInput
                placeholder="max"
                className="w-70p inline-block px-2 border-2 border-offWhite"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>
          </div>

          {/* apply */}
          <div className="mt-12">
            <CustomButton
              text="Apply"
              className="px-4 py-2 w-full tracking-wider font-bold rounded"
              onClick={handleFilter}
            />
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wider">
              <span className="font-normal">Results of </span>"{searchQuery}"
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
                    handleSort("date", "DESC");
                  }}
                >
                  Date published
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSort("price", "asc");
                    setSortBy("Price low to high");
                    handleSort("price", "ASC");
                  }}
                >
                  Price low to high
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSort("price", "desc");
                    setSortBy("Price high to low");
                    handleSort("price", "DESC");
                  }}
                >
                  Price high to low
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-5">
          {results.length > 0 &&
            results.map((ad) => (
              <div key={ad.id}>
                <AdCard ad={ad} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
