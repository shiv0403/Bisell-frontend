import React, { useEffect, useState } from "react";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../../assets/bisell_logo.jpg";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { addQueryParams } from "../../../utils/queryParams";
import axios from "../../../utils/axios";
import { errorToast, successToast } from "../../../utils/toast";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

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

  menu: {
    width: "20rem",
    marginTop: "50px",
    padding: 0,
  },
  menuItem: {
    padding: 0,
    margin: 0,
  },
}));

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");

  const [openLogin, setOpenLogin] = useState(false);
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [notifications, setNotifications] = useState([]);
  const [notificationClicked, setNotificationClicked] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [notificationSelected, setNotificationSelected] = useState("");

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

  const handleClickNotif = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotif = (notification) => {
    setAnchorEl(null);

    if (notification.type === "request") {
      setShowPopup(true);
      setNotificationSelected(notification);
    }
  };

  const handleRequest = async (status) => {
    let buyerId = JSON.parse(notificationSelected.data).buyerId;
    let sellerId = JSON.parse(notificationSelected.data).sellerId;

    await axios
      .put("/ad-request-permissions", {
        buyerId,
        sellerId,
        status,
      })
      .then((response) => {
        if (status === 0) {
          successToast("Access denied", 5000);
        } else {
          successToast("Access allowed", 5000);
        }

        setShowPopup(false);
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  useEffect(() => {
    async function getNotifications() {
      await axios
        .get(`/get-notifications/${userId}`)
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }

    getNotifications();
  }, []);

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

      {/* popup notfication */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={showPopup}
          onClose={() => setShowPopup(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showPopup}>
            <div className={classes.paper}>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: notificationSelected.content,
                  }}
                  className="text-xl"
                ></p>
              </div>
              <div className="flex mt-4 justify-around text-center">
                <div className="mr-5 w-full">
                  <CustomButton
                    text="Allow"
                    className="p-2 tracking-wider w-2/3"
                    onClick={() => handleRequest(1)}
                  />
                </div>
                <div className="w-full">
                  <CustomButton
                    text="Decline"
                    className="p-2 tracking-wider w-2/3 text-primary"
                    outlined={true}
                    onClick={() => handleRequest(0)}
                  />
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
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
              <div>
                <NotificationsNoneIcon
                  className={classes.notif}
                  onClick={handleClickNotif}
                />

                <div>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseNotif}
                    className={classes.menu}
                  >
                    {notifications?.map((notification, idx) => {
                      return (
                        <MenuItem
                          onClick={() => handleCloseNotif(notification)}
                          key={notification.id}
                          className={classes.menuItem}
                        >
                          <p
                            dangerouslySetInnerHTML={{
                              __html: notification.content,
                            }}
                            className={
                              idx & 1
                                ? "text-sm whitespace-normal p-2"
                                : "text-sm whitespace-normal p-2 bg-alternate"
                            }
                            style={{ width: "20rem" }}
                          ></p>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </div>
              </div>
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
