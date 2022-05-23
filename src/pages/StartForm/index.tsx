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

import { useNavigate } from 'react-router-dom';

import { useSockets } from "../../contexts/Sockets";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";

interface Inputs {
  username: string;
  chatName: string;
}

const patternErrorMessage = 'Only letters (a-z), numbers (0-9), dashes (-), underscores (_) and dots (.) are allowed.'

export const StartForm = () => {
  const { handleJoining } = useSockets()
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<Inputs>();

  function onSubmit (inputValues: Inputs){
    handleJoining(inputValues)
    navigate('chats');
  }

  return (
    <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="username" isInvalid={!!errors.username}>
        <FormLabel>Joining as...</FormLabel>
        <Input placeholder='Username'
          {...register("username", {
            required: true,
            maxLength: 20,
            pattern: /^(\w|\.|-)+$/
          })}
        />
        <FormErrorMessage>
          {errors.username?.type === "required" && 'Username is required.'}
          {errors.username?.type === "maxLength" && 'Username cannot exceed 20 characters.'}
          {errors.username?.type === "pattern" && patternErrorMessage}
        </FormErrorMessage>
      </FormControl>

      <FormControl id="lastNchatNameame" isInvalid={!!errors.chatName}>
        <FormLabel>Joining in...</FormLabel>
        <Input placeholder='Chat name'
          {...register("chatName", {
            required: true,
            maxLength: 20,
            pattern: /^(\w|\.|-)+$/
          })}
        />
        <FormErrorMessage>
        {errors.chatName?.type === "required" && 'Chat name is required.'}
          {errors.chatName?.type === "maxLength" && 'Chat name cannot exceed 20 characters.'}
          {errors.chatName?.type === "pattern" && patternErrorMessage}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='blue' isLoading={isSubmitting} type='submit'>
        Start Chat
      </Button>
    </form>
  );
}


