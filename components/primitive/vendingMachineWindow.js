import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const VendingMachineWindow = ({ ...props }) => {
  return (
    <Container props={props}>
      <Circle
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 2 }}
        initial={{ x: 0, y: 0 }}
        onDragEnd={(event, info) => info.point.}
      />
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
