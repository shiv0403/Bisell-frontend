import React from "react";

function CustomInput({ ...otherProps }) {
  return <input type="text" {...otherProps} />;
}

export default CustomInput;
