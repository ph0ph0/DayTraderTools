import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/layout";
import GlobalFonts from "../fonts/fontStyles.js";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <GlobalFonts />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
