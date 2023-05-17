import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const WelcomePage: React.FC = () => {
  const auth = useAuth();

  if (auth.status === 'Authorized') {
    return <Navigate to='/dashboard' replace={true} />
  }

  return (
    <>Hello</>
  );
}


export default WelcomePage;