import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	TextField,
	Typography,
	IconButton,
	FormControlLabel,
	Radio,
	Checkbox,
	Switch,
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
	FormGroup,
	RadioGroup,
	FormLabel,
	Fab,
	Menu,
	styled,
	alpha,
	SpeedDial,
	SpeedDialIcon,
	SpeedDialAction,
	Tooltip,
	CircularProgress,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import BlankCard from "../../../../components/shared/BlankCard";
import { Add, AttachFile, Check, Delete, Edit, FileCopy, FileUpload, Print, RemoveRedEye, Save, Share, TextSnippet, Visibility, VisibilityOff } from "@mui/icons-material";
import { useQuestionarioStore } from "../../../../zustand/Questionario/QuestionarioStore";
import { useAuthStore } from "../../../../zustand/Auth/AuthStore";
import CreatableMultiSelect from "../../../../components/creatableMultiSelect/CreatableMultiSelect";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSnackbar, closeSnackbar } from "notistack";
import { useTiposServicosStore } from "../../../../zustand/TiposServicos/TiposServicosStore";
import { Link } from "react-router-dom";
import PageContainer from "../../../../components/container/PageContainer";
import Breadcrumb from "../../../../layouts/full/shared/breadcrumb/Breadcrumb";
import { useAtividadesStore } from "../../../../zustand/Atividades/AtividadesStore";
import { useRespostaStore } from "../../../../zustand/Respostas/RespostaStore";
import { IconEyeOff } from "@tabler/icons";
import { DialogAnexos } from "../../../../components/atividades/Anexos/Anexos";
import ListaAnexos from "../../../../components/atividades/Anexos/ListaAnexos/ListaAnexos";

const actions = [
	{ icon: <FileCopy />, name: "Copy" },
	{ icon: <Save />, name: "Save" },
	{ icon: <Print />, name: "Print" },
	{ icon: <Share />, name: "Share" },
];

const DetalhesAtividade = () => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));
	const location = useLocation();

	const [selectedTab, setSelectedTab] = useState(1);

	const { atividade_id } = useParams();

	useEffect(() => {
		getAtividadeDetalhes(atividade_id);
	}, []);

	const { getAtividadeDetalhes, atividade, createAtividades, geraRelatorio } = useAtividadesStore(store => ({
		getAtividadeDetalhes: store.getAtividadeDetalhes,
		atividade: store.atividade,
		createAtividades: store.createAtividades,
		geraRelatorio: store.geraRelatorio,
	}));

	const [tempAtividade, setTempAtividade] = useState(atividade);

	useEffect(() => {
		setTempAtividade(atividade);
	}, [atividade]);

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const { fetchTiposServicos, listaTiposServicos } = useTiposServicosStore(store => ({
		fetchTiposServicos: store.fetchTiposServicos,
		listaTiposServicos: store.listaTiposServicos,
	}));

	const { getQuestionario, fetchTarefas, excluiTarefa, fetchPerguntas, questionario, tarefas, perguntas } = useQuestionarioStore(store => ({
		getQuestionario: store.getQuestionario,
		fetchTarefas: store.fetchTarefas,
		excluiTarefa: store.excluiTarefa,
		fetchPerguntas: store.fetchPerguntas,
		questionario: store.questionario,
		tarefas: store.tarefas,
		perguntas: store.perguntas,
	}));

	const { fetchRespostas, respostas, updateResposta } = useRespostaStore(store => ({
		fetchRespostas: store.fetchRespostas,
		respostas: store.respostas,
		updateResposta: store.updateResposta,
	}));

	const [tempRespostas, setTempRespostas] = useState([]);
	useEffect(() => {
		setTempRespostas(respostas);
	}, [respostas]);

	const handleUpdateTempRespostas = (pergunta, value) => {
		setTempRespostas(tempRespostas.map(r => (r.pergunta_id == pergunta.pergunta_id ? { ...r, resposta: value } : r)));
	};

	const BCrumb = [
		{
			to: "/atividades/lista",
			title: "Lista de Atividades",
		},
		{
			title: (
				<Typography>{tempAtividade.atividade_tipo == "relatorio" ? atividade.atividade_nome : `${atividade.atividade_nome} / ${questionario.nome} / ${questionario.descricao}`}</Typography>
			),
		},
	];

	useEffect(() => {
		if (atividade.questionario_id) {
			getQuestionario(atividade.questionario_id);
			fetchTarefas(atividade.questionario_id);
			fetchPerguntas(atividade.questionario_id);
			fetchRespostas(atividade.atividade_id);
			fetchTiposServicos();
		}
	}, [atividade.questionario_id]);

	const [open, setMenuOpen] = useState(false);

	const handleToggle = () => {
		setMenuOpen(!open);
	};

	const handleClose = () => {
		setMenuOpen(false);
	};

	const { concluiAtividade } = useAtividadesStore(store => ({
		concluiAtividade: store.concluiAtividade,
	}));

	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const [matriculaShow, setMatriculaShow] = useState(false);
	const [pass, setPass] = useState("");

	const handleAtualizaRespostas = async () => {
		handleClose();
		enqueueSnackbar(
			<Box display={"flex"} color={"white"} flexDirection={"row"} gap={3} justifyContent={"center"} alignItems={"center"}>
				<CircularProgress
					sx={{
						color: "#fff",
					}}
				/>{" "}
				<Typography>Atualizando...</Typography>
			</Box>,
			{
				variant: "info",
				hideIconVariant: "true",
			}
		);
		const arr1 = tempRespostas.map(r => r.resposta).sort();
		const arr2 = respostas.map(r => r.resposta).sort();

		const areEqual = arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);

		if (areEqual) {
			setTimeout(() => {
				closeSnackbar();
				enqueueSnackbar("Nenhuma informação para atualizar!", { variant: "warning" });
			}, 485);
			return;
		}

		const response = await updateResposta(tempRespostas);
		if (response.status === 200) {
			closeSnackbar();
			enqueueSnackbar("Respostas atualizadas com sucesso!", { variant: "success" });
		}
	};

	const handleConcluirAtividade = async () => {
		handleClose();
		enqueueSnackbar(
			<Box display={"flex"} color={"white"} flexDirection={"row"} gap={3} justifyContent={"center"} alignItems={"center"}>
				<CircularProgress
					sx={{
						color: "#fff",
					}}
				/>{" "}
				<Typography variant="h5">Concluindo a atividade</Typography>
			</Box>,
			{
				variant: "info",
				hideIconVariant: "true",
			}
		);
		const response = await concluiAtividade(atividade_id, pass, tempAtividade.atividade_conclusao);
		console.log(response);
		if (response.status === 200) {
			closeSnackbar();
			handleCloseDialog();
			enqueueSnackbar(<Typography variant="h5">Atividade concluída com sucesso!</Typography>, { variant: "success" });
			setTimeout(() => {
				navigate("/atividades/lista");
				window.location.reload();
			}, 1000);
		} else if (response.status == "401") {
			closeSnackbar();
			enqueueSnackbar(<Typography variant="h5">Senha inválida!</Typography>, { variant: "error" });
		} else {
			closeSnackbar();
			enqueueSnackbar(<Typography variant="h5">Erro ao concluir atividade</Typography>, { variant: "error" });
		}
	};

	return (
		<>
			<PageContainer title={"Atividade"} description="Gestão de Atividades">
				<Breadcrumb
					title={tempAtividade.atividade_tipo == "relatorio" ? atividade.atividade_nome : `${atividade.atividade_nome} / ${questionario.nome} / ${questionario.descricao}`}
					items={BCrumb}
				/>
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<BlankCard>
								<CardContent>
									<Grid container spacing={1} sx={{ display: "flex", justifyContent: "start" }}>
										<Grid item xs={6} md={6} lg={1}>
											<Button onClick={() => setSelectedTab(1)} fullWidth variant={selectedTab == 1 ? "contained" : "outlined"} color="secondary">
												Detalhes
											</Button>
										</Grid>
										<Grid fullWidth item xs={6} md={6} lg={1}>
											<Button onClick={() => setSelectedTab(2)} fullWidth variant={selectedTab == 2 ? "contained" : "outlined"} color="secondary">
												Anexos
											</Button>
										</Grid>
										{/* <Grid fullWidth item xs={4} md={4} lg={1}>
											<Button onClick={() => setSelectedTab(3)} fullWidth variant={selectedTab == 3 ? "contained" : "outlined"} color="secondary">
												Relatorios
											</Button>
										</Grid> */}
									</Grid>
								</CardContent>
							</BlankCard>
						</Grid>
						{selectedTab == "1" ? (
							<>
								{tarefas &&
									tarefas.map((tarefa, index) => (
										<Grid item xs={12} key={index}>
											<BlankCard>
												<CardContent>
													<Typography variant="h6" component="div" gutterBottom>
														{tarefa.nome_tarefa}
													</Typography>
													<Typography>{tarefa.descricao}</Typography>
												</CardContent>
												<Divider />
												<CardContent
													sx={{
														display: "flex",
														flexDirection: "column",
														gap: 2,
													}}
												>
													{perguntas &&
														perguntas.map((pergunta, index) => {
															if (pergunta.tarefa_id === tarefa.tarefa_id) {
																const respostaAtual = tempRespostas.find(res => res.pergunta_id === pergunta.pergunta_id) || {};

																if (pergunta.tipo_resposta === "text" || pergunta.tipo_resposta === "number") {
																	return (
																		<div key={index}>
																			<TextField
																				value={respostaAtual.resposta || ""}
																				onChange={e => handleUpdateTempRespostas(pergunta, e.target.value)}
																				label={pergunta.pergunta}
																				fullWidth
																				type={pergunta.tipo_resposta === "number" ? "number" : "text"}
																			/>
																			<Divider />
																		</div>
																	);
																}

																if (pergunta.tipo_resposta === "select") {
																	return (
																		<FormControl fullWidth key={index}>
																			<InputLabel id={`label-${pergunta.pergunta_id}`}>{pergunta.pergunta}</InputLabel>
																			<Select
																				value={respostaAtual.resposta || ""}
																				onChange={e => handleUpdateTempRespostas(pergunta, e.target.value)}
																				fullWidth
																				labelId={`label-${pergunta.pergunta_id}`}
																				label={pergunta.pergunta}
																			>
																				<MenuItem value="">Selecione</MenuItem>
																				{JSON.parse(pergunta.opcoes).map((opcao, idx) => (
																					<MenuItem key={idx} value={opcao}>
																						{opcao}
																					</MenuItem>
																				))}
																			</Select>
																		</FormControl>
																	);
																}

																if (pergunta.tipo_resposta === "checkbox") {
																	return (
																		<FormControl key={index}>
																			<FormLabel>{pergunta.pergunta}</FormLabel>
																			<FormGroup>
																				{JSON.parse(pergunta.opcoes).map((opcao, idx) => {
																					return (
																						<FormControlLabel
																							key={idx}
																							control={<Checkbox checked={respostaAtual.resposta == opcao} />}
																							label={opcao}
																							onChange={e => handleUpdateTempRespostas(pergunta, opcao, e.target.checked)}
																						/>
																					);
																				})}
																			</FormGroup>
																		</FormControl>
																	);
																}

																if (pergunta.tipo_resposta === "radio") {
																	return (
																		<FormControl key={index}>
																			<FormLabel>{pergunta.pergunta}</FormLabel>
																			<RadioGroup
																				value={respostaAtual.resposta || ""}
																				onChange={e => handleUpdateTempRespostas(pergunta, e.target.value)}
																			>
																				<FormControlLabel value="Sim" control={<Radio />} label="Sim" />
																				<FormControlLabel value="Não" control={<Radio />} label="Não" />
																			</RadioGroup>
																		</FormControl>
																	);
																}
															}
															return null; // Certifique-se de retornar null caso a pergunta não corresponda à tarefa
														})}
												</CardContent>
											</BlankCard>
										</Grid>
									))}
								{tempAtividade.atividade_endereco && (
									<Grid item xs={12}>
										<BlankCard>
											<CardContent>
												<Typography variant="h6" component="div" gutterBottom>
													Endereço: {tempAtividade.atividade_endereco}
												</Typography>
											</CardContent>
										</BlankCard>
									</Grid>
								)}
								<Grid item xs={12}>
									<BlankCard>
										<CardContent>
											<Typography variant="h6" component="div" gutterBottom>
												Conclusão da Atividade
											</Typography>
											<TextField
												multiline
												fullWidth
												value={tempAtividade.atividade_conclusao}
												onChange={e => setTempAtividade({ ...tempAtividade, atividade_conclusao: e.target.value })}
											></TextField>
										</CardContent>
									</BlankCard>
								</Grid>
							</>
						) : null}

						{selectedTab == "2" && <ListaAnexos />}
					</Grid>
				</Box>
			</PageContainer>

			<SpeedDial ariaLabel="SpeedDial controlled open example" sx={{ position: "fixed", bottom: 16, right: 16 }} icon={<SpeedDialIcon />} onClick={handleToggle} open={open}>
				<SpeedDialAction
					sx={{ marginBottom: 3 }}
					color="primary"
					variant="contained"
					key={"Gerar Relatório"}
					icon={
						<Box marginRight={6}>
							<Button
								onClick={() => geraRelatorio(atividade_id)}
								variant="contained"
								color="primary"
								startIcon={<TextSnippet />}
								sx={{
									width: "120px",
									paddingX: 3,
									paddingY: 2,
								}}
							>
								<Typography variant="h6">Relatório</Typography>
							</Button>
						</Box>
					}
				/>
				<SpeedDialAction
					sx={{ marginBottom: 3 }}
					key={"Concluir Atividade"}
					icon={
						<Box marginRight={6}>
							<Button
								onClick={handleOpenDialog}
								variant="contained"
								color="secondary"
								sx={{
									width: "120px",
									paddingX: 3,
									paddingY: 2,
								}}
								startIcon={<Check />}
							>
								<Typography variant="h6">Concluir</Typography>
							</Button>
						</Box>
					}
				/>

				<SpeedDialAction
					sx={{ marginBottom: 3 }}
					color="primary"
					variant="contained"
					key={"Salvar alterações"}
					icon={
						<Box marginRight={6}>
							<Button
								onClick={handleAtualizaRespostas}
								variant="contained"
								color="success"
								startIcon={<Save />}
								sx={{
									width: "120px",
									paddingX: 3,
									paddingY: 2,
								}}
							>
								<Typography variant="h6">Salvar</Typography>
							</Button>
						</Box>
					}
				/>

				<SpeedDialAction
					sx={{ marginBottom: 3 }}
					color="primary"
					variant="contained"
					key={"Anexos"}
					icon={
						<Box onClick={() => setSelectedTab(2)} marginRight={6}>
							<DialogAnexos setOpenMenu={e => setOpenMenu(true)} />
						</Box>
					}
				/>
			</SpeedDial>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				fullScreen={isMd}
				onBackdropClick="false"
				PaperProps={{
					component: "form",
					onSubmit: event => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries(formData.entries());
						const email = formJson.email;
						console.log(email);
						handleClose();
					},
				}}
			>
				<DialogTitle>Confirmação</DialogTitle>
				<DialogContent>
					<DialogContentText>Esta ação conclui a sua atividade. Para melhorar a segurança da sua operação, digite abaixo a sua senha de acesso.</DialogContentText>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: 2,
						}}
					>
						<TextField
							onChange={e => setPass(e.target.value)}
							autoFocus
							required
							margin="dense"
							id="pass"
							name="pass"
							label="Senha"
							type={matriculaShow ? "text" : "password"}
							fullWidth
							variant="standard"
						/>
						<IconButton onClick={() => setMatriculaShow(!matriculaShow)}>{matriculaShow ? <Visibility /> : <VisibilityOff />}</IconButton>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancelar</Button>
					<Button variant="contained" color="success" onClick={handleConcluirAtividade}>
						Concluir
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog fullScreen={isMd}></Dialog>
		</>
	);
};

export default DetalhesAtividade;
