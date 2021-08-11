import { React, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

const Lever = ({ api, ...props }) => {
  const x = useMotionValue(0);

  const onDragEnd = (_, info) => {
    if (info.point.y > 900) {
      window.log("HIT");
      api.submitData();
    }
  };

  return (
    <>
      <LeverTrack />
      <LeverButton
        {...props}
        // The central button
        src="/assets/PC_VendingMachineButton_8.png"
        alt="Vending Machine Button"
        width={100}
        margin={3}
        drag={true}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, cursor: "grabbing" }}
        dragElastic={{ top: 0, bottom: 0.2 }}
        dragTransition={{ bounceStiffness: 10000, bounceDamping: 10 }}
        onDragEnd={onDragEnd}
      />
    </>
  );
};

const LeverTrack = styled.div`
  position: absolute;
  width: 20px;
  height: 130px;
  top: 194px;
  background: gray;
  border-radius: 5px;
  z-index: -1;
`;

const LeverButton = styled(motion.img)`
  margin-top: 20px;
  z-index: 10;
  /* visibility: hidden; */
`;

const LeverButtonWrapper = styled(Lever)``;

LeverButtonWrapper.displayName = "LeverButton";
export default LeverButtonWrapper;
