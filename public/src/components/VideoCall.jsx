import React, { useState } from "react";
import LobbyScreen from "../components/Lobby";
import RoomPage from "../components/Room";
import { Routes, Route } from "react-router-dom";
const ChatPage = () => {
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomId, setRoomId] = useState(""); // Keep track of the current room ID

  const handleJoinRoom = (roomId) => {
    setIsInRoom(true);
    setRoomId(roomId);
  };

  const handleLeaveRoom = () => {
    setIsInRoom(false);
    setRoomId("");
  };

  return (
    <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
  );
};

export default ChatPage;
