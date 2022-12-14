import { LoginData, RegisterData } from '../interfaces/dto';
import api from './Api';

export class Auth {
  public async Register(registerData: RegisterData) {
    const response = await api.post('auth/register/', registerData);
    return response.data;
  }

  public async Login(loginData: LoginData) {
    const response = await api.post('auth/login/', loginData);
    return response.data;
  }

  public async Logout() {
    const response = await api.get('auth/logout/');
    return response.data;
  }

  public async WhoAmI() {
    const response = await api.get('auth/whoami/');
    return response.data;
  }
}
