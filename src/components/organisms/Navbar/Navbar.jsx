import React, { useState } from "react";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../../assets/bisell_logo.jpg";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { addQueryParams } from "../../../utils/queryParams";

const useStyles = makeStyles({
  icon: {
    fontSize: "30px",
  },
  profile: {
    fontSize: "33px",
    color: "gray",
    cursor: "pointer",
    marginLeft: "30px",
  },
  logout: {
    color: "black",
    fontSize: "30px",
    cursor: "pointer",
    marginLeft: "30px",
  },

  notif: {
    color: "black",
    fontSize: "30px",
    cursor: "pointer",
    marginLeft: "30px",
  },
});

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");

  const [openLogin, setOpenLogin] = useState(false);
  const [search, setSearch] = useState("");

  const handleOpen = () => {
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleSearch = () => {
    let path = "/search";

    addQueryParams(navigate, location, "query", search, path);
  };

  return (
    <div className="bg-navbar flex w-full justify-around p-4 items-center border-b-2 border-offWhite z-100">
      {/* logo */}
      <div>
        <img
          src={Logo}
          className="h-12 w-50 cursor-pointer"
          alt="bisell"
          onClick={() => navigate("/")}
        />
      </div>

      {/* search bar */}
      <div className="flex w-1/2">
        <CustomInput
          placeholder="Search for you essentials..."
          className="w-full border-2 border-primary p-2 text-lg bg-white"
          width="w-95p"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CustomButton
          icon={<SearchIcon className={classes.icon} />}
          className="color-white p-2 px-3 h-12 bg-primary"
          onClick={handleSearch}
        />
      </div>

      <div>
        <Login
          open={openLogin}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      </div>

      {/* Auth / Profile */}
      <div className="flex items-center">
        <div>
          <CustomButton
            text="Post Ad +"
            className="p-2 rounded"
            onClick={() => navigate("/post-ad")}
          />
        </div>
        {userId ? (
          <div className="flex items-center">
            <div>
              <AccountCircleRoundedIcon
                className={classes.profile}
                onClick={() => navigate("/profile")}
              />
            </div>
            <div>
              <NotificationsNoneIcon className={classes.notif} />
            </div>
            <div>
              <ExitToAppIcon className={classes.logout} />
            </div>
          </div>
        ) : (
          <div onClick={handleOpen}>
            <p className="underline ml-10 text-xl cursor-pointer">Login</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
