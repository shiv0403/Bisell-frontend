import React from "react";
import classNames from "../../../utils/classNames";

function CustomInput({
  label,
  maxLength,
  required,
  className,
  width,
  disabled = false,
  ...otherProps
}) {
  return (
    <div className={width}>
      <div
        className={classNames(
          "text-coolGray text-12 leading-16 flex align-center"
        )}
      >
        {label ? (
          disabled ? (
            <label id="label" className="text-12 leading-16 text-DEE8FF">
              {" "}
              {label}{" "}
            </label>
          ) : (
            <label id="label" className="text-coolGray text-12 leading-16">
              {" "}
              {label}{" "}
            </label>
          )
        ) : null}
      </div>
      <input
        className={className}
        type="text"
        {...otherProps}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
}

export default CustomInput;
