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
        background: 'none',
        color: 'inherit',
        border: 'none',
        padding: 0,
        font: 'inherit',
        cursor: 'pointer',
        outline: 'inherit',
      }
    },
  },
});
