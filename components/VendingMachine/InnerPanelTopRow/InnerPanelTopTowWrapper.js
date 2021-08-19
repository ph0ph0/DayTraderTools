// This houses the info button and the buy tokens button

import React from "react";
import styled from "styled-components";
import InfoModal from "../InfoModal";

const TopRow = ({ ...props }) => {
  return (
    <div {...props}>
      {/* The Help Icon */}
      <InfoModal></InfoModal>
      <ActionButton>
        <strong>Buy Tokens</strong>
      </ActionButton>
    </div>
  );
};

const TopRowWrapper = styled(TopRow)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* background-color: blue; */
  width: 100%;
`;

const TokenButton = styled.button`
  height: 20px;
  width: 20px;
  background-color: red;
`;

const ActionButton = styled.button`
  width: 125px;
  height: 40px;

  color: white;
  font-size: 17px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-color: #bbf2aa;
  border-radius: 5px;
  border: none;

  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

export default TopRowWrapper;
