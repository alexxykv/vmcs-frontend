import React, { useEffect, useState } from 'react';
import { Auth } from '../api/Auth';
import AuthContext from '../contexts/AuthContext';
import { LoginData, RegisterData } from '../interfaces/dto/auth';
import { WithChildrenProps } from '../interfaces/props';
import { AuthStatusType } from '../interfaces/responses/auth';
import Cookies from 'js-cookie';
import CookieKeys from '../enums/CookieKeys';


const AuthProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const authStatus = (Cookies.get(CookieKeys.AuthStatus) ?? 'Anonymous') as AuthStatusType;
  const [status, setStatus] = useState<AuthStatusType>(authStatus);

  useEffect(() => {
    Auth.WhoAmI().then(whoami => {
      setStatus(whoami as AuthStatusType);
    });
  }, []);

  const login = (loginData: LoginData, callback: VoidFunction) => {
    return Auth.Login(loginData).then(() => {
      setStatus('Authorized');
      callback();
    });
  };

  const logout = (callback: VoidFunction) => {
    return Auth.Logout().then(() => {
      setStatus('Anonymous');
      callback();
    });
  }

  const register = (registerData: RegisterData, callback: VoidFunction) => {
    return Auth.Register(registerData).then(() => {
      setStatus('Authorized');
      callback();
    });
  }

  const value = { status, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;