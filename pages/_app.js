// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider colorScheme="purple">
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
