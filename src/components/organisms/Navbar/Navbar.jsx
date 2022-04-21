import React from "react";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../../assets/bisell_logo.png";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  icon: {
    fontSize: "30px",
  },
  profile: {
    fontSize: "40px",
    color: "gray",
    cursor: "pointer",
  },
  logout: {
    color: "black",
    fontSize: "35px",
    cursor: "pointer",
    marginLeft: "40px",
  },
});

function Navbar() {
  const classes = useStyles();

  return (
    <div className="flex w-full justify-around p-4 items-center">
      {/* logo */}
      <div>
        <img src={Logo} className="h-12 w-50" />
      </div>

      {/* search bar */}
      <div className="flex w-1/2">
        <CustomInput
          placeholder="Search for you essentials"
          className="w-full border-2 border-primary p-2 text-lg"
          width="w-full"
        />
        <CustomButton
          icon={<SearchIcon className={classes.icon} />}
          className="color-white p-2 px-3 h-12"
        />
      </div>

      {/* Auth / Profile */}
      <div className="flex items-center">
        <div>
          <AccountCircleRoundedIcon className={classes.profile} />
        </div>

        <div>
          <ExitToAppIcon className={classes.logout} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
