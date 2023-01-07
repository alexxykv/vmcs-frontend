import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';


const MainPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    auth.logout(() => navigate('/login', { replace: true }));
  };

  return (
    <>
      <div>Main Page</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}


export default MainPage;