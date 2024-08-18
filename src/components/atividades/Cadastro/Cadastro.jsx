import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "../../container/PageContainer";
import ChildCard from "../../shared/ChildCard";
import { Save } from "@mui/icons-material";
import { useTiposServicosStore } from "../../../zustand/TiposServicos/TiposServicosStore";
import { useEffect, useState } from "react";
import {
	Autocomplete,
	Box,
	Button,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import BlankCard from "../../shared/BlankCard";
import { useSitesStore } from "../../../zustand/Sites/SiteStore";
import { useQuestionarioStore } from "../../../zustand/Questionario/QuestionarioStore";
import { useUserStore } from "../../../zustand/Usuarios/UsuariosStore";
import { useAtividadesStore } from "../../../zustand/Atividades/AtividadesStore";
import { useSnackbar } from "notistack";

const BCrumb = [
	{
		to: "/atividades/lista",
		title: "Gestão de Atividades  ",
	},
	{
		title: "Cadastro de Atividades",
	},
];

const CadastroAtividade = () => {
	const [atividadeData, setAtividadeData] = useState({
		tipo_servico_id: "",
		ativo_id: "",
		atividade_tipo: "",
		atividade_endereco: "",
		questionario_id: "",
		atividade_nome: "",
		atividade_descricao: "",
		empresa_id: "",
		responsavel_id: "",
		etapa_id: "1",
	});

	const { createAtividades } = useAtividadesStore(store => ({
		createAtividades: store.createAtividades,
	}));

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const { users, fetchUser } = useUserStore(store => ({
		users: store.users,
		fetchUser: store.fetchUser,
	}));

	useEffect(() => {
		console.log(atividadeData);
	}, [atividadeData]);

	useEffect(() => {
		fetchUser("4");
	}, []);

	const { listaPorTipoServico, questionarios } = useQuestionarioStore(store => ({
		listaPorTipoServico: store.listaPorTipoServico,
		questionarios: store.questionarios,
	}));

	useEffect(() => {
		listaPorTipoServico(atividadeData.tipo_servico_id);
	}, [atividadeData.tipo_servico_id]);

	const { listaTiposServicos, fetchTiposServicos } = useTiposServicosStore(store => ({
		listaTiposServicos: store.listaTiposServicos,
		fetchTiposServicos: store.fetchTiposServicos,
	}));

	const { fetchListaSites, listaSites } = useSitesStore(store => ({
		listaSites: store.listaSites,
		fetchListaSites: store.fetchListaSites,
	}));

	useEffect(() => {
		fetchTiposServicos();
		fetchListaSites();
	}, []);

	const [open, setOpen] = useState(false);
	const handleOpenDialog = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCadastraAtividade = async () => {
		const response = await createAtividades(atividadeData);
		if (response.status == 201) {
			setOpen(false);
			enqueueSnackbar("Atividade cadastrada com sucesso!", { variant: "success" });
			setTimeout(() => {
				navigate("/atividades/lista");
			}, 1000);
		} else {
			enqueueSnackbar("Erro ao cadastrar atividade!", { variant: "error" });
		}
	};

	const [atividadeTipo, setAtividadeTipo] = useState("");

	return (
		<>
			<PageContainer title="Gestão de Atividades" description="Gestão de Atividades">
				<Breadcrumb title="Gestão de Atividades" items={BCrumb} />
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<BlankCard>
								<CardContent>
									<Typography variant="h5" component="div" gutterBottom>
										Identificação da Atividade
									</Typography>
									<Divider />
									<Grid
										sx={{
											marginTop: 2,
										}}
										item
										xs={12}
									>
										<FormControl fullWidth>
											<InputLabel id="tipo_os_atividade_label">Tipo de Atividade</InputLabel>
											<Select
												label="Tipo de Atividade"
												labelId="tipo_os_atividade_label"
												onChange={e => setAtividadeData({ ...atividadeData, atividade_tipo: e.target.value })}
											>
												<MenuItem value="">Selecione...</MenuItem>
												<MenuItem value="ordem_servico">Ordem de Serviço</MenuItem>
												<MenuItem value="relatorio">Relatorio</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid container spacing={3} sx={{ marginTop: 0 }}>
										{atividadeData.atividade_tipo == "ordem_servico" && (
											<Grid item xs={12}>
												<Autocomplete
													onChange={e => setAtividadeData({ ...atividadeData, ativo_id: e.target.value })}
													renderInput={params => <TextField {...params} variant="outlined" label={"Selecione o Site"} placeholder="Digite para filtrar..." />}
													options={
														listaSites &&
														listaSites.map(site => {
															return {
																value: site.site_id,
																label: site.nome_site,
															};
														})
													}
												/>
											</Grid>
										)}

										<Grid item xs={12}>
											<TextField
												fullWidth
												label="Titulo da Atividade"
												value={atividadeData.atividade_nome}
												onChange={e => setAtividadeData({ ...atividadeData, atividade_nome: e.target.value })}
											/>
										</Grid>

										{atividadeData.atividade_tipo == "relatorio" && (
											<Grid item xs={12}>
												<TextField
													fullWidth
													label="Endereço da Atividade"
													value={atividadeData.atividade_endereco}
													onChange={e => setAtividadeData({ ...atividadeData, atividade_endereco: e.target.value })}
												></TextField>
											</Grid>
										)}

										{atividadeData.atividade_tipo == "ordem_servico" && (
											<Grid item xs={12}>
												<FormControl fullWidth>
													<InputLabel id="tipo_servico_label_id">Tipo de Serviço</InputLabel>
													<Select
														onChange={e => setAtividadeData({ ...atividadeData, tipo_servico_id: e.target.value, questionario_id: "" })}
														fullWidth
														labelId="tipo_servico_label_id"
														id="tipo_servico_id"
														name="tipo_servico_id"
														label="Tipo de Serviço"
													>
														<MenuItem value="">Selecione um tipo de serviço</MenuItem>
														{listaTiposServicos?.map((tipo, index) => (
															<MenuItem value={tipo.tipo_servico_id} key={tipo.tipo_servico_id}>
																{tipo.nome_tipo_servico}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</Grid>
										)}

										{atividadeData.atividade_tipo == "ordem_servico" && (
											<Grid item xs={12}>
												<FormControl fullWidth>
													<InputLabel id="questionario_label_id">Questionario</InputLabel>
													<Select
														disabled={!atividadeData.tipo_servico_id}
														onChange={e => setAtividadeData({ ...atividadeData, questionario_id: e.target.value })}
														fullWidth
														labelId="questionario_label_id"
														id="questionario_id"
														name="questionario_id"
														label="Questionario"
													>
														<MenuItem value="">Selecione um Questionario</MenuItem>
														{questionarios?.map((questionario, index) => (
															<MenuItem
																selected={questionario.questionario_id == atividadeData.questionario_id}
																value={questionario.questionario_id}
																key={questionario.questionario_id}
															>
																<Box
																	sx={{
																		display: "flex",
																		flexDirection: "column",
																	}}
																>
																	<Typography variant="subtitle2">{questionario.nome}</Typography>
																	<Typography variant="caption">{questionario.descricao}</Typography>
																</Box>
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</Grid>
										)}

										<Grid item xs={12}>
											<Autocomplete
												onChange={e => setAtividadeData({ ...atividadeData, responsavel_id: e.target.value })}
												renderInput={params => <TextField {...params} variant="outlined" label={"Selecione o responsável"} placeholder="Digite para filtrar..." />}
												options={
													users &&
													users.map(user => {
														return {
															value: user.id,
															label: user.name,
														};
													})
												}
											/>
										</Grid>

										<Grid item xs={12}>
											<TextField
												fullWidth
												label="Descrição da Atividade"
												multiline
												onChange={e => setAtividadeData({ ...atividadeData, descricao: e.target.value })}
											></TextField>
										</Grid>
									</Grid>
								</CardContent>
							</BlankCard>
						</Grid>

						<Grid item xs={12}>
							<BlankCard>
								<CardContent
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Button variant="contained" onClick={handleOpenDialog} color="success" startIcon={<Save />}>
										Cadastrar Atividade
									</Button>
								</CardContent>
							</BlankCard>
						</Grid>
					</Grid>
				</Box>
			</PageContainer>
			<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Confirme abaixo para cadastrar a Atividade.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={handleCadastraAtividade} autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CadastroAtividade;
