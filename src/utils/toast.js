import { toast } from "react-toastify";

export const successToast = (message, time = 5000) => {
  toast.success(message, {
    position: "top-center",
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export const errorToast = (message, time = 5000) => {
  toast.error(message, {
    position: "top-center",
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};
