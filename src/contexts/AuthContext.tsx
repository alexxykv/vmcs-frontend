import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthStatusType, LoginData, RegisterData } from "../interfaces/dto";
import { AuthContextType } from "../interfaces/Contexts";
import { WithChildrenProps } from "../interfaces/Props";
import { CookieKeys } from "../enums";
import { Auth } from "../api";

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const authStatus = (Cookies.get(CookieKeys.AuthStatus) ?? 'Anonymous') as AuthStatusType;
  const [status, setStatus] = useState<AuthStatusType>(authStatus);

  useEffect(() => {
    (async function () {
      const whoami = await Auth.WhoAmI();
      setStatus(whoami);
    })();
  }, []);

  const login = async (loginData: LoginData, callback: VoidFunction) => {
    await Auth.Login(loginData);
    setStatus('Authorized');
    callback();
  };

  const logout = async (callback: VoidFunction) => {
    await Auth.Logout();
    setStatus('Anonymous');
    callback();
  }

  const register = async (registerData: RegisterData, callback: VoidFunction) => {
    await Auth.Register(registerData);
    setStatus('Authorized');
    callback();
  }

  const value = {
    status,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}