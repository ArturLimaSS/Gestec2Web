import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';
import { ReactComponent as LogoIcon } from "src/assets/images/logos/logoIcon.svg";
import { ReactComponent as QuantumLogo } from "src/assets/images/logos/quantum.svg";
import { padding } from '@mui/system';

const Login = () => (
  <PageContainer title="Login" description="this is Login page">
    <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Box position="relative">
          <Box px={3}>
            <QuantumLogo
              style={{
                width: '7rem',
                height: '7rem',
                padding: '1rem',
              }}
            />
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh - 75px)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >

            <LogoIcon
              component={'img'}
              style={{
                width: '100%',
                maxWidth: '500px',
              }}
              alt="BG"
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >

        <Box p={4}>

          <AuthLogin
            title="Bem vindo ao Gestec"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Sistema WFM
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  Não possui uma conta?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Criar minha conta
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Login;
