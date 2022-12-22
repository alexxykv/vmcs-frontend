import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { LoginData } from '../interfaces/dto/auth';
import { SigninFormProps } from '../interfaces/props';


const SigninForm: React.FC<SigninFormProps> = () => {
  // Авторизация
  const auth = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    login: '',
    password: ''
  });

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
    auth.login(loginData, () => navigate('/main', { replace: true }));
  };

  return (
    <>
      <h1>Авторизация</h1>
      <form>
        <label style={{ display: 'block' }}>
          <span style={{ marginRight: '10px' }}>Login</span>
          <input
            type='text'
            value={loginData.login}
            onChange={handleChangeLogin}
          />
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ marginRight: '10px' }}>Password</span>
          <input
            type='password'
            value={loginData.password}
            onChange={handleChangePassword}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}


export default SigninForm;