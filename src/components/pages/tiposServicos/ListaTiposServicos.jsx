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
	Dialog,
	DialogContent,
	DialogTitle,
	DialogContentText,
	DialogActions,
	CircularProgress,
} from "@mui/material";
import { fetchTickets, DeleteTicket, SearchTicket } from "../../../store/apps/tickets/TicketSlice";
import { IconTrash } from "@tabler/icons";
import { CadastroTipoServico } from "./Cadastro/CadastroTiposServicos";
import { useTiposServicosStore } from "../../../zustand/TiposServicos/TiposServicosStore";
import { useAuthStore } from "../../../zustand/Auth/AuthStore";
import { useSnackbar, closeSnackbar } from "notistack";

const ListaTiposServicos = () => {
	const { fetchTiposServicos, listaTiposServicos, deleteTipoServico } = useTiposServicosStore(store => ({
		fetchTiposServicos: store.fetchTiposServicos,
		listaTiposServicos: store.listaTiposServicos,
		deleteTipoServico: store.deleteTipoServico,
	}));

	const { empresa, checkLogin } = useAuthStore(store => ({
		empresa: store.empresa,
		checkLogin: store.checkLogin,
	}));

	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (empresa.empresa_id) {
			fetchTiposServicos(empresa.empresa_id);
		} else {
			checkLogin();
		}
	}, [empresa]);

	const [selectedTipoServicoId, setSelectedTipoServicoId] = useState(null);
	const [showDialog, setShowDialog] = useState(false);

	const handleOpenDialog = tipo_servico_id => {
		setShowDialog(true);
		setSelectedTipoServicoId(tipo_servico_id);
	};

	const handleCloseDialog = () => {
		setShowDialog(false);
		setSelectedTipoServicoId(null);
	};

	const handleDeleteTipoServico = async () => {
		enqueueSnackbar(
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					gap: 1,
					justifyContent: "center",
					alignItems: "center",
					color: "white",
				}}
			>
				<CircularProgress sx={{ color: "#fff" }} />
				<Typography variant="h6">Aguarde</Typography>
			</Box>,
			{
				variant: "info",
				hideIconVariant: true,
			}
		);

		const response = await deleteTipoServico(selectedTipoServicoId);
		if (response.status == 200) {
			closeSnackbar();
			enqueueSnackbar("Tipo de Serviço excluído com sucesso!", { variant: "success" });
			handleCloseDialog();
		} else {
			closeSnackbar();
			enqueueSnackbar("Ocorreu um erro ao excluir o tipo de serviço!", { variant: "error" });
		}
	};

	return (
		<>
			<Box mt={4}>
				<Grid container spacing={3} mb={3}>
					<Grid item xs={12} md={6}>
						<CadastroTipoServico />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField size="small" label="Procurar" fullWidth onChange={e => dispatch(SearchTicket(e.target.value))} />
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
											<IconButton onClick={() => handleOpenDialog(tipo.tipo_servico_id)}>
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
			<Dialog open={showDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Deseja excluir o tipo de servico selecionado?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Excluindo o tipo de serviço, apenas permitirá que ele não seja utilizando em novas atividades, mas estará disponível para consultas futuras.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancelar</Button>
					<Button onClick={handleDeleteTipoServico} autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ListaTiposServicos;
