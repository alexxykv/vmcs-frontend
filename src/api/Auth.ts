import { api, deleteToken, setToken } from './Api';

import { AuthStatusType, JWTData, LoginData, RegisterData } from '../interfaces/dto/auth';

import CookieKeys from '../enums/CookieKeys';
import LocalStorageKeys from '../enums/LocalStorageKeys';

import Cookies from 'js-cookie';


const ANONYMOUS: AuthStatusType = 'Anonymous';
const AUTHORIZED: AuthStatusType = 'Authorized';

export class Auth {
  public static async Register(registerData: RegisterData) {
    const response = await api.post('auth/register/', registerData);
    if (response.status === 200) {
      const jwt = response.data as JWTData;

      setToken(jwt.token);
      localStorage.setItem(LocalStorageKeys.TOKEN, JSON.stringify(jwt));
      Cookies.set(CookieKeys.AuthStatus, AUTHORIZED);
    }
  }

  public static async Login(loginData: LoginData) {
    const response = await api.post('auth/login/', loginData);
    if (response.status === 200) {
      const jwt = response.data as JWTData;

      setToken(jwt.token);
      localStorage.setItem(LocalStorageKeys.TOKEN, JSON.stringify(jwt));
      Cookies.set(CookieKeys.AuthStatus, AUTHORIZED);
    }
  }

  public static async Logout() {
    const response = await api.get('auth/logout/');
    if (response.status === 200) {
      deleteToken();
      localStorage.removeItem(LocalStorageKeys.TOKEN);
      Cookies.set(CookieKeys.AuthStatus, ANONYMOUS);
    }
  }

  public static async WhoAmI() {
    const response = await api.get('auth/whoami/');
    if (response.status === 200) {
      const authStatus: AuthStatusType = response.data === ANONYMOUS
        ? ANONYMOUS
        : AUTHORIZED;
      Cookies.set(CookieKeys.AuthStatus, authStatus);
      return authStatus;
    }
  }
}