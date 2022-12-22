import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RegisterData } from '../interfaces/dto/auth';
import { SignupFormProps } from '../interfaces/props';


const SignupForm: React.FC<SignupFormProps> = () => {
  // Регистрация
  const auth = useAuth();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    login: '',
    password: '',
    email: ''
  });

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData(prev => {
      return {
        ...prev,
        login: event.target.value
      };
    });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData(prev => {
      return {
        ...prev,
        password: event.target.value
      };
    });
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData(prev => {
      return {
        ...prev,
        username: event.target.value
      };
    });
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData(prev => {
      return {
        ...prev,
        email: event.target.value
      };
    });
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    auth.register(registerData, () => navigate('/main', { replace: true }));
  };

  return (
    <>
      <h1>Регистрация</h1>
      <form>
        <label style={{ display: 'block' }}>
          <span style={{ marginRight: '10px' }}>Username</span>
          <input
            type='text'
            value={registerData.username}
            onChange={handleChangeUsername}
          />
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ marginRight: '10px' }}>Login</span>
          <input
            type='text'
            value={registerData.login}
            onChange={handleChangeLogin}
          />
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ marginRight: '10px' }}>Email</span>
          <input
            type='email'
            value={registerData.email}
            onChange={handleChangeEmail}
          />
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ marginRight: '10px' }}>Password</span>
          <input
            type='password'
            value={registerData.password}
            onChange={handleChangePassword}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}


export default SignupForm;