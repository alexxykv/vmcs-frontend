import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Auth } from '../api/Auth';


const PrivateRoute: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {

    Auth.WhoAmI().then(whoami => {
      console.log(isAnonymous);
      console.log(whoami);
      if (whoami !== 'Anonymous') {
        setIsAnonymous(false);
      }
    });
  }, []);

  return (
    <>
      {
        isAnonymous
          ? <Navigate to='/login' replace={true} />
          : <Outlet />
      }
    </>
  );
}


export default PrivateRoute;