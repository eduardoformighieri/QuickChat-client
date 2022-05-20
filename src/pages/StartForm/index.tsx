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

import { Formik, Form, Field } from 'formik';

import { useSockets } from "../../contexts/Sockets";


function validateChatName(value: string) {
  let error;
  if (!value) {
    error = 'Chat name is required';
  } else if (!/^(\w|\s|\.|-)+$/.test(value)) {
    error = 'Invalid name, only letters (a-z), numbers (0-9), dashes (-), underscores (_) and dots (.) are allowed';
  }
  return error;
}

function validateUsername(value: string) {
  let error;
  if (!value) {
    error = 'Username is required';
  } else if (!/^(\w|\s|\.|-)+$/.test(value)) {
    error = 'Invalid username, only letters (a-z), numbers (0-9), dashes (-), underscores (_) and dots (.) are allowed';
  }
  return error;
}

export const StartForm = () => {
  const { handleJoining } = useSockets()
  const navigate = useNavigate();
  return (
  <Flex flexDir='column' alignContent='center'>
    <Text fontSize='5xl'>Quick Chat</Text>
    <Formik
      initialValues={{
        chatName: '',
        username: '',
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          handleJoining(values)
          actions.setSubmitting(false)
          navigate('chats');
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Field name='chatName' validate={validateChatName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.ChatName && form.touched.ChatName}>
                <FormLabel htmlFor='chatName'>Chat name</FormLabel>
                <Input {...field} id='chatName' placeholder='ex: The-Chads' />
                <FormErrorMessage>{form.errors.ChatName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='username' validate={validateUsername}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.username && form.touched.username}>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input {...field} id='username' placeholder='ex: GigaChad' />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button mt={4} colorScheme='blue' isLoading={props.isSubmitting} type='submit'>
            Start Chat
          </Button>
        </Form>
      )}
    </Formik>
  </Flex>
);
}
