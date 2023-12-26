import React from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
}
export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 15rem;
  }
  span {
    color: green;
  }
  @media (max-width: 720px) {
    img {
      height: 7rem;
    }
    h3, h1{
      font-size:small;
    }
  }
`;
