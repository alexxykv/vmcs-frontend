import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";


const PrivateRoute: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === 'Anonymous') {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
}


export default PrivateRoute;