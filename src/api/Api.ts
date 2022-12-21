import axios from 'axios';
import { JWTState } from '../interfaces/states';
import LocalStorageKeys from '../enums/LocalStorageKeys';

export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
});

export function setToken(jwt: JWTState): void {
  localStorage.setItem(LocalStorageKeys.TOKEN, JSON.stringify(jwt));
  api.defaults.headers.common["Authorization"] = `Bearer ${jwt.token}`;
}

export function deleteToken(): void {
  localStorage.removeItem(LocalStorageKeys.TOKEN);
  delete api.defaults.headers.common["Authorization"];
}

export function checkJWT(): void {
  const jwt = localStorage.getItem(LocalStorageKeys.TOKEN);

  if (jwt !== null) {
    const jwtState = JSON.parse(jwt) as JWTState;
    const expiration = new Date(jwtState.expiration);

    if (expiration.getTime() < Date.now()) {
      deleteToken();
    } else {
      setToken(jwtState);
    }
  }
}