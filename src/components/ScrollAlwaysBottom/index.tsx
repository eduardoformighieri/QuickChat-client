import { Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export const ScrollAlwaysBottom = ({children}: any) => {
  const divRef = useRef<any>(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'instant' });
  });

  return (
    <Flex css={{
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'none',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,0.1)',
      },
    }}  h={600} flexDir='column' overflowY='auto'>
      {children}
      <div ref={divRef} />
    </Flex>);
}
