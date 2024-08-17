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
import { useAtividadesStore } from "../../../../zustand/Atividades/AtividadesStore";
import { useRespostaStore } from "../../../../zustand/Respostas/RespostaStore";

const DetalhesAtividade = () => {
	const location = useLocation();

	const { atividade_id } = useParams();

	useEffect(() => {
		getAtividadeDetalhes(atividade_id);
	}, []);

	const { getAtividadeDetalhes, atividade } = useAtividadesStore(store => ({
		getAtividadeDetalhes: store.getAtividadeDetalhes,
		atividade: store.atividade,
	}));

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

	useEffect(() => {
		console.log(tempRespostas);
	}, [tempRespostas]);

	const BCrumb = [
		{
			to: "/atividades/lista",
			title: "Lista de Atividades",
		},
		{
			title: atividade.atividade_nome,
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

	const handleAtualizaRespostas = () => {
		updateResposta(tempRespostas);
	};

	return (
		<>
			<Fab onClick={handleAtualizaRespostas} color={"success"} variant="extended" sx={{ background: "#66bb6a", borderRadius: "10px", position: "fixed", right: "25px", bottom: "25px" }}>
				<Save sx={{ mr: 1 }} />
				<Typography>Salvar</Typography>
			</Fab>
			<PageContainer title={"Atividade"} description="Gestão de Atividades">
				<Breadcrumb title={atividade.atividade_nome} items={BCrumb} />
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<BlankCard>
								<CardContent>
									<Box
										sx={{
											mb: 1,
										}}
									>
										<Typography variant="h5" component="div" gutterBottom>
											{atividade.atividade_nome}
										</Typography>
										<Typography>{atividade.atividade_descricao || "Sem descrição"}</Typography>
									</Box>
									<Divider />
									<Grid container spacing={3} sx={{ marginTop: 0 }}>
										<Grid item xs={12}>
											<Typography>{questionario.nome}</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography>{questionario.descricao}</Typography>
											<Typography>{questionario.nome_tipo_servico}</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</BlankCard>
						</Grid>

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
																			console.log(pergunta.pergunta);
																			console.log(respostaAtual.resposta);
																			console.log(opcao);
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

						<Grid item xs={12}>
							<BlankCard>
								<CardContent
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Button variant="contained" color="success" startIcon={<Save />}>
										Finalizar Atividade
									</Button>
								</CardContent>
							</BlankCard>
						</Grid>
					</Grid>
				</Box>
			</PageContainer>
		</>
	);
};

export default DetalhesAtividade;
