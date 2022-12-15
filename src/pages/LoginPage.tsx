import React, { useState } from 'react';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import { LoginPageProps } from '../interfaces/props';


type FormType = 'Signin' | 'Signup';

const LoginPage: React.FC<LoginPageProps> = () => {
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

  return (
    <>
    {
      renderForm()
    }
    </>
  );
}


export default LoginPage;