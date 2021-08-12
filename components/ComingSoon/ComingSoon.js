import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Link,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { chakra } from "@chakra-ui/system";
import { Flex } from "@chakra-ui/layout";

function ComingSoon() {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        justify="center"
        bg={useColorModeValue("gray.300", "gray.100")}
        w="full"
        borderRadius="50px"
      >
        <Box
          w={{ base: "full", md: "75%", lg: "50%" }}
          px={4}
          py={20}
          textAlign={{ base: "left", md: "center" }}
        >
          <chakra.span
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color={useColorModeValue("gray.900", "gray.100")}
            mb={6}
          >
            <chakra.span display="block">ATR Exit Calculator</chakra.span>
            <chakra.span
              display="block"
              color={useColorModeValue("brand.600", "gray.500")}
            >
              Coming Soon...
            </chakra.span>
          </chakra.span>
          <Stack
            justifyContent={{ base: "left", md: "center" }}
            direction={{ base: "column", sm: "row" }}
            spacing={2}
            mt={2}
          >
            <Box ml={3} display="inline-flex" rounded="md" shadow="md">
              <Link
                w="full"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="md"
                color="brand.600"
                bg="white"
                _hover={{
                  bg: "brand.50",
                }}
              >
                Learn more
              </Link>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ComingSoon;
