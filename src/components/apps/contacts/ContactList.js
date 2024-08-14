import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectContact,
  fetchContacts,
  DeleteContact,
  toggleStarredContact,
} from '../../../store/apps/contacts/ContactSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import ContactListItem from './ContactListItem';
import { useUserStore } from '../../../zustand/Usuarios/UsuariosStore';

const ContactList = ({ showrightSidebar }) => {

  const { setSelectedUser, filteredUsers, selectedUser, setEditUser } = useUserStore((store) => ({
    filteredUsers: store.filteredUsers,
    setSelectedUser: store.setSelectedUser,
    selectedUser: store.selectedUser,
    setEditUser: store.setEditUser
  }))

  useEffect(() => {
    console.log(selectedUser)
  }, [selectedUser])

  const active = useSelector((state) => state.contactsReducer.contactContent);

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {filteredUsers?.map((user) => (
          <ContactListItem
            key={user.id}
            active={user.id === selectedUser.id}
            {...user}
            onContactClick={() => {
              setEditUser(false)
              setSelectedUser(user)

            }}
          // onDeleteClick={() => alert("DELETA")}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default ContactList;
