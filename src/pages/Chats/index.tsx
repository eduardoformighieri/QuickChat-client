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

import { AiOutlineArrowLeft } from "react-icons/ai";

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

  function leaveChat() {
    localStorage.clear()
    navigate('/')
  }

  return (
  <Flex justify='center' h='100vh'>
    <Flex flexDirection='column' w={1000} bg='#061B2E' >
      <Flex alignItems='center' borderBottomWidth={1} borderColor='gray.700'  p='4' >
        <button onClick={leaveChat}><AiOutlineArrowLeft color="white" size={24} /></button>
        <Text ml="4" color='gray.200' fontWeight='bold' fontSize='3xl'>{chatName}</Text>
      </Flex>
      <ScrollAlwaysBottom >
        {messages.map((message: message) => <MessageBox key={message.author + message.createdAt} isOwnMessage={user === message.author} username={message.author} message={message.content} time={dateFormatter(message.createdAt)} />)}
      </ScrollAlwaysBottom>
      <Flex mt='auto'>
        <SendMessageForm />
      </Flex>
    </Flex>
  </Flex>
)
}

