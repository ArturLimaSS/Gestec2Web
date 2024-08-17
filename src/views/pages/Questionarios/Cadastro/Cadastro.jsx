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
} from "@mui/material";
import { useEffect, useState } from "react";
import BlankCard from "../../../../components/shared/BlankCard";
import { Add, Delete, Save } from "@mui/icons-material";
import { useQuestionarioStore } from "../../../../zustand/Questionario/QuestionarioStore";
import { useAuthStore } from "../../../../zustand/Auth/AuthStore";
import CreatableMultiSelect from "../../../../components/creatableMultiSelect/CreatableMultiSelect";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";
import { useTiposServicosStore } from "../../../../zustand/TiposServicos/TiposServicosStore";
import { Link } from "react-router-dom";
import PageContainer from "../../../../components/container/PageContainer";
import Breadcrumb from "../../../../layouts/full/shared/breadcrumb/Breadcrumb";

const QuestionarioCadastro = () => {
	const location = useLocation();
	const { questionario_id } = useParams();

	const [editMode, setEditMode] = useState(false);
	useEffect(() => {
		if (location.pathname != "/questionarios/cadastro") {
			setEditMode(true);
		} else {
			setEditMode(false);
		}
	}, [location]);

	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { empresa } = useAuthStore(store => ({
		empresa: store.empresa,
	}));

	const { fetchTiposServicos, listaTiposServicos } = useTiposServicosStore(store => ({
		fetchTiposServicos: store.fetchTiposServicos,
		listaTiposServicos: store.listaTiposServicos,
	}));

	const {
		getQuestionario,
		fetchQuestionario,
		questionario,
		atualizaQuestionario,
		tarefas,
		fetchTarefas,
		addTarefa,
		atualizaTarefa,
		excluiTarefa,
		perguntas,
		fetchPerguntas,
		criarPergunta,
		excluirPergunta,
		atualizaPergunta,
		finalizaQuestionario,
	} = useQuestionarioStore(store => store);
	const [updatableQuestionario, setUpdatableQuestionario] = useState(questionario);

	useEffect(() => {
		console.log(updatableQuestionario);
	}, [updatableQuestionario]);

	const handleAtualizaQuestionario = (questionarioAtualizado, field) => {
		if (typeof questionarioAtualizado[field] == "string") {
			if (questionario[field] != questionarioAtualizado[field]?.trim()) {
				atualizaQuestionario(questionarioAtualizado);
			}
		} else {
			if (questionario[field] != questionarioAtualizado[field]) {
				atualizaQuestionario(questionarioAtualizado);
			}
		}
	};

	useEffect(() => {
		if (empresa.empresa_id) {
			if (location.pathname == "/questionarios/cadastro") {
				fetchQuestionario(empresa.empresa_id);
			} else {
				if (questionario_id) {
					getQuestionario(questionario_id);
				}
			}

			fetchTiposServicos(empresa.empresa_id);
		}
	}, [empresa.empresa_id]);

	const [questionarioData, setQuestionarioData] = useState(questionario);

	useEffect(() => {
		setQuestionarioData(questionario);
		setUpdatableQuestionario(questionario);
		if (questionario.questionario_id) {
			fetchTarefas(questionario.questionario_id);
			fetchPerguntas(questionario.questionario_id);
		}
	}, [questionario]);

	const [tempTarefas, setTempTarefas] = useState(tarefas);
	useEffect(() => {
		setTempTarefas(tarefas);
	}, [tarefas]);

	const handleAddTarefa = () => {
		addTarefa(questionario.questionario_id);
	};

	const handleTarefaChange = (tarefa_id, field, value) => {
		setTempTarefas(tempTarefas.map(t => (t.tarefa_id == tarefa_id ? { ...t, [field]: value } : t)));
	};

	const handleAtualizaTarefa = (tarefa, field) => {
		const refTarefa = tarefas.find(t => t.tarefa_id == tarefa.tarefa_id);
		if (refTarefa[field] != tarefa[field]?.trim()) {
			atualizaTarefa(tarefa);
		}
	};

	const handleAddPergunta = tarefa_id => {
		criarPergunta({ questionario_id: questionario.questionario_id, tarefa_id: tarefa_id, empresa_id: empresa.empresa_id });
	};

	const handleRemovePergunta = pergunta_id => {
		excluirPergunta(pergunta_id);
	};

	const [tempPerguntas, setTempPerguntas] = useState(perguntas);
	useEffect(() => {
		setTempPerguntas(perguntas);
	}, [perguntas]);

	const handlePerguntaChange = (pergunta_id, field, value) => {
		setTempPerguntas(tempPerguntas.map(p => (p.pergunta_id == pergunta_id ? { ...p, [field]: value } : p)));
	};

	const handleUpdatePergunta = (pergunta, field) => {
		const refPergunta = perguntas.find(p => p.pergunta_id == pergunta.pergunta_id);
		if (refPergunta[field] != pergunta[field]) {
			atualizaPergunta(pergunta);
		}
	};

	const [open, setOpen] = useState(false);
	const [confirmation, setConfirmation] = useState(false);

	const getConfirmation = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleFinalizaQuestionario = async () => {
		const response = await finalizaQuestionario(questionario.questionario_id);
		if (response.status == "200") {
			enqueueSnackbar("Questionário finalizado com sucesso!", { variant: "success" });
			handleClose();
			setTimeout(() => {
				navigate("/questionarios/lista");
			}, 1000);
		}
	};

	useEffect(() => {
		if (confirmation == true) {
			handleFinalizaQuestionario();
			setConfirmation(false);
		} else {
			handleClose();
			setConfirmation(false);
		}
	}, [confirmation]);
	const BCrumb = [
		{
			to: "/questionarios/lista",
			title: "Lista de Questionários",
		},
		{
			title: editMode ? "Edição de questionário" : "Cadastro de questionário",
		},
	];

	return (
		<>
			<PageContainer title={editMode ? "Edição de questionário" : "Cadastro de Questionário"} description="Gestão de Questionários">
				<Breadcrumb title={"Gestão de Questionários"} items={BCrumb} />
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<BlankCard>
								<CardContent>
									<Typography variant="h5" component="div" gutterBottom>
										Identificação do Questionario
									</Typography>
									<Divider />
									<Grid container spacing={3} sx={{ marginTop: 0 }}>
										<Grid item xs={12}>
											<TextField
												value={updatableQuestionario.nome || ""}
												onBlur={() => handleAtualizaQuestionario(updatableQuestionario, "nome")}
												onChange={e => setUpdatableQuestionario({ ...updatableQuestionario, nome: e.target.value })}
												fullWidth
												label="Nome do questionário"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												// InputLabelProps={{
												// 	shrink: !!questionario.descricao,
												// }}
												value={updatableQuestionario.descricao || ""}
												onBlur={() => handleAtualizaQuestionario(updatableQuestionario, "descricao")}
												onChange={e => setUpdatableQuestionario({ ...updatableQuestionario, descricao: e.target.value })}
												fullWidth
												label="Descrição"
											/>
										</Grid>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel id="tipo_servico_label_id">Tipo de Serviço</InputLabel>
												<Select
													fullWidth
													value={updatableQuestionario.tipo_servico_id || ""}
													labelId="tipo_servico_label_id"
													id="tipo_servico_id"
													name="tipo_servico_id"
													label="Tipo de Serviço"
													onChange={e => setUpdatableQuestionario({ ...updatableQuestionario, tipo_servico_id: e.target.value })}
													onBlur={() => handleAtualizaQuestionario(updatableQuestionario, "tipo_servico_id")}
												>
													<MenuItem value="">Selecione um tipo de serviço</MenuItem>
													{listaTiposServicos?.map((tipo, index) => (
														<MenuItem
															selected={tipo.tipo_servico_id == updatableQuestionario.tipo_servico_id}
															value={tipo.tipo_servico_id}
															key={tipo.tipo_servico_id}
														>
															{tipo.nome_tipo_servico}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</CardContent>
							</BlankCard>
						</Grid>

						{tempTarefas?.map((tarefa, tarefaIndex) => (
							<Grid item xs={12} key={tarefaIndex}>
								<BlankCard>
									<CardContent>
										<Typography variant="h5" component="div" gutterBottom>
											{tarefa.nome_tarefa ? tarefaIndex + 1 + " - " + tarefa.nome_tarefa : tarefaIndex + 1 + " - Tarefa sem nome"}
										</Typography>
										<Divider />
										<Grid container spacing={3} sx={{ marginTop: 3 }}>
											<Grid item xs={12} sm={6}>
												<TextField
													fullWidth
													label="Nome da Tarefa"
													value={tarefa.nome_tarefa ? tarefa.nome_tarefa : ""}
													onChange={e => handleTarefaChange(tarefa.tarefa_id, "nome_tarefa", e.target.value)}
													onBlur={() => {
														handleAtualizaTarefa(tarefa, "nome_tarefa");
													}}
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<TextField
													fullWidth
													label="Descrição da Tarefa"
													value={tarefa.descricao_tarefa ? tarefa.descricao_tarefa : ""}
													onChange={e => handleTarefaChange(tarefa.tarefa_id, "descricao_tarefa", e.target.value)}
													onBlur={() => {
														handleAtualizaTarefa(tarefa, "descricao_tarefa");
													}}
												/>
											</Grid>
											<Grid item xs={12} sm={1}>
												<IconButton color="error" onClick={() => excluiTarefa(tarefa.tarefa_id)}>
													<Delete />
												</IconButton>
											</Grid>
										</Grid>

										<Typography variant="h6" component="div" gutterBottom sx={{ mt: 3 }}>
											Perguntas
										</Typography>

										{tempPerguntas &&
											tempPerguntas.map((pergunta, perguntaIndex) => {
												if (pergunta.tarefa_id == tarefa.tarefa_id) {
													return (
														<Grid container spacing={3} key={perguntaIndex} sx={{ mt: 3 }}>
															<Grid item xs={12} sm={6}>
																<TextField
																	fullWidth
																	label="Pergunta"
																	value={pergunta.pergunta}
																	onChange={e => handlePerguntaChange(pergunta.pergunta_id, "pergunta", e.target.value)}
																	onBlur={e => handleUpdatePergunta(pergunta, "pergunta")}
																/>
															</Grid>
															<Grid item xs={12} sm={3}>
																<FormControl fullWidth>
																	<InputLabel id="id_tipo_resposta_label">Tipo de Resposta</InputLabel>
																	<Select
																		fullWidth
																		labelId="id_tipo_resposta_label"
																		label="Tipo de Resposta"
																		value={pergunta.tipo_resposta}
																		onChange={e => handlePerguntaChange(pergunta.pergunta_id, "tipo_resposta", e.target.value)}
																		onBlur={e => handleUpdatePergunta(pergunta, "tipo_resposta")}
																	>
																		{[
																			{ label: "CheckBox", value: "checkbox" },
																			{ label: "Seleção", value: "select" },
																			{ label: "Texto", value: "text" },
																			{ label: "Numero", value: "number" },
																			{ label: "Radio", value: "radio" },
																		].map(option => (
																			<MenuItem key={option.value} value={option.value}>
																				{option.label}
																			</MenuItem>
																		))}
																	</Select>
																</FormControl>
															</Grid>

															{pergunta.tipo_resposta == "checkbox" || pergunta.tipo_resposta == "select" ? (
																<Grid item xs={12} sm={3}>
																	<FormControl fullWidth>
																		<CreatableMultiSelect
																			pergunta={pergunta}
																			field={"opcoes"}
																			initialValues={pergunta.opcoes || []}
																			onChange={e => handleUpdatePergunta(pergunta, "opcoes")}
																			// onBlur={handleUpdatePergunta}
																			onChangeValues={e => handlePerguntaChange(pergunta.pergunta_id, "opcoes", e)}
																			label="Tipo de Resposta"
																		/>
																	</FormControl>
																</Grid>
															) : null}
															<Grid item xs={12} sm={1}>
																<IconButton color="error" onClick={() => handleRemovePergunta(pergunta.pergunta_id)}>
																	<Delete />
																</IconButton>
															</Grid>
														</Grid>
													);
												}
											})}

										<Button variant="contained" color="primary" startIcon={<Add />} sx={{ marginTop: 3 }} onClick={() => handleAddPergunta(tarefa.tarefa_id)}>
											Adicionar Pergunta
										</Button>
									</CardContent>
								</BlankCard>
							</Grid>
						))}

						<Grid item xs={12}>
							<BlankCard>
								<CardContent
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddTarefa}>
										Adicionar Tarefa
									</Button>
									{editMode && (
										<Button variant="contained" component={Link} color="success" startIcon={<Save />} to="/questionarios/lista">
											Finalizar Edição de Questionário
										</Button>
									)}
									{!editMode && (
										<Button variant="contained" color="success" startIcon={<Save />} onClick={getConfirmation}>
											Finalizar Cadastro de Questionário
										</Button>
									)}
								</CardContent>
							</BlankCard>
						</Grid>
					</Grid>
				</Box>
			</PageContainer>
			<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Deseja finalizar o cadastro do questionário?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Fazendo isso, o questionário estará apto para uso em Ordens de Serviços.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={() => setConfirmation(true)} autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default QuestionarioCadastro;
