import { ChakraProvider } from "@chakra-ui/react"

import { theme } from './styles/theme';

import { StartForm } from './pages/StartForm'
import { Chats } from './pages/Chats'

import { SocketsProvider } from "./contexts/Sockets";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export const App = () => (
  <SocketsProvider>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<StartForm />} />
            <Route path="/chats" element={<Chats />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </SocketsProvider>
  )
