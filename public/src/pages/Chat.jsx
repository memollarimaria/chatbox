import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import axios from "axios";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        } else {
          setCurrentUser(
            await JSON.parse(localStorage.getItem("chat-app-user"))
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        if (!currentUser) {
          return;
        }
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDatas();
  }, [currentUser]);

  return (
    <Container>
      {currentUser && (
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      )}
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  // min-height: 100vh;
  // min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #101110;
  overflow:scroll;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #101110;
    display: grid;
    grid-template-columns: auto 1fr auto;
  }
`;
