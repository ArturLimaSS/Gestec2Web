
import React from 'react';
import {
  ListItemText,
  Box,
  Avatar,
  ListItemButton,
  Typography,
  Stack,
  ListItemAvatar,
} from '@mui/material';

import { IconStar, IconTrash } from '@tabler/icons';


const ContactListItem = ({
  name, email, cpf, created_at, onContactClick, onDeleteClick,
  active,
}) => {

  return (
    <ListItemButton sx={{ mb: 1 }} selected={active}>
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center">
          <Box mr="auto" onClick={onContactClick}>
            <Typography variant="subtitle1" noWrap fontWeight={600} sx={{ maxWidth: '150px' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {email}
            </Typography>
          </Box>

          {/* <IconTrash onClick={onDeleteClick} size="16" stroke={1.5} /> */}
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
};


export default ContactListItem;
