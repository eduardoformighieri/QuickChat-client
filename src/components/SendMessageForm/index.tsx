import { Flex, Input } from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { useSockets } from "../../contexts/Sockets";

type Inputs = {
  message: string,
};


export default function SendMessageForm() {
  const { handleSubmitNewMessage } = useSockets()

  const { resetField, handleSubmit, control } = useForm<Inputs>();
  function onSubmit (data: Inputs){
    const { message } = data;
    handleSubmitNewMessage(message)
    resetField('message');
  }

  return (
    <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
      <Flex >
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) =>
          <Input {...field}
          autoComplete="off"
          bg='#030D17'
          p='4'
          m='4'
          placeholder='Type your message here...'
          _placeholder={{ opacity: 1, color: 'gray.100' }}
          variant='unstyled' />}
        />
        <button type="submit">
          <Flex mr='4'>
           <MdSend size={24} color='gray.200' />
          </Flex>
        </button>
      </Flex>
    </form>
  );
}
