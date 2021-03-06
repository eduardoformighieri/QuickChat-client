import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { io } from "socket.io-client";
import { message } from '../types';
import {API_URL} from '../utils/api'


const socket = io(API_URL!)


type SocketsProviderProps = {
  children: React.ReactNode;
}


type SocketsContextTypes = {
  messages: message[];
  handleSubmitNewMessage: (message: string) => void;
  handleJoining: (values: { username: string, chatName: string}) => void;
  chatName: string | null;
  user: string | null;
}

const SocketsContext = createContext<SocketsContextTypes>(
  {
    messages: [],
    handleSubmitNewMessage: () => {},
    handleJoining: () => {},
    chatName: '',
    user: '',
  }
);

socket.on("connect", () => {
  console.log(socket.id);

});

socket.on("custom error", (error) => {
  alert(error);
});


export function SocketsProvider({ children }: SocketsProviderProps) {
  const [newMessageReceived, setNewMessageReceived] = useState(false)
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [chatName, setChatName] = useState(localStorage.getItem('chatName'))

  const navigate = useNavigate();

  socket.on('messageStored', () => setNewMessageReceived(!newMessageReceived))

  const handleJoining = useCallback((values: { username: string, chatName: string }) => {

    try {
      fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: values.chatName
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } throw new Error('Request error');
      })
      .then((responseJson) => console.log(responseJson))
      .catch((error) => {
        alert(error)
        navigate('/');
      });
      localStorage.setItem('user', values.username)
      localStorage.setItem('chatName', values.chatName)
      setUser(values.username)
      setChatName(values.chatName)
    }catch (error) {
      alert(error)
    }
  }, [])

  const handleSubmitNewMessage = useCallback((message: string) => {
    socket.emit('message', { chatName: chatName, author: user, content: message })
  }, [chatName, user]);

  useEffect(() => {
    async function fetchData () {
      fetch(`${API_URL}/chat/${chatName}`)
        .then((response) => response.json())
        .then((data) => setMessages(data.messages))
    }
    fetchData();
  }, [chatName, newMessageReceived]);



  const providerValue = useMemo(
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
