import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Center, Textarea, Box } from "@chakra-ui/react";

const VendingMachineWindow = ({ api, ...props }) => {
  return (
    <WindowHolder>
      <Window
        animate={{
          height: api.windowIsOpen ? "10px" : "200px",
          transition: { duration: 3, ease: "easeInOut" },
        }}
      />
      <ResultBucket resize={"none"} disabled>
        cuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcuntcunt
      </ResultBucket>
    </WindowHolder>
  );
};

const WindowHolder = styled(Box)`
  margin: 0px;
  padding: 0px;
  margin-top: 100px;
  height: 200px;
  width: 250px;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  /* margin-bottom: 50px; */
`;

// #d9e7fc
const Window = styled(motion.div)`
  /* position: absolute; */
  margin-top: 0px;
  width: 250px;
  height: 200px;
  border-radius: 5px;
  border-color: #acc6f2;
  /* border-color: red; */
  background-color: #acc6f2;
  /* background-color: red; */
  border-bottom-color: #9da5b3;
  border-bottom-width: thin;
  border-width: 12px;
  z-index: 2;
  /* visibility: hidden; */
`;

const ResultBucket = styled.div`
  position: absolute;
  margin-top: 0px;
  /* margin-left: 800px; */
  width: 250px;
  height: 200px;
  background-color: #d9e0fa;
  /* background-color: green; */
  z-index: 1;
  border-radius: 5px;
  border-width: 7px;
  /* border-color: blue; */
  outline: none;
  overflow: auto;
  &:hover {
    border-color: #363e4d;
  }
  padding-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  color: black;
`;

const VendingMachineWindowWrapper = styled(VendingMachineWindow)``;

VendingMachineWindowWrapper.displayName = "VendingMachineWindow";

export default VendingMachineWindowWrapper;
