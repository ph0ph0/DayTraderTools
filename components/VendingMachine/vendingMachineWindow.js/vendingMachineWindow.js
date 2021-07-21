import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation } from "framer-motion";

const VendingMachineWindow = ({ ...props }) => {
  const controls = useAnimation();

  const onDragEnd = (event, info) => {
    // if (info.point.x > 0 || info.point.x < 0) {
    console.log("Resetting drag");
    controls.start("beginning");
    // }
  };

  const variants = {
    beginning: { x: 0, y: 0 },
  };

  return (
    <Container props={props}>
      {/* <Circle
        drag={true}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.2, cursor: "grabbing" }}
        dragElastic={0}
        dragTransition={{ bounceStiffness: 10000, bounceDamping: 10 }}
      /> */}
    </Container>
  );
};

const Circle = styled(motion.div)`
  height: 100px;
  width: 100px;
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
  border-color: black;
  cursor: grab;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 450px;
`;

// const WindowWrapper = styled(Window)``;

const VendingMachineWindowWrapper = styled(VendingMachineWindow)``;

export default VendingMachineWindowWrapper;
