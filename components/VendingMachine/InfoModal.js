import styled from "styled-components";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { Tooltip } from "@chakra-ui/tooltip";

const Links = [
  { name: "Data Mining", slug: "data-mining" },
  { name: "Vending Machines", slug: "/" },
];

const InfoIcon = styled.img`
  width: 30px;
  :hover {
    cursor: pointer;
  }
`;

const InfoModal = (...props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Click for more info">
        <InfoIcon
          // The health thing at the top
          src="/assets/HelpIcon.svg"
          alt="HelpIcon"
          // boxShadow={"outline"}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What is this?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            The Partials Calculator Vending Machine is an algorithm that will
            optimise your exit strategy for you. If you partial trades according
            to the R value that the price has reached, then this is for you.
          </ModalBody>
          <ModalHeader>Why would I want to use this?</ModalHeader>
          <ModalBody>
            The vast majority of traders will partially exit trades at arbitrary
            R values, typically around 2 or 3 R. These values are rarely based
            on a robust analysis of the trading system, and instead are based on
            intuition. As a result, the trader often leaves large profits on the
            table, and fails to maximise the profitability of their trading
            system. This algorithm does the heavy lifting for you by calculating
            the partial size and the R Values that you should be partialling at.
          </ModalBody>
          <ModalHeader>How does it work?</ModalHeader>
          <ModalBody>
            You provide the vending machine with two sets of data, your R Values
            and your Probabilities. The application then sends these to the
            cloud where a proprietary algorithm runs hundreds of thousands,
            sometimes millions of calculations (depending on the number of
            inputs), in order to optimise your exit strategy. The algorithm then
            sends back the top 20 partialling strategies with the greatest
            profit value.
          </ModalBody>
          <ModalHeader>How do I use it?</ModalHeader>
          <ModalBody>
            <strong>1)</strong> Collect R Value and Probability data for your
            trades. See here for{" "}
            <strong>
              <Link target="_blank" href={"partial-calculator-info"}>
                how to collect R Value/Probability data
              </Link>
            </strong>{" "}
            for your trades. <br />
            <strong>2)</strong> Type your R Values as a comma separated list
            into the R Values Input (max 4 R Values). R Values should increase
            from left to right. <br />
            <strong>3)</strong> Type your Probabilities as a comma separated
            list into the Probabilities Input (max 4 Probabilities).
            Probabilities should decrease from left to right.
            <br />
            <strong>4)</strong> The number of R Values should equal the number
            of probabilities.
            <br />
            <strong>5)</strong> Pull down on the green lever to send your inputs
            to the algorithm. <br />
            <strong>6)</strong> Wait until the results come back. A set of 4 R
            Values and 4 Probabilities can take up to 1 minute 30s to run!
            <br />
            <strong>7)</strong> The algorithm will send back the top 20 results.
            The number of suggested partials will be equal to the number of R
            Values provided. If you provided 3 R Values and 3 Probabilities,
            then the results will have the format ((partial%1, partial%2,
            partial%3), Total Profit). For example, consider R Values = 2, 3, 4
            and Probabilities = 40, 28, 10. The top result from the algorithm
            might be ((20, 60, 100), 5284). This would mean that you should take
            a 20% partial at 2R, 60% partial at 3R, and close the entire
            position at 4R. Across 1000 trades, this would generate you 5284R.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const InfoModalWrapper = styled(InfoModal)``;

export default InfoModalWrapper;
