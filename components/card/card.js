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
    <Box
      py={12}
      width="500px"
      boxShadow={"outline"}
      // border={"1px"}
      // borderColor={"gray.300"}
    >
      <Center
        role={"group"}
        p={6}
        w={"full"}
        height={"150px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"outline"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        // border={"1px"}
        borderTopRightRadius={"50"}
        borderTopLeftRadius={"50"}
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
    </Box>
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
