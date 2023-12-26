import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import styled from "styled-components";
import Logout from "./Logout";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3 className="desktop-only">chatwme</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3 className="desktop-only">{contact.username}</h3>
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
              <h2 className="desktop-only">{currentUserName}</h2>
            </div>
            <Logout />
          </div>
        </Container>
      )}
    </>
  );
}

export default Contacts;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  max-height:100vh; 
  background-color: #141614;
  .brand {
    margin-top:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
        height: 2rem;
    }
    h3 {
        color: white;
        text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem; 
    margin-top: 15px;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact {
        border-bottom: 1px solid grey;
        width: 90%;
        cursor: pointer;
        padding: 0.4rem;
        gap: 2%;
        align-items: center;
        display: flex;
        transition. 0.5s ease-in-out;
        &:hover {
            opacity: 0.7;
            background-color: green;
        }
        .avatar{
            img {
                height: 2rem;
            }
        }
        .username {
            h3{
                color: white;
                font-weight: 300;
            }
        }
    }
    .selected {
        background-color: green;
    }
  }
  .current-user {
    padding:10px;
    background-color: #10110f;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    .avatar {
        img {
            height: 2rem;
        }
    }
    .username {
        h2 {
            color: white;
        }
    }
  }
  @media (max-width: 1020px) {
    .contact{
      justify-content:center;
    }
    h3.desktop-only {
      display: none;
    }
    h2.desktop-only {
      display: none;
    }
    .current-user {
   img {
      display: none;
    }
  }
  }
`;
