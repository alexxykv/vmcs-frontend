import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGotoChannels: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    navigate('/channels');
  }

  return (
    <Button onClick={handleGotoChannels}>
      Перейти в каналы
    </Button>
  );
}


export default MainPage;