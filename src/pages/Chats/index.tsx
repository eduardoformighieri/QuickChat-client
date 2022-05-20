import {
  Flex,
  Text,
  FormErrorMessage,
  InputLeftElement,
  Input,
  VStack,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";

import { MessageBox } from "../../components/MessageBox";
import { ScrollAlwaysBottom } from "../../components/ScrollAlwaysBottom";
import { useSockets } from "../../contexts/Sockets";

import { message } from '../../types'

import { useNavigate } from 'react-router-dom';
import SendMessageForm from "../../components/SendMessageForm";



export const Chats = () => {
  const navigate = useNavigate();

  const { messages, chatName, user } = useSockets()

  useEffect(() => {
    if (!chatName){
      navigate('/');
    }
  })

  function dateFormatter(stringDate: string){
    const date = new Date(stringDate)
    return date.toLocaleString("pt-BR")
  }

  return (
  <Flex  justify='center'>
    <Box w={1000} bg='#061B2E' >
      <Box bg='gray.500'  p='4' >
        <Text color='gray.200' fontWeight='bold' fontSize='xl'>{chatName}</Text>
      </Box>
      <ScrollAlwaysBottom >
        {messages.map((message: message) => <MessageBox key={message.author + message.createdAt} isOwnMessage={user === message.author} username={message.author} message={message.content} time={dateFormatter(message.createdAt)} />)}
      </ScrollAlwaysBottom>
      <Flex>
        <SendMessageForm />
      </Flex>
    </Box>
  </Flex>
)
}

