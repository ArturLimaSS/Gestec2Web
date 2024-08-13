import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Typography } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from 'src/components/apps/userprofile/profile/IntroCard';
import PhotosCard from 'src/components/apps/userprofile/profile/PhotosCard';
import Post from 'src/components/apps/userprofile/profile/Post';
import ChildCard from '../../../components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin, IconUser } from '@tabler/icons';
import { Https, LocalPhone } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useAuthStore } from '../../../zustand/Auth/AuthStore';


const UserProfile = () => {
  const { user, updateUser, checkLogin } = useAuthStore(store => ({
    user: store.user,
    updateUser: store.updateUser,
    checkLogin: store.checkLogin,
  }))

  const [editableUser, setEditableUser] = useState({})

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setEditableUser(user)
  }, [user])
  const handleUpdateProfile = async () => {
    enqueueSnackbar(
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CircularProgress size={20} sx={{
          marginRight: 10
        }} />
        <Typography>Atualizando informações do usuário</Typography>
      </Box>, {
      autoHideDuration: 500
    })
    const response = await updateUser(editableUser)
    if (response.status == '200') {
      enqueueSnackbar('Informações atualizadas com sucesso!', { variant: 'success' });
      setEditableUser(response.data)
      checkLogin()
      setOpen(false)
    }
  }

  const resetInfos = () => {
    setEditableUser(user)
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <PageContainer title="Perfil de usuário" description="Esta é a página de usuário">
      <Grid container sx={{
        marginTop: 3
      }} spacing={3}>
        <Grid item xs={12} sm={12}>
          <ProfileBanner />
        </Grid>

        {/* intro and Photos Card */}
        <Grid item sm={12} lg={4} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <ChildCard>
                <Typography fontWeight={600} variant="h4" mb={2}>
                  Dados pessoais
                </Typography>
                <Stack direction="row" gap={2} alignItems="center" mb={3}>
                  <IconUser size="21" />
                  <TextField sx={{
                    width: "100%"
                  }} label="Nome" onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })} InputLabelProps={{ shrink: !!editableUser.name }} name='name' value={editableUser.name} />
                </Stack>
                <Stack direction="row" gap={2} alignItems="center" mb={3}>
                  <IconMail size="21" />
                  <TextField sx={{
                    width: "100%"
                  }} label="E-mail" onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })} InputLabelProps={{ shrink: !!editableUser.email }} name='email' value={editableUser.email} />
                </Stack>
                <Stack direction="row" gap={2} alignItems="center" mb={3}>
                  <Https size="21" name="password" />
                  <TextField
                    onChange={(e) => setEditableUser({ ...editableUser, password: e.target.value })}
                    sx={{
                      width: "100%"
                    }} type='Password' label="Senha de acesso" />
                </Stack>
              </ChildCard>
            </Grid>

            <Grid item xs={12} sm={12}>
              <ChildCard >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem'
                  }}
                >
                  <Button sx={{ width: "100%" }} onClick={setOpen} variant='contained' >Salvar alterações</Button>
                  <Button sx={{ width: "100%" }} onClick={resetInfos} variant='contained' color="error">Cancelar Alterações</Button>
                </Box>
              </ChildCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Você tem certeza de que deseja confirmar a edição do seu acesso?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirme ou decline clicando nos botões abaixo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleUpdateProfile} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default UserProfile;