import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const VendingMachineWindow = ({ ...props }) => {
  const x = useMotionValue(500);

  const y = true;

  return <Window animate={{ height: y ? "100px" : "10px" }} />;
};

const Circle = styled.div`
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

const Window = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-color: red;
  border-width: 2px;
  background-color: green;
`;

// const WindowWrapper = styled(Window)``;

const VendingMachineWindowWrapper = styled(VendingMachineWindow)``;

export default VendingMachineWindowWrapper;
