import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Table, TableHead, TableRow, TableCell, Typography, TableBody, IconButton, Chip, Stack, Avatar, Tooltip, TextField, Pagination, TableContainer } from "@mui/material";
import { fetchTickets, DeleteTicket, SearchTicket } from "../../../store/apps/tickets/TicketSlice";
import { IconEye, IconTrash } from "@tabler/icons";
import { useAtividadesStore } from "../../../zustand/Atividades/AtividadesStore";
import { Edit, RemoveRedEye } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ListaAtividades = () => {
	const { fetchAtividades, atividades } = useAtividadesStore(store => ({
		fetchAtividades: store.fetchAtividades,
		atividades: store.atividades,
	}));

	useEffect(() => {
		fetchAtividades();
	}, []);

	useEffect(() => {
		console.log(atividades);
	}, [atividades]);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTickets());
	}, [dispatch]);

	const getVisibleTickets = (tickets, filter, ticketSearch) => {
		switch (filter) {
			case "total_tickets":
				return tickets.filter(c => !c.deleted && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch));

			case "Pending":
				return tickets.filter(c => !c.deleted && c.Status === "Pending" && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch));

			case "Closed":
				return tickets.filter(c => !c.deleted && c.Status === "Closed" && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch));

			case "Open":
				return tickets.filter(c => !c.deleted && c.Status === "Open" && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch));

			default:
				throw new Error(`Unknown filter: ${filter}`);
		}
	};

	const tickets = useSelector(state => getVisibleTickets(state.ticketReducer.tickets, state.ticketReducer.currentFilter, state.ticketReducer.ticketSearch));
	return (
		<Box mt={4}>
			<Box sx={{ maxWidth: "260px", ml: "auto" }} mb={3}>
				<TextField size="small" label="Search" fullWidth onChange={e => dispatch(SearchTicket(e.target.value))} />
			</Box>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant="h6">Id</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6">Atividade</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6">Responsável</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6">Etapa</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6">Data/Hora</Typography>
							</TableCell>
							<TableCell align="center">
								<Typography variant="h6">Ação</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{atividades &&
							atividades.map(atividade => (
								<TableRow key={atividades.atividade_id} hover>
									<TableCell>{atividade.atividade_id}</TableCell>
									<TableCell>
										<Box>
											<Typography variant="h6" fontWeight="500" noWrap>
												{atividade.atividade_nome || ""}
											</Typography>
											<Typography color="textSecondary" noWrap sx={{ maxWidth: "250px" }} variant="subtitle2" fontWeight="400">
												{atividade.atividade_descricao || ""}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>
										<Stack direction="row" gap="10px" alignItems="center">
											<Typography variant="h6">{atividade.responsavel_nome}</Typography>
										</Stack>
									</TableCell>
									<TableCell>
										<Chip
											sx={{
												backgroundColor: atividade.etapa_cor || "#fff",
												color: atividade.etapa_cor ? "#fff" : "#000",
											}}
											size="small"
											label={atividade.etapa_nome || ""}
										/>
									</TableCell>
									<TableCell>
										<Typography
											sx={{
												display: "flex",
												flexDirection: "row",
												gap: 1,
											}}
										>
											<Typography>{new Date(atividade.atividade_created_at).toLocaleDateString("pt-BR")}</Typography>
											<Typography>{new Date(atividade.atividade_created_at).toLocaleTimeString("pt-BR")}</Typography>
										</Typography>
									</TableCell>
									<TableCell align="right">
										<Tooltip title="Visualizar Atividade">
											<IconButton component={Link} target="__blank" to={`/atividades/detalhes/${atividade.atividade_id}`}>
												<RemoveRedEye size="18" />
											</IconButton>
										</Tooltip>

										<Tooltip title="Edita Atividade">
											<IconButton onClick={() => dispatch(DeleteTicket(atividade.atividade_id))}>
												<Edit size="18" />
											</IconButton>
										</Tooltip>

										<Tooltip title="Exclui Atividade">
											<IconButton onClick={() => dispatch(DeleteTicket(atividade.atividade_id))}>
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

export default ListaAtividades;
