import React from "react";
import { ButtonTextWrapper, ButtonWrapper } from "./custom-button.styles";

const CustomButton = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <ButtonWrapper className={containerClass} id={id}>
      {/* Left Icon */}
      {leftIcon}

      {/* Button Text */}
      <ButtonTextWrapper>{title}</ButtonTextWrapper>

      {/* Right Icon */}
      {rightIcon}
    </ButtonWrapper>
  );
};

export default CustomButton;
