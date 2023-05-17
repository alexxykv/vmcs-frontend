import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useAuth } from "../hooks";
import * as styles from "../styles";
import { SigninForm, SignupForm } from "../components";

type FormType = 'Signin' | 'Signup';

const LoginPage: React.FC = () => {
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
    return <Navigate to='/dashboard' state={{ from: location }} />;
  }

  return (
    <Paper elevation={3} sx={styles.loginPage.paper}>
      <Box sx={styles.loginPage.paperContent}>
        <Grid sx={styles.loginPage.grid}>
          <Typography sx={styles.loginPage.title}>WELCOME</Typography>
          <Typography sx={styles.loginPage.logo}>VMCS</Typography>
        </Grid>
        {renderForm()}
        <Box sx={styles.loginPage.buttonContainer}>
          <Button disabled variant='text' sx={styles.loginPage.toggleTip}>
            {renderToggleTip()}
          </Button>
          <Button variant='text' sx={styles.loginPage.toggleButton} onClick={toggleForm}>
            {renderToggleButton()}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}


export default LoginPage;