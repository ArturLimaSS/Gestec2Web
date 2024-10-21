import React, { useEffect, useState } from "react";
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
	ButtonGroup,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	DialogTitle,
} from "@mui/material";
import { fetchTickets, DeleteTicket, SearchTicket } from "../../../store/apps/tickets/TicketSlice";
import { IconEye, IconTrash } from "@tabler/icons";
import { useAtividadesStore } from "../../../zustand/Atividades/AtividadesStore";
import { Cancel, CheckCircle, Delete, Edit, RemoveRedEye, ShowChart, Shower, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAlert } from "../../../context/useAlert";

const ListaAtividades = () => {
	const { fetchAtividades, atividades, excluirAtividade } = useAtividadesStore(store => ({
		fetchAtividades: store.fetchAtividades,
		atividades: store.atividades,
		excluirAtividade: store.excluirAtividade,
	}));

	const { show } = useAlert();

	useEffect(() => {
		fetchAtividades();
	}, []);

	const [openDialogExclui, setOpenDialogExclui] = useState(false);
	const [atividadeSelecionada, setAtividadeSelecionada] = useState({});

	const handleOpenDialogExclui = atividade => {
		setOpenDialogExclui(true);
		setAtividadeSelecionada(atividade);
	};

	const handleCloseDialogExclui = () => {
		setOpenDialogExclui(false);
		setAtividadeSelecionada({});
	};

	const handleExclui = async () => {
		show(null, "loading");
		const response = await excluirAtividade(atividadeSelecionada.atividade_id);
		if (response.status === 200) {
			show(response.data.message, "success");
			handleCloseDialogExclui();
		} else {
			show(response.data.message, "error");
		}
	};

	return (
		<>
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
									<Typography variant="h6">Previsão</Typography>
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
												<Typography>{new Date(atividade.previsao).toLocaleDateString("pt-BR")}</Typography>
												{/* <Typography>{new Date(atividade.atividade_created_at).toLocaleTimeString("pt-BR")}</Typography> */}
											</Typography>
										</TableCell>
										<TableCell align="right">
											<ButtonGroup>
												<Button
													color="info"
													variant="contained"
													startIcon={<Visibility />}
													component={Link}
													target="_blank"
													to={`/atividades/detalhes/${atividade.atividade_id}`}
												>
													Visualizar
												</Button>
												<Button onClick={() => handleOpenDialogExclui(atividade)} color="error" variant="contained" startIcon={<Delete />}>
													Excluir
												</Button>
											</ButtonGroup>
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
			<Dialog open={openDialogExclui} onClose={handleCloseDialogExclui}>
				<DialogTitle id="alert-dialog-title">{"Excluir atividade?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Deseja realmente excluir a atividade <strong>{atividadeSelecionada.atividade_nome}</strong>?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button startIcon={<Cancel />} variant="contained" color="error" onClick={handleCloseDialogExclui}>
						Cancelar
					</Button>
					<Button startIcon={<CheckCircle />} variant="contained" color="info" onClick={handleExclui} autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ListaAtividades;
