import { Flex } from "@chakra-ui/react";
import { useLayoutEffect , useRef } from "react";

type ScrollAlwaysBottomProps = {
  children: React.ReactNode; // best, accepts everything (see edge case below)
}

export const ScrollAlwaysBottom = ({children}: ScrollAlwaysBottomProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect (() => {
    if (null !== divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'auto' });
    }
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
