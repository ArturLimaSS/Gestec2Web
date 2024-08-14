import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  TextField,
  Pagination,
  TableContainer,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import {
  fetchTickets,
  DeleteTicket,
  SearchTicket,
} from "../../../store/apps/tickets/TicketSlice";
import { IconTrash } from "@tabler/icons";
import { CadastroTipoServico } from "./Cadastro/CadastroTiposServicos";
import {useTiposServicosStore} from "../";

const ListaTiposServicos = () => {
  const { fetchTiposServicos, listaTiposServicos } = useTiposServicosStore(
    store => ({})
  );

  return (
    <Box mt={4}>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <CadastroTipoServico />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            label="Procurar"
            fullWidth
            onChange={e => dispatch(SearchTicket(e.target.value))}
          />
        </Grid>
      </Grid>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Ticket</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Assigned To</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(ticket => (
              <TableRow key={ticket.Id} hover>
                <TableCell>{ticket.Id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      {ticket.ticketTitle}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      noWrap
                      sx={{ maxWidth: "250px" }}
                      variant="subtitle2"
                      fontWeight="400"
                    >
                      {ticket.ticketDescription}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Avatar
                      src={ticket.thumb}
                      alt={ticket.thumb}
                      width="35"
                      sx={{
                        borderRadius: "100%",
                      }}
                    />
                    <Typography variant="h6">{ticket.AgentName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      backgroundColor:
                        ticket.Status === "Open"
                          ? theme => theme.palette.success.light
                          : ticket.Status === "Closed"
                          ? theme => theme.palette.error.light
                          : ticket.Status === "Pending"
                          ? theme => theme.palette.warning.light
                          : ticket.Status === "Moderate",
                    }}
                    size="small"
                    label={ticket.Status}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{ticket.Date}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Ticket">
                    <IconButton
                      onClick={() => dispatch(DeleteTicket(ticket.Id))}
                    >
                      <IconTrash size="18" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent={"center"}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default ListaTiposServicos;
