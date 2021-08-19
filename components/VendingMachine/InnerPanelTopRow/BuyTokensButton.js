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

const BuyTokensButton = ({ api, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ActionButton onClick={onOpen}>
        <strong>Buy Tokens</strong>
      </ActionButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Cunt</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ActionButton = styled.button`
  width: 125px;
  height: 40px;

  color: white;
  font-size: 17px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-color: #bbf2aa;
  border-radius: 5px;
  border: none;

  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

export default BuyTokensButton;
