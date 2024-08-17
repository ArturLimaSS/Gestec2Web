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
			fetchTiposServicos();
		}
	}, [atividade.questionario_id]);

	return (
		<>
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
														if (pergunta.tipo_resposta == "text") {
															return (
																<>
																	<TextField label={pergunta.pergunta} fullWidth></TextField>
																	<Divider />
																</>
															);
														}

														if (pergunta.tipo_resposta == "select") {
															return (
																<FormControl fullWidth>
																	<InputLabel id="ref_pergunta_id">{pergunta.pergunta}</InputLabel>
																	<Select fullWidth labelId="ref_pergunta_id" label={pergunta.pergunta}>
																		<MenuItem value="">Selecione</MenuItem>
																		{JSON.parse(pergunta.opcoes).map((opcao, index) => (
																			<MenuItem key={index} value={opcao}>
																				{opcao}
																			</MenuItem>
																		))}
																	</Select>
																</FormControl>
															);
														}

														if (pergunta.tipo_resposta == "checkbox") {
															return (
																<FormControl>
																	<FormLabel>{pergunta.pergunta}</FormLabel>
																	<FormGroup fullWidth>
																		{JSON.parse(pergunta.opcoes).map((opcao, index) => (
																			<FormControlLabel label={opcao} control={<Checkbox />} key={index} value={opcao} />
																		))}
																	</FormGroup>
																</FormControl>
															);
														}

														if (pergunta.tipo_resposta == "number") {
															return (
																<>
																	<TextField type="number" label={pergunta.pergunta} fullWidth></TextField>
																	<Divider />
																</>
															);
														}

														if (pergunta.tipo_resposta == "radio") {
															return (
																<>
																	<FormControl>
																		<FormLabel>{pergunta.pergunta}</FormLabel>
																		<RadioGroup fullWidth>
																			<FormControlLabel label={"Sim"} control={<Radio />} value={"Sim"} />
																			<FormControlLabel label={"Não"} control={<Radio />} value={"Não"} />
																		</RadioGroup>
																	</FormControl>
																</>
															);
														}
													}
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
										Finalizar Cadastro de Questionário
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
