import React from "react";
import classNames from "../../../utils/classNames";

export interface CustomButtonProps {
  text?: string;
  size?: "normal" | "large";
  disabled?: boolean;
  outlined?: boolean;
  className: any;
  icon: any;
}

/**
 * Component for custom button.
 *
 * @component
 * @example
 * return (
 *   <CustomButton text="Button" />
 * )
 */

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  outlined = false,
  disabled = false,
  size,
  className,
  icon,
  ...otherProps
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        {
          "bg-D7D4F5 text-B9B6EC": disabled,
          "hover:bg-primary hover:text-white": !disabled,
          "h-8 text-xs": size === "normal",
          "h-12 text-lg": size === "large",
        },
        {
          "bg-primary text-white": !outlined,
          "bg-white text-coolGray border border-lightGray": outlined,
        },
        "active:bg-primary rounded-lg font-nexabold leading-5",
        className
      )}
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default CustomButton;
