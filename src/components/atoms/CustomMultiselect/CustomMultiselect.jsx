import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "0.1rem solid #8493A8",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#8493A8",
      boxShadow: "0 0 0 0 #8493A8",
    },
  },
}))(InputBase);

function CustomMultiselect({ items, value, ...otherProps }) {
  return (
    <div>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={value}
        input={<BootstrapInput />}
        {...otherProps}
      >
        {items?.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default CustomMultiselect;
