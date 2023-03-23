import axios from 'axios';
import { JWTData } from '../interfaces/dto/auth';
import LocalStorageKeys from '../enums/LocalStorageKeys';


export const api = axios.create({
  //poemnyat
  baseURL: "https://8wg1qmj8-5001.euw.devtunnels.ms/",
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
    const jwtData = JSON.parse(jwt) as JWTData;
    const expiration = new Date(jwtData.expiration);

    if (expiration.getTime() < Date.now()) {
      deleteToken();
    } else {
      setToken(jwtData.token);
    }
  }
}

checkJWT();