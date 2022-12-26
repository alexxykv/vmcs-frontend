import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, TextField, FormControl, Grid, Paper, Typography, Avatar, IconButton, Input, InputAdornment, InputLabel, Button, styled } from '@mui/material';
import React from 'react';



const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // const StyledTextField = styled(TextField)({
  //   "& .MuiInputBase-root": {
  //     color: 'white'
  //   },
  //   "& .MuiFormLabel-root": {
  //     color: 'white'
  //   },
  //   "& .Mui-focused": {
  //     color: 'white'
  //   }
  // })

  // const StyledFormControl = styled(FormControl)({
  //   "& .MuiInputBase-root": {
  //     color: 'white'
  //   },
  //   "& .MuiFormLabel-root": {
  //     color: 'white'
  //   },
  //   "& .Mui-focused": {
  //     color: 'white'
  //   }
  // })

  const paperStyle: React.CSSProperties = {
    height: 650,
    width: 390,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const gridStyle: React.CSSProperties = {
    margin: '70px 0 50px',
    textAlign: 'center'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 35,
    fontWeight: "bold",
    // color: 'white'
  }

  const logoStyle: React.CSSProperties = {
    fontSize: 45,
    fontWeight: "bold",
    // color: 'white'
  }

  const bottonStyle: React.CSSProperties = {
    marginTop: "20px",
    height: '50px',
    borderRadius: '200px',
    fontWeight: 'bold',
  }

  return (
    <Paper elevation={3} style={paperStyle}>
      <Box
        display="flex"
        flexDirection='column'
        alignItems='center'
      >
        <Grid style={gridStyle}>
          <Typography style={titleStyle}>WELCOME</Typography>
          <Typography style={logoStyle}>VMCS</Typography>
        </Grid>
        <Box
          display="flex"
          flexDirection="column"
          gap='20px'
          component="form"
          noValidate
          autoComplete="off"
          width='280px'
        >
          <TextField fullWidth id="standard-basic" label="Login" variant="standard" />
          {/* <TextField fullWidth id="standard-basic" label="Email" variant="standard" /> */}
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant="contained" style={bottonStyle}>Login</Button>
          {/* <Button variant="contained" style={bottonStyle}>Registration</Button> */}
        </Box>
        <Box
          display="flex"
          bottom="0"
          marginBottom="15px"
          position="absolute"
          gap="5px"
        >
          <Button disabled variant='text' style={{ backgroundColor: 'transparent', color: 'black' }}>Don’t have an account?</Button>
          <Button variant='text' style={{ backgroundColor: 'transparent' }}>Sign Up!</Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default Login;