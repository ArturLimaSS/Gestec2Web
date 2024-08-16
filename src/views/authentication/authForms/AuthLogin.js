import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { ReactComponent as LogoIcon } from "src/assets/images/logos/logoIcon.svg";
import { ReactComponent as LightLogoIcon } from "src/assets/images/logos/light-logoIcon.svg";

import AuthSocialButtons from './AuthSocialButtons';
import { useAuthStore } from '../../../zustand/Auth/AuthStore';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  });

  const { authenticate, checkLogin } = useAuthStore(store => ({
    authenticate: store.authenticate,
    checkLogin: store.checkLogin
  }))

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(authData);
    if (response.status == "200") {
      checkLogin(navigate);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        justifyContent: 'center',
        alignItems: 'start',
        mb: 3,
        height: 120,

      }}>
        <LogoIcon
          style={{
            width: "5rem",
            height: "5rem"
          }}

        /></Box>
      {title ? (

        <Typography
          sx={{
            textAlign: 'start'
          }}

          fontWeight="700" variant="h3" mb={1}>

          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* <AuthSocialButtons title="Sign in with" /> */}
      {/* <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box> */}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">E-mail</CustomFormLabel>
          <CustomTextField id="email" name="email" onChange={(e) => setAuthData({ ...authData, email: e.target.value })} variant="outlined" fullWidth />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
          <CustomTextField id="password" onChange={(e) => setAuthData({ ...authData, password: e.target.value })} type="password" variant="outlined" fullWidth />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Lembrar este dispositivo"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Esqueceu a senha?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Entrar
        </Button>
      </Box>
      {subtitle}
    </form>
  );
}

export default AuthLogin;
