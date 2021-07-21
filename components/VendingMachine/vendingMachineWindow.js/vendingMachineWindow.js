import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { Center, Textarea } from "@chakra-ui/react";

const VendingMachineWindow = ({ ...props }) => {
  return (
    <Center>
      <Textarea height={"50%"} resize={"none"} disabled top={"100px"} />
      {/* <Circle></Circle> */}
    </Center>
  );
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

// const WindowWrapper = styled(Window)``;

const VendingMachineWindowWrapper = styled(VendingMachineWindow)``;

export default VendingMachineWindowWrapper;
