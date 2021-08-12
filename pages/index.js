import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";
import Card from "../components/VendingMachine/VendingMachine";
import SimpleButton from "../components/primitive/simpleButton";
import styled from "styled-components";
import "../devConfig.config";
import { Flex } from "@chakra-ui/layout";
import ComingSoon from "../components/ComingSoon/ComingSoon";

export default function Home() {
  return (
    <Flex
      borderWidth="1px"
      align="top"
      justifyContent="center"
      flexDirection={"column"}
      alignItems="center"
    >
      <ComingSoon />
      <Card />
    </Flex>
  );
}
