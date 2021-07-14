import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

const IMAGE =
  "https://previews.123rf.com/images/pamela4578/pamela45781810/pamela4578181000097/112030550-the-beautiful-red-spice-of-the-saffron-flower.jpg";

export default function ProductSimple() {
  return (
    <Center
      // Container for the entire vending machine
      py={12}
      width="500px"
      // boxShadow={"lg"}
      // border={"1px"}
      // borderColor={"gray.300"}
      display="flex"
      flexDirection="column"
      alignContent={"flex-end"}
      justifyContent={"flex-end"}
    >
      <img
        // The health thing at the top
        src="/assets/PC_VendingMachineTop_SVG.svg"
        alt="An SVG of an eye"
        boxShadow={"outline"}
        width={150}
      />
      <Center
        // The top red panel of the vending machine
        role={"group"}
        p={6}
        w={"full"}
        height={"150px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"lg"}
        // rounded={"lg"}
        // pos={"relative"}
        zIndex={1}
        // border={"1px"}
        borderTopRightRadius={"50"}
        borderTopLeftRadius={"50"}
        borderBottomLeftRadius={"0"}
        borderBottomRightRadius={"0"}
        // borderColor={"gray.900"}
        bg={"red.400"}
        fontSize={"40"}
        textAlign={"center"}
        color={"whiteAlpha.700"}
        fontFamily={"Monoton"}
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
        </style>
        Partials Calculator
      </Center>
      <Center
        // The middle panel of the vending machine. This contains the central panel and its components
        role={"group"}
        p={6}
        w={"full"}
        height={"500px"}
        bg={useColorModeValue("white", "gray.800")}
        // boxShadow={"outline"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        border={"1px"}
        borderColor={"red.400"}
        borderTopRightRadius={"0"}
        borderTopLeftRadius={"0"}
        borderBottomLeftRadius={"5"}
        borderBottomRightRadius={"5"}
        // bg={"red.400"}
        fontSize={"40"}
        textAlign={"center"}
        color={"whiteAlpha.700"}
        fontFamily={"Monoton"}
      >
        <Center
          // The central panel of the vending machine. This contains the inputs and button
          role={"group"}
          p={6}
          w={"80%"}
          height={"80%"}
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
        ></Center>
      </Center>
    </Center>
  );
}

// return (
//   <Center
//     py={12}
//     width="500px"
//     boxShadow={"lg"}
//     borderTopRightRadius="50"
//     borderTopLeftRadius="50"
//   >
//     <Box
//       role={"group"}
//       p={6}
//       w={"full"}
//       bg={useColorModeValue("white", "gray.800")}
//       boxShadow={"2xl"}
//       rounded={"lg"}
//       pos={"relative"}
//       zIndex={1}
//     >
//       <Box
//         rounded={"lg"}
//         mt={-12}
//         pos={"relative"}
//         height={"530px"}
//         _after={{
//           transition: "all .3s ease",
//           content: '""',
//           w: "full",
//           h: "full",
//           pos: "absolute",
//           top: 5,
//           left: 0,
//           backgroundImage: `url(${IMAGE})`,
//           filter: "blur(15px)",
//           zIndex: -1,
//         }}
//         _groupHover={{
//           _after: {
//             filter: "blur(150px)",
//           },
//         }}
//       ></Box>
//       <Stack pt={10} align={"center"}>
//         <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
//           Brand
//         </Text>
//         <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
//           Nice Chair, pink
//         </Heading>
//         <Stack direction={"row"} align={"center"}>
//           <Text fontWeight={800} fontSize={"xl"}>
//             $57
//           </Text>
//           <Text textDecoration={"line-through"} color={"gray.600"}>
//             $199
//           </Text>
//         </Stack>
//       </Stack>
//     </Box>
//   </Center>
// );
