import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Logout from '../components/Logout';



const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  

  const handleSendMessage = async () => {
    // Make a request to the ChatGPT API with the user input
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: input },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    );

    // Update the conversation history with the response from ChatGPT
    setMessages([...messages, { role: 'assistant', content: response.data.choices[0].message.content }]);

    // Clear the input field
    setInput('');
  };

  return (
    <Container>
        <div className="header">
        <h2>Talk to your personal assistant!</h2>
        <Logout />
        </div>
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <div className="chat">
      <StyledInput
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
      
        <StyledButton onClick={handleSendMessage}>Send</StyledButton>
        </div>
      </div>
    </div>
    </Container>
  );
};

const Container = styled.div`
  height: 80vh;
  margin-top:2rem;
  width: 60vw;
  display: flex;
  margin-left:4rem;
  backdrop-filter: blur(20px);
  flex-direction: column;
  justify-content:space-between;
  padding:1rem;
  
  border-radius:2rem;
  
  .header{
    display:flex;
    justify-content:space-around;
  }
  h2{
    marging-right:10%;
    color:white
 }
  .chat{
    display:flex;
 
   
  }
    
   `;

   const StyledButton = styled.button`
  padding: 0.8rem 0.5rem;
  height:100%;
  margin-left:0.5rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-size: 1rem;
  outline: none;

  &:hover {
    background-color: #2980b9;
  }
`;




   const StyledInput = styled.input`
  width: 100%;
  height:50%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1rem;
`;

export default ChatComponent;