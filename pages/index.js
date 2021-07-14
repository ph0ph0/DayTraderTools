import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";
import Card from "../components/card/card";
import SimpleButton from "../components/primitive/simpleButton";
import { Box, Flex, HStack, Grid } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex borderWidth="1px" align="top" justifyContent="center">
      <Card />
      <SimpleButton />
    </Flex>
  );
}
