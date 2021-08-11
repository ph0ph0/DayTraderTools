import React from "react";
import styled from "styled-components";

const SimpleButton = ({ api, ...props }) => {
  return (
    <div {...props}>
      <button>Click Me</button>
    </div>
  );
};

const SimpleButtonWrapper = styled(SimpleButton)`
  border: 1px solid red;
  border: none;
  font-size: 14px;

  margin-left: 5px;
  margin-top: 150px;
  padding: 0px;

  color: #05f22c;
  background-color: #fff;

  :hover {
    cursor: pointer;
  }

  :focus {
    outline: 0;
  }
`;
SimpleButtonWrapper.displayName = "SimpleButton";
export default SimpleButtonWrapper;
