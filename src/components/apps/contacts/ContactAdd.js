import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  FormLabel,
  DialogContent,
  DialogContentText,
  Grid,
  DialogActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../../store/apps/contacts/ContactSlice';
import user1 from '../../../assets/images/profile/user-1.jpg';
import { useUserStore } from '../../../zustand/Usuarios/UsuariosStore';
import { useAuthStore } from '../../../zustand/Auth/AuthStore';

const ContactAdd = () => {
  const [modal, setModal] = React.useState(false);

  const { createUser } = useUserStore((store) => ({
    createUser: store.createUser
  }))

  const toggle = () => {
    setModal(!modal);
  };

  const [userData, setUserData] = useState({
    "email": "",
    "name": "",
    "cpf": "",
    "password": "",
    "cargo_id": "",
    "empresa_id": ""
  });

  const { empresa } = useAuthStore((store) => ({
    empresa: store.empresa
  }))

  useEffect(() => {
    setUserData({ ...userData, empresa_id: empresa.empresa_id })
  }, [empresa])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser(userData)
    if (response.status == 201) {
      alert("Usuário cadastrado com sucesso!");
      toggle()
    } else {
      alert("erro")
    }
  };

  return (
    <>
      <Box p={3} pb={1}>
        <Button color="primary" variant="contained" fullWidth onClick={toggle}>
          Novo usuário
        </Button>
      </Box>
      <Dialog
        open={modal}
        onClose={toggle}
        component={'form'}
        onSubmit={handleSubmit}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          {'Novo usuário'}
        </DialogTitle>
        <DialogContent>
          <Box mt={3}>
            <>
              <Grid spacing={3} container>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Nome</FormLabel>
                  <TextField
                    id="name"
                    size="small"
                    variant="outlined"
                    type='text'
                    fullWidth
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <TextField
                    id="cpf"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={userData.cpf}
                    onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <FormLabel>E-mail</FormLabel>
                  <TextField
                    id="email"
                    size="small"
                    variant="outlined"
                    type='email'
                    fullWidth
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Cargo</FormLabel>
                  <TextField
                    id="company"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={userData.cargo_id}
                    onChange={(e) => setUserData({ ...userData, cargo_id: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Senha</FormLabel>
                  <TextField
                    id="senha"
                    size="small"
                    variant="outlined"
                    type='password'
                    fullWidth
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    type="email"
                    required
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </Grid>
              </Grid>
            </>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog >
    </>
  );
};

export default ContactAdd;
