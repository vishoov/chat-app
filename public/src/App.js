import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import styled from "styled-components";
import background from './assets/background.png'
import Navbar from './components/Navbar'
import AI from './pages/AI'
export default function App() {
  return (
    <AppContainer>
      <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="*" element={<Chat />} />
        <Route path="/ai" element={<AI/>}/>
      </Routes>
    </BrowserRouter>
    </AppContainer>
  );
}
const AppContainer = styled.div`
height: 100vh;
width: 100vw;
background-image: url(${background}); 
background-size: cover;
background-repeat: no-repeat;
background-position: center;


`;