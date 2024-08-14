import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Stack,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  isEdit,
  UpdateContact,
  DeleteContact,
  toggleStarredContact,
} from 'src/store/apps/contacts/ContactSlice';
import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { useUserStore } from '../../../zustand/Usuarios/UsuariosStore';
import { useAuthStore } from '../../../zustand/Auth/AuthStore';
import { ReceiptRounded } from '@mui/icons-material';

const ContactDetails = () => {
  const contactDetail = useSelector(
    (state) => state.contactsReducer.contacts[state.contactsReducer.contactContent - 1],
  );
  const editContact = useSelector((state) => state.contactsReducer.editContact);
  const dispatch = useDispatch();

  const { empresa } = useAuthStore((store) => ({
    empresa: store.empresa
  }))

  const { selectedUser, editUser, setEditUser, updateUser, fetchUser } = useUserStore(store => ({
    selectedUser: store.selectedUser,
    fetchUser: store.fetchUser,
    editUser: store.editUser,
    setEditUser: store.setEditUser,
    updateUser: store.updateUser
  }))

  const [editableUser, setEditableUser] = useState(selectedUser);
  useEffect(() => {
    setEditableUser(selectedUser)
  }, [selectedUser])

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (editableUser == selectedUser) {
      alert("Não há alterações para salvar")
      return
    }
    const response = await updateUser(editableUser)
    if (response.status == "200") {
      fetchUser(empresa.empresa_id)
    }
  }

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Contact Detail Part */}
      {/* ------------------------------------------- */}
      {JSON.stringify(selectedUser) != "{}" ? (
        <>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Detalhes do usuário</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>

              <Tooltip title={editUser ? 'Salvar' : 'Editar'}>
                <IconButton onClick={setEditUser}>
                  {!editUser ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Delete">
                <IconButton>
                  <IconTrash size="18" stroke={1.3} />
                </IconButton>
              </Tooltip> */}
            </Stack>
          </Box>
          <Divider />
          {/* ------------------------------------------- */}
          {/* Contact Table Part */}
          {/* ------------------------------------------- */}
          <Box sx={{ overflow: 'auto' }}>
            {!editUser ? (
              <Box>
                <Box p={3}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={selectedUser.image}
                      src={selectedUser.image}
                      sx={{ width: '72px', height: '72px' }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" mb={0.5}>
                        {editableUser.name}
                      </Typography>
                      <Typography variant="h6" mb={0.5}>
                        {selectedUser.cpf}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {selectedUser.email}
                      </Typography>
                    </Box>
                  </Box>

                </Box>
                <Divider />
                <Box p={3} gap={1} display="flex">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => setEditUser()}
                  >
                    Editar
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(DeleteContact(contactDetail.id))}
                  >
                    Excluir
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Box sx={{ p: 0 }}>
                  <form onSubmit={handleSaveUser}>
                    <Scrollbar sx={{ height: { lg: 'calc(100vh - 360px)', md: '100vh' } }}>
                      <Box pt={1}>
                        <Box px={3} py={1.5}>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            Nome
                          </Typography>
                          <TextField
                            id="name"
                            size="small"
                            fullWidth
                            type="text"
                            value={editableUser.name}
                            onChange={e => setEditableUser({ ...editableUser, name: e.target.value })}
                          />
                        </Box>

                        <Box px={3} py={1.5}>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            CPF
                          </Typography>
                          <TextField
                            id="cpf"
                            size="small"
                            fullWidth
                            type="text"
                            value={editableUser.cpf}
                            onChange={e => setEditableUser({ ...editableUser, cpf: e.target.value })}
                          />
                        </Box>

                        <Box px={3} py={1.5}>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            E-mail
                          </Typography>
                          <TextField
                            id="email"
                            size="small"
                            fullWidth
                            type="email"
                            value={editableUser.email}
                            onChange={e => setEditableUser({ ...editableUser, email: e.target.value })}
                          />
                        </Box>

                        <Box px={3} py={1.5}>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            Telefone
                          </Typography>
                          <TextField
                            id="phone"
                            size="small"
                            fullWidth
                            type="text"
                            value={editableUser.phone}
                            onChange={e => setEditableUser({ ...editableUser, phone: e.target.value })}
                          />
                        </Box>

                        <Box px={3} py={1.5}>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            Nova senha
                          </Typography>
                          <TextField
                            id="password"
                            size="small"
                            fullWidth
                            type="password"
                            onChange={e => {
                              if (!!e.target.value) {
                                setEditableUser({ ...editableUser, password: e.target.value })
                              }
                            }
                            }
                          />
                        </Box>

                        <Box p={3}>
                          <Button color='primary' variant='contained' startIcon={<IconDeviceFloppy size="18" stroke={1.3} />} type='submit'>
                            Salvar
                          </Button>
                        </Box>
                      </Box>
                    </Scrollbar>
                  </form>
                </Box>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
          {/* ------------------------------------------- */}
          {/* If no Contact  */}
          {/* ------------------------------------------- */}
          <Box>
            <Typography variant="h4">Selecione um contato</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ContactDetails;
