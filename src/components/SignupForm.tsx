import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { RegisterData } from "../interfaces/dto";
import * as styles from "../styles";

const SignupForm: React.FC = () => {
  // Регистрация
  const auth = useAuth();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    login: '',
    password: '',
    email: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);

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
    auth.register(registerData, () => navigate('/dashboard', { replace: true }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box component='form' autoComplete='off' noValidate sx={styles.signupForm.form}>
      <TextField fullWidth label='Username' variant='standard' onChange={handleChangeUsername} />
      <TextField fullWidth label='Login' variant='standard' onChange={handleChangeLogin} />
      <TextField fullWidth label='Email' variant='standard' onChange={handleChangeEmail} />
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
        sx={styles.signupForm.submitButton}
        onClick={handleSubmit}>
        Registration
      </Button>
    </Box>
  );
}


export default SignupForm;