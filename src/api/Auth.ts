import { LoginData, RegisterData } from '../interfaces/dto/auth';
import { LoginResponse, RegisterResponse, WhoAmIType } from '../interfaces/responses/auth';
import { JWTState } from '../interfaces/states';
import { api, deleteToken, setToken } from './Api';


export class Auth {
  public static async Register(registerData: RegisterData) {
    const response = await api.post('auth/register/', registerData);
    if (response.status === 200) {
      const data = response.data as RegisterResponse;
      setToken(data as JWTState);
    }
  }

  public static async Login(loginData: LoginData) {
    const response = await api.post('auth/login/', loginData);
    if (response.status === 200) {
      const data = response.data as LoginResponse;
      setToken(data as JWTState);
    }
  }

  public static async Logout() {
    const response = await api.get('auth/logout/');
    if (response.status === 200) {
      deleteToken();
    }
  }

  public static async WhoAmI() {
    const response = await api.get('auth/whoami/');
    if (response.status === 200) {
      const whoami: WhoAmIType = response.data === 'Anonymous'
        ? 'Anonymous'
        : 'Authorized';
      return whoami;
    }
  }
}