import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
        <Link to="/ai">
          <button className="brand">
            <h4>Chat with AI</h4>
          </button>
        </Link>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;


  .brand {
    display: flex;
    width:100%;
    align-items: center;
    border-radius:2rem;
    cursor:pointer;
    
    gap: 1rem;
    justify-content: center;
    background-color:black;
    h4 {
      
      color: white;
      
    }
  }
  .contacts {
    background-color: rgba(0, 0, 0, 0.4); 
    background-filter:blur(5px);
    border-radius:1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.1rem;
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      
      min-height: 1rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.3rem;
      
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 1.5rem;
        }
      }
      .username {
        border-radius: 2rem;
      
        h3 {
          color: white;
          font-weight: 300;
          font-size: 0.8rem; 
        }
      }
      
    }
    .selected {
      background-color: black;
    }
  }

  .current-user {
    margin-top:0.5rem;
    background-color: rgba(0, 0, 0, 0.4); 
    border-radius:1rem;
    background-filter:blur(100px);
    padding:0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 80%;
      }
    }
    .username {
      h2 {
        color: white;
        font-weight:300;
        font-size:1rem;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
