// This houses the info button and the buy tokens button

import React from "react";
import styled from "styled-components";
import InfoModal from "./InfoModal";
import BuyTokensButton from "./BuyTokensButton";

const TopRow = ({ api, ...props }) => {
  return (
    <div {...props}>
      {/* The Help Icon */}
      <InfoModal />
      <BuyTokensButton api={api} />
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

export default TopRowWrapper;
