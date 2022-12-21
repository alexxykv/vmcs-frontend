import React, { useState } from 'react';
import { Auth } from '../api/Auth';
import { LoginData } from '../interfaces/dto/auth';
import { SigninFormProps } from '../interfaces/props';


const SigninForm: React.FC<SigninFormProps> = () => {
  // Авторизация
  const initialLoginData: LoginData = {
    login: '',
    password: ''
  }
  const [loginData, setLoginData] = useState<LoginData>(initialLoginData);

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => {
      return {
        ...prev,
        login: event.target.value
      };
    });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => {
      return {
        ...prev,
        password: event.target.value
      };
    });
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    Auth.Login(loginData)
  };

  return (
    <form>
      <label>
        <span>Login</span>
        <input
          type='text'
          value={loginData.login}
          onChange={handleChangeLogin}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type='password'
          value={loginData.password}
          onChange={handleChangePassword}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}


export default SigninForm;