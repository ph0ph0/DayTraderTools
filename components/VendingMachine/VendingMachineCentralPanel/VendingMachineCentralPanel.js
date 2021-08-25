import styled from "styled-components";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Flex,
  Link,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import StyledInputWrapper from "../../primitive/Inputs";
import LeverButton from "../LeverButton";
import VendingMachineWindowWrapper from "../vendingMachineWindow/VendingMachineWindow";
import ErrorText from "../../primitive/ErrorText";
import NotificationText from "../../primitive/NotificationText";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { motion } from "framer-motion";
import TopRowWrapper from "../InnerPanelTopRow/InnerPanelTopRowWrapper";

const VendingMachineCentralPanel = ({ api, ...props }) => {
  return (
    <>
      <BackgroundAnimation api={api} />
      <Box
        // The central panel of the vending machine. This contains the inputs and button
        role={"group"}
        p={6}
        w={"80%"}
        height={"95%"}
        bg={useColorModeValue("white", "gray.800")}
        // boxShadow={"lg"}
        // rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        border={"2px"}
        borderColor={"gray.100"}
        borderTopRightRadius={"50"}
        borderTopLeftRadius={"50"}
        borderBottomLeftRadius={"50"}
        borderBottomRightRadius={"50"}
        // bg={"red.400"}
        fontSize={"40"}
        textAlign={"center"}
        color={"whiteAlpha.700"}
        fontFamily={"Monoton"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <TopRowWrapper api={api} />
        <StyledInputWrapper
          placeholder={"R Values"}
          value={api.rValues}
          onChange={(event) => api.updateRValues(event.target.value)}
        />
        <StyledInputWrapper
          placeholder={"Probability"}
          value={api.probabilities}
          onChange={(event) => api.updateProbabilities(event.target.value)}
        />
        <LeverButton api={api} />
        {api.notification && (
          <NotificationText>{api.notification}</NotificationText>
        )}
        {api.error && <ErrorText>{api.error}</ErrorText>}
        <Loader api={api} />
        <VendingMachineWindowWrapper api={api} />
      </Box>
    </>
  );
};

const VendingMachineCentralPanelWrapper = styled(VendingMachineCentralPanel)``;

const AnimationDiv = styled(motion.div)`
  position: absolute;
  z-index: -10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: red; */
`;

const SpinnerDiv = styled(motion.div)`
  position: absolute;
  width: 450px;
  height: 20px;
  background-color: #d5d6f0;
`;

const BackgroundAnimation = ({ api, children, ...props }) => {
  return (
    <>
      {api.loading && (
        <AnimationDiv
          animate={{ backgroundColor: ["hsl(0,100, 92)", "hsl(361, 100, 92)"] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      )}
      {api.loading && (
        <SpinnerDiv
          animate={{
            rotate: [0, 360],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            backgroundColor: ["hsl(0,100, 92)", "hsl(361, 100, 92)"],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      )}
      {api.loading && (
        <SpinnerDiv
          animate={{
            rotate: [360, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </>
  );
};

const StyledLoader = styled(motion.div)`
  position: absolute;
  top: 47px;
  right: 0;
  left: 0;
  bottom: 0;

  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Loader = ({ api }) => {
  return (
    <>
      {api.loading && (
        <StyledLoader>
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["100% 1%", "1% 100%"],
              x: 100,
              y: [20, 0, 20],
            }}
            initial={{
              x: -100,
              y: [20, 0, 20],
            }}
            transition={{
              flip: Infinity,
              duration: 1.9,
              ease: "easeInOut",
            }}
            style={{
              height: "20px",
              background: "#4287f5",
              width: "20px",
              //   borderRadius: "2% 50%",
            }}
          ></motion.div>
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["100% 1%", "1% 100%"],
              x: -90,
              y: [20, 0, 20],
            }}
            initial={{
              x: 90,
              y: [20, 0, 20],
            }}
            transition={{
              flip: Infinity,
              duration: 2.1,
              ease: "easeInOut",
            }}
            style={{
              height: "20px",
              background: "#f5c242",
              width: "20px",
              //   borderRadius: "2% 50%",
            }}
          ></motion.div>
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["100% 1%", "1% 100%"],
              x: -40,
              y: [20, 0, 20],
            }}
            initial={{
              x: 40,
              y: [20, 0, 20],
            }}
            transition={{
              flip: Infinity,
              duration: 2.3,
              ease: "easeInOut",
            }}
            style={{
              height: "20px",
              background: "#f59342",
              width: "20px",
              //   borderRadius: "2% 50%",
            }}
          ></motion.div>
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["100% 1%", "1% 100%"],
              x: -70,
              y: [20, 0, 20],
            }}
            initial={{
              x: 70,
              y: [20, 0, 20],
            }}
            transition={{
              flip: Infinity,
              duration: 1.7,
              ease: "easeInOut",
            }}
            style={{
              height: "20px",
              background: "#88d17b",
              width: "20px",
              //   borderRadius: "2% 50%",
            }}
          ></motion.div>
        </StyledLoader>
      )}
    </>
  );
};

export default VendingMachineCentralPanelWrapper;
