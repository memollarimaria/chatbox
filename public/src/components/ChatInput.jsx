import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleShowEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiPick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleInputBlur = () => {
    setShowEmojiPicker(false);
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleShowEmojiPicker} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiPick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onClick={handleInputBlur}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <AiOutlineSend />
        </button>
      </form>
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  height:10%;
  padding:0.2rem;
  padding-bottom:0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg {
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }
        .epr-main {
            position: absolute;
            top: -400px;
            height: 400px !important; 
            width: 300px !important; 
            left: 20px;
            background-color: black;
            box-shadow: 0 5px 10px #142701;
            border: none;
            ::-webkit-scrollbar {
                width: 5px;
              }
              
              ::-webkit-scrollbar-thumb {
                background-color: grey; 
              }
              
              ::-webkit-scrollbar-track {
                background-color: #050f03; 
              }
            input{
                background-color: black;
            }
            h2{
                background-color: black;
            }
        }
    }
  }
  .input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection {
            background-color: 
        }
        &:focus {
            outline: none;
        }
    }
    button {
        padding: 0.3rem 2rem;
        display: flex;
        border:none;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        svg{
            color:white;
            font-size: 1.5rem
        }
    }
  }
  }
`;
