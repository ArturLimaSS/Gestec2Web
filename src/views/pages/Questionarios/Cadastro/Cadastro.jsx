import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography, IconButton, FormControlLabel, Radio, Checkbox, Switch, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import BlankCard from "../../../../components/shared/BlankCard";
import { Add, Delete } from "@mui/icons-material";
import { useQuestionarioStore } from "../../../../zustand/Questionario/QuestionarioStore";
import { useAuthStore } from "../../../../zustand/Auth/AuthStore";
import CreatableMultiSelect from "../../../../components/creatableMultiSelect/CreatableMultiSelect";

const QuestionarioCadastro = () => {
	const { empresa } = useAuthStore(store => ({
		empresa: store.empresa,
	}));

	const {
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
	} = useQuestionarioStore(store => store);
	const [updatableQuestionario, setUpdatableQuestionario] = useState(questionario);

	const handleAtualizaQuestionario = (questionarioAtualizado, field) => {
		if (questionario[field] != questionarioAtualizado[field]?.trim()) {
			atualizaQuestionario(questionarioAtualizado);
		}
	};

	useEffect(() => {
		if (empresa.empresa_id) {
			fetchQuestionario(empresa.empresa_id);
		}
	}, [empresa.empresa_id]);

	const [questionarioData, setQuestionarioData] = useState(questionario);

	useEffect(() => {
		setQuestionarioData(questionario);
		setUpdatableQuestionario(questionario);
		if (questionario.checklist_id) {
			fetchTarefas(questionario.checklist_id);
			fetchPerguntas(questionario.checklist_id);
		}
	}, [questionario]);

	const [tempTarefas, setTempTarefas] = useState(tarefas);
	useEffect(() => {
		setTempTarefas(tarefas);
	}, [tarefas]);

	const handleAddTarefa = () => {
		addTarefa(questionario.checklist_id);
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
		criarPergunta({ checklist_id: questionario.checklist_id, tarefa_id: tarefa_id, empresa_id: empresa.empresa_id });
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

	return (
		<Box sx={{ mt: 3 }}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<BlankCard>
						<CardContent>
							<Typography variant="h5" component="div" gutterBottom>
								Identificação do Checklist
							</Typography>
							<Divider />
							<Grid container spacing={3} sx={{ marginTop: 0 }}>
								<Grid item xs={12}>
									<TextField
										InputLabelProps={{
											shrink: !!updatableQuestionario.nome,
										}}
										value={updatableQuestionario.nome}
										onBlur={() => handleAtualizaQuestionario(updatableQuestionario, "nome")}
										onChange={e => setUpdatableQuestionario({ ...updatableQuestionario, nome: e.target.value })}
										fullWidth
										label="Nome do Checklist"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										InputLabelProps={{
											shrink: !!questionario.descricao,
										}}
										value={updatableQuestionario.descricao}
										onBlur={() => handleAtualizaQuestionario(updatableQuestionario, "descricao")}
										onChange={e => setUpdatableQuestionario({ ...updatableQuestionario, descricao: e.target.value })}
										fullWidth
										label="Descrição"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										InputLabelProps={{
											shrink: !!updatableQuestionario.tipo_serviço_id,
										}}
										value={updatableQuestionario.tipo_serviço_id}
										onBlur={() => handleAtualizaQuestionario(updatableQuestionario, "tipo_serviço_id")}
										onChange={e => setUpdatableQuestionario({ ...updatableQuestionario, tipo_serviço_id: e.target.value })}
										fullWidth
										label="Tipo de Serviço"
									/>
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
									Tarefa {tarefaIndex + 1}
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
					<Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddTarefa}>
						Adicionar Tarefa
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default QuestionarioCadastro;
