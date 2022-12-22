import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../hooks/useAuth';
import { LoginPageProps } from '../interfaces/props';


type FormType = 'Signin' | 'Signup';

const LoginPage: React.FC<LoginPageProps> = () => {
  const auth = useAuth();
  const location = useLocation();
  const [form, setForm] = useState<FormType>('Signin');

  const toggleForm = () => {
    switch (form) {
      case 'Signin': setForm('Signup'); break;
      case 'Signup': setForm('Signin'); break;
    }
  };

  const renderForm = () => {
    switch (form) {
      case 'Signin': return <SigninForm />
      case 'Signup': return <SignupForm />
    }
  };

  if (auth.status === 'Authorized') {
    return <Navigate to="/main" state={{ from: location }} />;
  }

  return (
    <>
      <button onClick={toggleForm}>Toggle</button>
      {renderForm()}
    </>
  );
}


export default LoginPage;