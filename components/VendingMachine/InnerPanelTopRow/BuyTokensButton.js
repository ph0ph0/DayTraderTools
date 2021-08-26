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
  Box,
} from "@chakra-ui/react";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";

const BuyTokensButton = ({ api, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Move this over to API so that we can handle errors.
    // Use your card Element with other Stripe.js APIs
    await api.sendDetailsToStripe(cardElement, stripe);
  };

  return (
    <>
      <ActionButton onClick={onOpen}>
        <strong>Buy Tokens</strong>
      </ActionButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Purchase Profit Tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Price: $4.99 for one token</ModalBody>
          <ModalBody>
            1 token = 1 spin (you can only buy one token at a time)
          </ModalBody>
          <ModalBody fontSize={"0.8em"}>
            Unfortunately, we have to charge to run the calculator since the
            calculations are resource intensive!
          </ModalBody>
          <Box w={"90%"} padding={"10px"} m={"5%"}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>
          <ModalBody fontSize={"0.6em"}>
            Please note that we use Stripe to securely collect payments.
          </ModalBody>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            {api.hasToken && (
              <TokenNotificationText errorText={false}>
                You have one token!
              </TokenNotificationText>
            )}
            {api.tokenError && (
              <TokenNotificationText errorText={true}>
                {api.tokenError}
              </TokenNotificationText>
            )}
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                onClick={(event) => handleSubmit(event)}
                disabled={api.buyTokensIsLoading || api.hasToken}
              >
                {api.buyTokensIsLoading ? "Loading..." : "Submit"}
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

const TokenNotificationText = styled.p`
  margin-left: 5%;
  font-size: medium;
  color: ${(props) => (props.errorText ? "red" : "green")};
`;

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
