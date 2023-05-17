import { api, deleteToken, setToken } from "./Api";
import { AuthStatusType, JWTData, LoginData, RegisterData } from "../interfaces/dto";
import { ApiRoutes, CookieKeys, LocalStorageKeys } from "../enums";
import Cookies from "js-cookie";
import path from "path";

const ANONYMOUS: AuthStatusType = 'Anonymous';
const AUTHORIZED: AuthStatusType = 'Authorized';

export default class Auth {
  public static async Register(registerData: RegisterData) {
    const url = path.join(ApiRoutes.Auth, 'register');
    const response = await api.post(url, registerData);
    if (response.status === 200) {
      const jwt = response.data as JWTData;

      setToken(jwt.token);
      localStorage.setItem(LocalStorageKeys.TOKEN, JSON.stringify(jwt));
      Cookies.set(CookieKeys.AuthStatus, AUTHORIZED);
    }
  }

  public static async Login(loginData: LoginData) {
    const url = path.join(ApiRoutes.Auth, 'login');
    const response = await api.post(url, loginData);
    if (response.status === 200) {
      const jwt = response.data as JWTData;

      setToken(jwt.token);
      localStorage.setItem(LocalStorageKeys.TOKEN, JSON.stringify(jwt));
      Cookies.set(CookieKeys.AuthStatus, AUTHORIZED);
    }
  }

  public static async Logout() {
    const url = path.join(ApiRoutes.Auth, 'logout');
    const response = await api.get(url);
    if (response.status === 200) {
      deleteToken();
      localStorage.removeItem(LocalStorageKeys.TOKEN);
      Cookies.set(CookieKeys.AuthStatus, ANONYMOUS);
    }
  }

  public static async WhoAmI() {
    const url = path.join(ApiRoutes.Auth, 'whoami');
    const response = await api.get(url);
    if (response.status === 200) {
      const authStatus: AuthStatusType = response.data === ANONYMOUS
        ? ANONYMOUS
        : AUTHORIZED;
      Cookies.set(CookieKeys.AuthStatus, authStatus);
      return authStatus;
    }

    throw new Error();
  }
}