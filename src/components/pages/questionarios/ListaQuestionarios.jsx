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
	Button,
	Grid,
	Divider,
	DialogContent,
	DialogContentText,
	DialogActions,
	Dialog,
	DialogTitle,
} from "@mui/material";
import { fetchTickets, DeleteTicket, SearchTicket } from "../../../store/apps/tickets/TicketSlice";
import { IconTrash } from "@tabler/icons";
import { useQuestionarioStore } from "../../../zustand/Questionario/QuestionarioStore";
import { useAuthStore } from "../../../zustand/Auth/AuthStore";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ListaQuestionarios = () => {
	const { questionarios, fetchQuestionarios, deletaQuestionario } = useQuestionarioStore(store => store);
	const { empresa } = useAuthStore(store => ({
		empresa: store.empresa,
	}));

	useEffect(() => {
		fetchQuestionarios(empresa.empresa_id);
	}, []);

	const [selectedQuestionario, setSelectedQuestionario] = useState(null);

	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = questionario_id => {
		setOpenDialog(true);
		setSelectedQuestionario(questionario_id);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleDeleteQuestionario = async () => {
		const response = await deletaQuestionario(selectedQuestionario);
		if (response.status == 200) {
			handleCloseDialog();
			setSelectedQuestionario(null);
		}
	};

	return (
		<>
			<Box mt={4}>
				<Grid container spacing={3} mb={3}>
					<Grid item xs={12} md={6}>
						<TextField size="small" label="Procurar" fullWidth />
					</Grid>
				</Grid>
				<Divider />
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<Typography variant="h6">Questionário</Typography>
								</TableCell>
								<TableCell align="right">
									<Typography variant="h6">Ações</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{questionarios.map(questionario => (
								<TableRow key={questionario.questionario_id} hover>
									<TableCell>
										<Box>
											<Typography variant="h6" fontWeight="500" noWrap>
												{questionario.nome}
											</Typography>
											<Typography color="textSecondary" noWrap sx={{ maxWidth: "250px" }} variant="subtitle2" fontWeight="400">
												{questionario.descricao}
											</Typography>
										</Box>
									</TableCell>
									<TableCell align="right">
										<Tooltip placement="top" title="Editar Questionário">
											<IconButton LinkComponent={Link} to={`/questionarios/edita/${questionario.questionario_id}`}>
												<Edit size="18" />
											</IconButton>
										</Tooltip>
										<Tooltip placement="top" title="Inativar Questionário">
											<IconButton onClick={() => handleOpenDialog(questionario.questionario_id)}>
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
			<Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Deseja inativar o questionário?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Fazendo isso, o questionário selecionado não poderá mais ser utilizado em novas OS. Os dados permanecerão salvos no banco de dados para futuras consultas.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancelar</Button>
					<Button onClick={handleDeleteQuestionario} autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ListaQuestionarios;
