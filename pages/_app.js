// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/karla";
import "@fontsource/inconsolata";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} colorScheme="purple">
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
