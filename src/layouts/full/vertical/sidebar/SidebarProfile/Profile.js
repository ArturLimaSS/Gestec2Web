import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { Link } from "react-router-dom";
import { useAuthStore } from '../../../../../zustand/Auth/AuthStore';

export const Profile = () => {

  const customizer = useSelector((state) => state.customizer);

  const { user, empresa, logout } = useAuthStore((store) => ({
    user: store.user,
    empresa: store.empresa,
    logout: store.logout
  }))

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6" color="textPrimary">{user?.name?.split(' ')[0]}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" onClick={logout} aria-label="logout" size="small">
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
