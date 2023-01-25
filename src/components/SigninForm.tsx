import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { LoginData } from '../interfaces/dto/auth';
import { SigninFormProps } from '../interfaces/props';

import * as styles from '../styles';


const SigninForm: React.FC<SigninFormProps> = () => {
  // Авторизация
  const auth = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    login: '',
    password: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);

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
    auth.login(loginData, () => navigate('/dashboard', { replace: true }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box component='form' autoComplete='off' noValidate sx={styles.signinForm.form}>
      <TextField fullWidth label='Login' variant='standard' onChange={handleChangeLogin} />
      <TextField
        fullWidth
        label='Password'
        variant='standard'
        type={showPassword ? 'text' : 'password'}
        onChange={handleChangePassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }} />
      <Button
        variant='contained'
        sx={styles.signinForm.submitButton}
        onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
}


export default SigninForm;