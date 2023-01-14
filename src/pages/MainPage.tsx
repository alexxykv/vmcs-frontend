import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
// import { useAuth } from '../hooks/useAuth';


const MainPage: React.FC = () => {
  // const auth = useAuth();
  const navigate = useNavigate();

  // const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
  //   event.preventDefault();
  //   auth.logout(() => navigate('/login', { replace: true }));
  // };

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