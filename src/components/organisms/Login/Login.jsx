import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Logo from "../../../assets/bisell_logo.png";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "../../../utils/axios";
import { errorToast, successToast } from "../../../utils/toast";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "5px",
    width: "30%",
    height: "60%",
    position: "relative",
  },
}));

function Login({ open, handleClose, handleOpen }) {
  const classes = useStyles();
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setDisable(true);
    try {
      const response = await axios.post("/login", { email, password });
      const userData = response.data.user;

      localStorage.setItem("userId", userData.id);
      localStorage.setItem("email", userData.email);

      successToast("Logged in", 3000);

      handleClose();
      setDisable(false);
    } catch (error) {
      const errors = error.response.data.err;
      if (errors.email) {
        errorToast(errors.email, 3000);
      } else if (errors.password) {
        errorToast(errors.password, 3000);
      }

      setDisable(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div
              className="absolute right-2 top-2 cursor-pointer"
              onClick={handleClose}
            >
              <ClearIcon fontSize="large" />
            </div>
            <div className="mt-9">
              <div>
                <img
                  src={Logo}
                  alt="logo"
                  title="bisell"
                  width="150px"
                  className="m-auto"
                />
              </div>

              <div>
                <p className="font-bold text-xl text-primary text-center mt-5 tracking-wider">
                  Enter credentials
                </p>
              </div>

              <div className="mt-3">
                <div>
                  <CustomInput
                    placeholder="Email address"
                    className="border-2 border-primary w-full p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <CustomInput
                    placeholder="Password"
                    type="password"
                    className="border-2 border-primary w-full p-2 mt-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <CustomButton
                    text="Login"
                    className="p-2 mt-3 w-full text-md font-bold tracking-widest"
                    onClick={handleLogin}
                    disabled={disable}
                  />
                </div>
              </div>

              <div>
                <p className="text-secondary text-center mt-5 hover:underline cursor-pointer">
                  Don't have an account?
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Login;
