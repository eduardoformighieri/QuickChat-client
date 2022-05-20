import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from 'react';

import { io } from "socket.io-client";
const socket = io("http://localhost:3333")



type SocketsContextTypes = {
  messages: any;
  handleSubmitNewMessage: any;
}

const SocketsContext = createContext<any>(
  {
    messages: null,
    handleSubmitNewMessage: null,
  }
);

socket.on("connect", () => {
  console.log(socket.id);

});

socket.on("custom error", (error) => {
  alert(error);
});


export function SocketsProvider({ children }: any) {
  const [newMessageReceived, setNewMessageReceived] = useState(false)
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [chatName, setChatName] = useState(localStorage.getItem('chatName'))

  socket.on('messageStored', () => setNewMessageReceived(!newMessageReceived))

  const handleJoining = useCallback((values: any) => {
    fetch('http://localhost:3333/chat', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: values.chatName
      })
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

    localStorage.setItem('user', values.username)
    localStorage.setItem('chatName', values.chatName)
    setUser(values.username)
    setChatName(values.chatName)
  }, [])

  const handleSubmitNewMessage = useCallback((inputValue) => {
    socket.emit('message', { chatName: chatName, author: user, content: inputValue })
  }, [chatName, user]);

  useEffect(() => {
    async function fetchData () {
      fetch(`http://localhost:3333/chat/${chatName}`)
        .then((response) => response.json())
        .then((data) => setMessages(data.messages))
    }
    fetchData();
  }, [chatName, newMessageReceived]);



  const providerValue: any = useMemo(
    () => ({
      messages,
      handleSubmitNewMessage,
      handleJoining,
      chatName,
      user
    }),
    [messages, handleSubmitNewMessage, handleJoining, chatName, user]
  );

  return (
    <SocketsContext.Provider value={providerValue}>
      {children}
    </SocketsContext.Provider>
  );
}

export function useSockets() {
  const context = useContext(SocketsContext);

  return context;
}
