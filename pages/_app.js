// pages/_app.js

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Optionally, you can customize the Chakra theme or add colors, fonts, etc.
const theme = extendTheme({
  // custom configurations here, e.g.:
  // fonts: {
  //   body: '"Open Sans", sans-serif',
  //   heading: '"Roboto", sans-serif'
  // }
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;