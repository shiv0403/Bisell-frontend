import React, { useRef } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { errorToast } from "../../../utils/toast";

function PhotoUpload({ img, handleFileChange, index }) {
  const imgRef = useRef();

  const checkFileSize = (event) => {
    let files = event.target.files;
    let size = 5242880;
    let err = [];
    let status = true;
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = "Plaese upload file of size less than 5MB\n";
        status = false;
      }
    }
    for (let z = 0; z < err.length; z++) {
      errorToast(err[z]);
      event.target.value = null;
      status = false;
    }
    return status;
  };

  const checkMimeType = (event) => {
    let files = event.target.files;
    let err = [];

    const types = ["image/png", "image/jpeg"];

    let status = true;
    for (let x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = "Please upload image as JPG, JPEG or PNG\n";
        status = false;
      }
    }

    for (let z = 0; z < err.length; z++) {
      errorToast(err[z]);
      event.target.value = null;
      status = false;
    }
    return status;
  };

  const fileChange = (e) => {
    if (e.target.files.length > 0 && checkMimeType(e) && checkFileSize(e)) {
      handleFileChange(e.target.files[0], index);
    }
  };

  return (
    <div
      className="border-2 border-secondary rounded relative cursor-pointer"
      style={{ height: "100px", width: "100px" }}
      onClick={() => imgRef.current.click()}
    >
      <AddAPhotoIcon
        className="text-gray absolute right-8 top-7"
        fontSize="large"
      />
      <input
        type="file"
        className="hidden"
        ref={imgRef}
        onChange={fileChange}
      />
    </div>
  );
}

export default PhotoUpload;
