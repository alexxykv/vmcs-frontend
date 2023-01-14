import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const WelcomePage: React.FC = () => {
  const auth = useAuth();

  if (auth.status === 'Authorized') {
    return <Navigate to='/main' replace={true} />
  }

  return (
    <>Hello</>
  );
}


export default WelcomePage;