import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Center, Textarea } from "@chakra-ui/react";

const VendingMachineWindow = ({ ...props }) => {
  const x = useMotionValue(500);

  const isOpen = false;

  return (
    <WindowHolder>
      <Window
        animate={{
          height: isOpen ? "10px" : "200px",
          transition: { duration: 3, ease: "anticipate" },
        }}
      />
      <ResultBucket resize={"none"} disabled></ResultBucket>
    </WindowHolder>
  );
};

const WindowHolder = styled(Center)`
  margin-top: 70px;
  height: 200px;
  /* background-color: blue; */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  /* margin-bottom: 50px; */
`;

// #d9e7fc
const Window = styled(motion.div)`
  margin-top: 0px;
  width: 250px;
  height: 200px;
  border-radius: 5px;
  border-color: #acc6f2;
  background-color: #acc6f2;
  border-bottom-color: #9da5b3;
  border-bottom-width: thin;
  border-width: 12px;
  z-index: 2;
  /* visibility: hidden; */
`;

const ResultBucket = styled(Textarea)`
  margin-top: 0px;
  width: 250px;
  height: 200px;
  background-color: #d9e0fa;
  position: absolute;
  z-index: 1;
  border-radius: 5px;
  border-width: 7px;
  border-color: #363e4d;
  outline: none;
  overflow: auto;
  &:hover {
    border-color: #363e4d;
  }
  padding-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
`;

const VendingMachineWindowWrapper = styled(VendingMachineWindow)``;

export default VendingMachineWindowWrapper;
