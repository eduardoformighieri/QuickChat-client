import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
      },
      body: {
        bg: 'black',
        color: 'gray.50',
      },
      button: {
        all: 'unset',
        cursor: 'pointer'
      }
    },
  },
});
