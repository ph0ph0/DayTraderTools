import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const LeverButton = ({ ...props }) => {
  return (
    <>
      <LeverTrack />
      <motion.img
        {...props}
        // The central button
        src="/assets/PC_VendingMachineButton.svg"
        alt="Vending Machine Button"
        // boxShadow={"outline"}
        width={100}
        margin={3}
        drag={true}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, cursor: "grabbing" }}
        dragElastic={{ top: 0, bottom: 0.2 }}
        dragTransition={{ bounceStiffness: 10000, bounceDamping: 10 }}
      />
    </>
  );
};

const LeverTrack = styled.div`
  position: absolute;
  width: 20px;
  height: 100px;
  top: 150px;
  background: gray;
  border-radius: 5px;
`;

const LeverButtonWrapper = styled(LeverButton)``;

export default LeverButtonWrapper;
