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
} from "@chakra-ui/react";

const InfoModal = (...props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <img
        // The health thing at the top
        src="/assets/HelpIcon.svg"
        alt="HelpIcon"
        boxShadow={"outline"}
        width={24}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What is this?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            The Partials Calculator Vending Machine is an algorithm that will
            optimise your exit strategy for you. If you exit trades according to
            the R value that the price has reached, then this is for you.
          </ModalBody>
          <ModalHeader>How does it work?</ModalHeader>
          <ModalBody>
            You provide the algorithm with two sets of data, your R Values and
            your probabilities.{" "}
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

const InfoModalWrapper = styled(InfoModal)`
  :hover {
    cursor: help;
  }
`;

export default InfoModalWrapper;
