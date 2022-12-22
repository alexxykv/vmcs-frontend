import axios from 'axios';
import { JWTState } from '../interfaces/states';
import LocalStorageKeys from '../enums/LocalStorageKeys';


export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
});

export function setToken(token: string): void {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function deleteToken(): void {
  delete api.defaults.headers.common["Authorization"];
}

function checkJWT(): void {
  const jwt = localStorage.getItem(LocalStorageKeys.TOKEN);

  if (jwt !== null) {
    const jwtState = JSON.parse(jwt) as JWTState;
    const expiration = new Date(jwtState.expiration);

    if (expiration.getTime() < Date.now()) {
      deleteToken();
    } else {
      setToken(jwtState.token);
    }
  }
}

checkJWT();