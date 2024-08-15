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
import { useTiposServicosStore } from "../../../zustand/TiposServicos/TiposServicosStore";
import { useAuthStore } from "../../../zustand/Auth/AuthStore";

const ListaTiposServicos = () => {
  const { fetchTiposServicos, listaTiposServicos } = useTiposServicosStore(
    store => ({
      fetchTiposServicos: store.fetchTiposServicos,
      listaTiposServicos: store.listaTiposServicos,
    })
  );

  const { empresa } = useAuthStore(store => ({
    empresa: store.empresa,
  }));

  useEffect(() => {
    if (empresa) {
      fetchTiposServicos(empresa.empresa_id);
    }
  }, [empresa]);

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
                <Typography variant="h6">Nome</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Descrição</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Opções</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaTiposServicos?.map(tipo => (
              <TableRow key={tipo.tipo_servico_id} hover>
                <TableCell>{tipo.tipo_servico_id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      {tipo.nome_tipo_servico}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography>{tipo.descricao_tipo_servico}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Ticket">
                    <IconButton>
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
