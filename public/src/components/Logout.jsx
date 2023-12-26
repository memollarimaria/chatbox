import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosLogOut } from "react-icons/io";

function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <IoIosLogOut />
    </Button>
  );
}

export default Logout;

const Button = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius: 0.5rem;
 border: none;
 color: white;
 cursor: pointer;
 margin-right: 15px;
 svg{
    font-size: 1.5rem
 }
 &:hover{
    opacity: 0.5;
 }

 }
`;
