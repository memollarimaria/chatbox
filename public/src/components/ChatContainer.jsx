import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "received"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
export default ChatContainer;

const Container = styled.div`
 padding-top: 1.5rem;
 display:grid;
 grid-template-rows: auto 1fr auto;
 gap: 0.1rem;
 overflow: hidden;
 .chat-header {
    height:10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
            img{
                height: 3rem;
            }
        }
        .username {
            h3{
                color: white;
            }
        }
    }
 }
 .chat-messages{
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  .message{
    display: flex;
    align-items: center;
    .content{
      max-width: 40%,
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1rem;
      border-radius: 0.5rem;
      color: #d1d1d1;
    }
  }
  .sended {
    justify-content:flex-end;
    .content{
      background-color: green;
    }
  }
  .received {
    justify-content: flex-start;
    .content {
      background-color: #403f3f;
    }
  }
 }
 ::-webkit-scrollbar {
  width: 2px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: grey; 
  border-radius: 10px;
}
}
`;
