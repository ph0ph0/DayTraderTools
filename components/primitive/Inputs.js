import { Input } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const StyledInput = ({ ...props }) => {
  return <Input {...props} />;
};

const StyledInputWrapper = styled(StyledInput)`
  &::placeholder {
    font-family: "Monoton";
  }
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: gray;
  font-size: large;
  margin-top: 20px;
`;

StyledInputWrapper.displayName = "StyledInput";
export default StyledInputWrapper;
