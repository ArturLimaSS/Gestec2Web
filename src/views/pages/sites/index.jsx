import { useEffect, useState } from "react";
import { useAuthStore } from "../../../zustand/Auth/AuthStore";
import { useSitesStore } from "../../../zustand/Sites/SiteStore";
import {
	Button,
	ButtonGroup,
	CardContent,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";
import AppCard from "../../../components/shared/AppCard";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import { Delete, Edit } from "@mui/icons-material";
import { useAlert } from "../../../context/useAlert";
import BlankCard from "../../../components/shared/BlankCard";
import { useTipoAcesso } from "../../../zustand/TipoAcesso/tipoAcessoStore";
import { useTipoChave } from "../../../zustand/TipoChave/tipoChaveStore";
import { CadastroTipoAcesso } from "../../../components/tipo-acesso/cadastro";
import { CadastroTipoChave } from "../../../components/tipo-chave/Cadastro";
import { ufList } from "../../../_mockApis/ufs/ufList";
import { SelectCreate } from "../../../components/forms/select-create/SelectCreate";
import { useUtils } from "../../../zustand/Utils/utilStore";

const Sites = props => {
	const { empresa } = useAuthStore(store => ({
		empresa: store.empresa,
	}));

	const { buscaEndereco, endereco } = useUtils(store => ({
		buscaEndereco: store.buscaEndereco,
		endereco: store.endereco,
	}));

	const { lista_tipo_acesso, fetchTipoAcessos } = useTipoAcesso(store => ({
		lista_tipo_acesso: store.lista_tipo_acesso,
		fetchTipoAcessos: store.fetchTipoAcessos,
	}));

	const { lista_tipo_chave, fetchTipoChave } = useTipoChave(store => ({
		lista_tipo_chave: store.lista_tipo_chave,
		fetchTipoChave: store.fetchTipoChave,
	}));

	useEffect(() => {
		fetchTipoAcessos();
		fetchTipoChave();
	}, []);

	const { show } = useAlert();

	const { excluirSite, buscarSite, site, atualizarSite } = useSitesStore(store => ({
		excluirSite: store.excluirSite,
		buscarSite: store.buscarSite,
		site: store.site,
		atualizarSite: store.atualizarSite,
	}));

	const [openEdita, setOpenEdita] = useState(false);
	const [openExcluir, setOpenExcluir] = useState(false);
	const [selectedSite, setSelectedSite] = useState({});
	const handleClickOpenEdita = site => {
		setOpenEdita(true);
		buscarSite(site.site_id);
	};

	const handleGetCep = async () => {
		await buscaEndereco(selectedSite.endereco_cep);
	};

	useEffect(() => {
		setSelectedSite({
			...selectedSite,
			endereco_rua: endereco.logradouro,
			endereco_cidade: endereco.localidade,
			endereco_estado: endereco.uf,
		});
	}, [endereco]);

	const handleGetCepAsyn = async () => {
		await buscaEndereco(selectedSite?.endereco_cep?.replace("-", ""));
	};
	useEffect(() => {
		handleGetCepAsyn();
	}, [selectedSite?.endereco_cep]);

	useEffect(() => {
		setSelectedSite(site);
	}, [site]);

	const handleClickOpenExcluir = site => {
		setOpenExcluir(true);
		setSelectedSite(site);
	};

	const handleClose = () => {
		setOpenEdita(false);
		setOpenExcluir(false);
	};

	const handleSubmitAtualizarSite = async () => {
		show(null, "loading");
		const response = await atualizarSite(selectedSite);
		console.log("Response fora do try:", response); // Para debug

		if (response?.status === 200) {
			// Melhor usar `===` e checar se `response` existe
			show(response.data.message, "success");
			handleClose();
		} else {
			show(response?.data?.message || "Erro desconhecido", "error");
		}
	};

	const handleSubmitExcluirSite = async () => {
		show(null, "loading");
		const response = await excluirSite(selectedSite.site_id);
		if (response.status == "200") {
			show("Site excluído com sucesso!", "success");
			handleClose();
		} else {
			show("Ocorreu um erro ao excluir o site!", "error");
		}
	};

	const { fetchListaSites, listaSites } = useSitesStore(store => ({
		fetchListaSites: store.fetchListaSites,
		listaSites: store.listaSites,
	}));

	const handleFetchListaSites = async () => {
		const response = await fetchListaSites();
		console.log(response);
	};

	useEffect(() => {
		handleFetchListaSites();
	}, []);

	const BCrumb = [
		{
			to: "/",
			title: "Home",
		},

		{
			title: "Sites",
		},
	];

	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<>
			<PageContainer title={"Sites"}>
				<Breadcrumb title={"Sites"} items={BCrumb} />
				<AppCard title={"Sites"}>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Nome</TableCell>
									<TableCell>Rua</TableCell>
									<TableCell>Numero</TableCell>
									<TableCell>Cidade</TableCell>
									<TableCell>Estado</TableCell>
									<TableCell>CEP</TableCell>
									<TableCell>Tipo de Acesso</TableCell>
									<TableCell>Tipo de Chave</TableCell>
									<TableCell>Tipo de Equipamento</TableCell>
									<TableCell>Nível de prioridade</TableCell>
									<TableCell>Ações</TableCell>
								</TableRow>
							</TableHead>
							{listaSites &&
								listaSites.map((site, index) => (
									<TableRow hover role="checkbox" tabIndex={-1} key={index}>
										<TableCell>{site.site_id}</TableCell>
										<TableCell>{site.nome_site}</TableCell>
										<TableCell>{site.endereco_rua}</TableCell>
										<TableCell>{site.endereco_numero}</TableCell>
										<TableCell>{site.endereco_cidade}</TableCell>
										<TableCell>{site.endereco_estado}</TableCell>
										<TableCell>{site.endereco_cep}</TableCell>
										<TableCell>{site.tipo_acesso}</TableCell>
										<TableCell>{site.tipo_chave}</TableCell>
										<TableCell>{site.tipo_equipamento}</TableCell>
										<TableCell>{site.nivel_prioridade}</TableCell>
										<TableCell>
											<ButtonGroup>
												<Button onClick={() => handleClickOpenEdita(site)} variant="contained" color="info" startIcon={<Edit />}>
													Editar
												</Button>
												<Button onClick={() => handleClickOpenExcluir(site)} variant="contained" color="error" startIcon={<Delete />}>
													Excluir
												</Button>
											</ButtonGroup>
										</TableCell>
									</TableRow>
								))}
						</Table>
					</TableContainer>
				</AppCard>
			</PageContainer>
			<Dialog fullWidth maxWidth="lg" open={openEdita} onClose={handleClose}>
				<DialogTitle>Editar Site</DialogTitle>
				<DialogContent>
					<Grid component={"form"} container spacing={3}>
						<Grid item xs={12}>
							<BlankCard>
								<CardContent>
									<h3>Dados do Site</h3>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={4}>
											<InputLabel>Nome do Site</InputLabel>
											<TextField
												name="nome_site"
												value={selectedSite.nome_site}
												onChange={e => setSelectedSite({ ...selectedSite, nome_site: e.target.value })}
												id="nome_site"
												fullWidth
												margin="normal"
											/>
										</Grid>

										<Grid item xs={12} sm={4}>
											<InputLabel>Tipo de Acesso</InputLabel>
											<Select
												fullWidth
												name="tipo_acesso"
												defaultValue={selectedSite.tipo_acesso}
												value={selectedSite.tipo_acesso}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														tipo_acesso: e.target.value,
													})
												}
												id="tipo_acesso"
											>
												<MenuItem disabled value={null}>
													-- Selecione --
												</MenuItem>
												{lista_tipo_acesso?.map((tipo, index) => (
													<MenuItem value={tipo.tipo_acesso_id} key={tipo.tipo_acesso_id}>
														{tipo.tipo_acesso_nome}
													</MenuItem>
												))}
												<CadastroTipoAcesso />
											</Select>
										</Grid>

										<Grid item xs={12} sm={4}>
											<InputLabel id="tipo_chave_label">Tipo de Chave</InputLabel>
											<Select
												fullWidth
												name="tipo_chave"
												defaultValue={selectedSite.tipo_chave}
												value={selectedSite.tipo_chave}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														tipo_chave: e.target.value,
													})
												}
												id="tipo_chave"
											>
												<MenuItem disabled value={null}>
													-- Selecione --
												</MenuItem>
												{lista_tipo_chave?.map(tipo => (
													<MenuItem value={tipo.tipo_chave_id} key={tipo.tipo_chave_id}>
														{tipo.tipo_chave_nome}
													</MenuItem>
												))}
												<CadastroTipoChave />
											</Select>
										</Grid>
									</Grid>
								</CardContent>
							</BlankCard>
						</Grid>

						{/* Endereço */}
						<Grid item xs={12}>
							<BlankCard>
								<CardContent>
									<h3>Endereço</h3>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={4}>
											<InputLabel>Rua</InputLabel>
											<TextField
												name="endereco_rua"
												id="endereco_rua"
												value={selectedSite.endereco_rua}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														endereco_rua: e.target.value,
													})
												}
												fullWidth
												margin="normal"
											/>
										</Grid>

										<Grid item xs={12} sm={4}>
											<InputLabel>Número</InputLabel>
											<TextField
												type="number"
												name="endereco_numero"
												value={selectedSite.endereco_numero}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														endereco_numero: e.target.value,
													})
												}
												id="endereco_numero"
												fullWidth
												margin="normal"
											/>
										</Grid>

										<Grid item xs={12} sm={4}>
											<InputLabel>Cidade</InputLabel>
											<TextField
												name="endereco_cidade"
												value={selectedSite.endereco_cidade}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														endereco_cidade: e.target.value,
													})
												}
												id="endereco_cidade"
												fullWidth
												margin="normal"
											/>
										</Grid>

										<Grid item xs={12} sm={4}>
											<InputLabel id="endereco_estado_label">UF</InputLabel>
											<Select
												fullWidth
												name="endereco_estado"
												defaultValue={selectedSite.endereco_estado}
												value={selectedSite.endereco_estado}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														endereco_estado: e.target.value,
													})
												}
												id="endereco_estado"
											>
												{ufList?.map((uf, index) => (
													<MenuItem key={index} value={uf}>
														{uf}
													</MenuItem>
												))}
											</Select>
										</Grid>

										<Grid item xs={12} sm={4}>
											<InputLabel>CEP</InputLabel>
											<TextField
												name="endereco_cep"
												value={selectedSite.endereco_cep}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														endereco_cep: e.target.value,
													})
												}
												id="endereco_cep"
												fullWidth
												onBlur={e => handleGetCep(e.target.value)}
												margin="normal"
											/>
										</Grid>
									</Grid>
								</CardContent>
							</BlankCard>
						</Grid>

						{/* Dados Adicionais */}
						<Grid item xs={12}>
							<BlankCard>
								<CardContent>
									<h3>Dados Adicionais</h3>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={4}>
											<SelectCreate
												getSelectedValue={e =>
													e &&
													setSelectedSite({
														...selectedSite,
														tipo_equipamento: e.id_tipo_equipamento,
													})
												}
											/>
										</Grid>

										<Grid item xs={12} sm={4}>
											<InputLabel id="nivel_prioridade_label">Prioridade</InputLabel>
											<Select
												fullWidth
												name="nivel_prioridade"
												defaultValue={selectedSite.nivel_prioridade}
												value={selectedSite.nivel_prioridade}
												onChange={e =>
													setSelectedSite({
														...selectedSite,
														nivel_prioridade: e.target.value,
													})
												}
												id="nivel_prioridade"
											>
												<MenuItem disabled value={null}>
													-- Selecione --
												</MenuItem>
												<MenuItem value="alta">Alta</MenuItem>
												<MenuItem value="media">Média</MenuItem>
												<MenuItem value="baixa">Baixa</MenuItem>
											</Select>
										</Grid>
									</Grid>
								</CardContent>
							</BlankCard>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="error">
						Cancelar
					</Button>
					<Button onClick={handleSubmitAtualizarSite} autoFocus variant="contained" color="info">
						Salvar
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openExcluir} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Excluir site?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Deseja realmente excluir o site <strong>{selectedSite.nome_site}</strong>?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="error">
						Cancelar
					</Button>
					<Button onClick={handleSubmitExcluirSite} autoFocus variant="contained" color="info">
						Salvar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Sites;
