import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/layout";
import GlobalFonts from "../fonts/fontStyles.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function MyApp({ Component, pageProps }) {
  const stripePromise = loadStripe(
    "pk_test_51JRdVUKIUZFawA4tZDUxmZoMRgCHUBqORh7zn6dhS1WNpANZCi15QzEtbtphj3IoiwYpZp7bODX2EfafP9yUZjw700CxWIUvt8"
  );

  return (
    <Elements stripe={stripePromise}>
      <ChakraProvider>
        <Layout>
          <GlobalFonts />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Elements>
  );
}

export default MyApp;
