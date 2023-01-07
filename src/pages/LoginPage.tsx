import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../hooks/useAuth';
import { LoginPageProps } from '../interfaces/props';
import {
  paperStyle, gridStyle, titleStyle, logoStyle, toggleTipStyle,
  buttonContainerStyle, paperContentStyle, toggleButtonStyle,
} from '../styles/LoginPage';


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

  const renderToggleTip = () => {
    switch (form) {
      case 'Signin': return <>Don't have an account?</>
      case 'Signup': return <>Already registered?</>
    }
  }

  const renderToggleButton = () => {
    switch (form) {
      case 'Signin': return <>Sign Up!</>
      case 'Signup': return <>Sign In!</>
    }
  }

  if (auth.status === 'Authorized') {
    return <Navigate to="/main" state={{ from: location }} />;
  }

  return (
    <Paper elevation={3} style={paperStyle}>
      <Box style={paperContentStyle}>
        <Grid style={gridStyle}>
          <Typography style={titleStyle}>WELCOME</Typography>
          <Typography style={logoStyle}>VMCS</Typography>
        </Grid>
        {renderForm()}
        <Box style={buttonContainerStyle}>
          <Button disabled variant='text' style={toggleTipStyle}>{renderToggleTip()}</Button>
          <Button variant='text' style={toggleButtonStyle} onClick={toggleForm}>{renderToggleButton()}</Button>
        </Box>
      </Box>
    </Paper>
  )
}


export default LoginPage;