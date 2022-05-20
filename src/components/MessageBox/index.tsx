import { Text, Box } from "@chakra-ui/react"
import { messageBoxProps } from "../../types"

export const MessageBox = ({isOwnMessage, username, message, time}: messageBoxProps) => {

  return (
    <Box m='4' p='4' alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}  w={400}>
      <Box borderRadius={4} mb='4' p='4' bg={isOwnMessage ? 'green.300' : 'gray.300'}>
        <Text mb={2} color='gray.900' fontWeight='bold' fontSize='md' >{username}</Text>
        <Text color='gray.900' fontSize='md'>{message}</Text>
      </Box>
      <Text color='gray.400' textAlign={isOwnMessage ? 'start' : 'end'} fontSize='xs'>{time}</Text>
    </Box>
)
}
