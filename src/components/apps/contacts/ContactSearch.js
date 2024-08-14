import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Fab, TextField, InputAdornment } from '@mui/material';

import { SearchContact } from '../../../store/apps/contacts/ContactSlice';
import { IconMenu2, IconSearch } from '@tabler/icons';
import { useUserStore } from '../../../zustand/Usuarios/UsuariosStore';


const ContactSearch = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { filterUser } = useUserStore(store => store)

  useEffect(() => {
    filterUser(searchTerm)
  }, [searchTerm])


  return (
    <Box display="flex" sx={{ p: 2 }}>
      <Fab
        onClick={onClick}
        color="primary"
        size="small"
        sx={{ mr: 1, flexShrink: '0', display: { xs: 'block', lineHeight: '10px', lg: 'none' } }}
      >
        <IconMenu2 width="16" />
      </Fab>
      <TextField
        id="outlined-basic"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconSearch size={'16'} />
            </InputAdornment>
          ),
        }}
        fullWidth
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Procurar usuários"
        variant="outlined"
      />
    </Box>
  );
};

export default ContactSearch;
