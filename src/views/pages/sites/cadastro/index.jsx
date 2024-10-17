import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PageContainer from "../../../../components/container/PageContainer";
import Breadcrumb from "../../../../layouts/full/shared/breadcrumb/Breadcrumb";
import BlankCard from "../../../../components/shared/BlankCard";
import { ufList } from "../../../../_mockApis/ufs/ufList";
import { useAuthStore } from "../../../../zustand/Auth/AuthStore";
import { SelectCreate } from "../../../../components/forms/select-create/SelectCreate";
import { useSitesStore } from "../../../../zustand/Sites/SiteStore";
import { useTipoAcesso } from "../../../../zustand/TipoAcesso/tipoAcessoStore";
import { useTipoChave } from "../../../../zustand/TipoChave/tipoChaveStore";
import { CadastroTipoAcesso } from "../../../../components/tipo-acesso/cadastro";
import { CadastroTipoChave } from "../../../../components/tipo-chave/Cadastro";
import { useUtils } from "../../../../zustand/Utils/utilStore";
import { useAlert } from "../../../../context/useAlert";

const SitesCadastro = () => {
	const { show } = useAlert();

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

	const { createSite } = useSitesStore(store => store);

	const [siteData, setSiteData] = useState({
		empresa_id: "",
		nome_site: "",
		endereco_rua: endereco.logradouro || "",
		endereco_numero: "",
		endereco_cidade: endereco.localidade || "",
		endereco_estado: endereco.uf || "",
		endereco_cep: "",
		tipo_acesso: "",
		tipo_chave: "",
		tipo_equipamento: "",
		nivel_prioridade: "",
	});

	useEffect(() => {
		setSiteData({
			...siteData,
			endereco_rua: endereco.logradouro,
			endereco_cidade: endereco.localidade,
			endereco_estado: endereco.uf,
		});
	}, [endereco]);

	useEffect(() => {
		fetchTipoAcessos();
		fetchTipoChave();
	}, []);

	const [focusedField, setFocusedField] = useState("");

	const handleFocus = field => () => {
		setFocusedField(field);
	};

	const handleGetCep = () => {
		buscaEndereco(siteData.endereco_cep);
	};

	const handleBlur = field => () => {
		setFocusedField("");
		handleGetCep();
	};

	const handleResetSiteData = () => {
		setSiteData({
			nome_site: "",
			endereco_rua: "",
			endereco_numero: "",
			endereco_cidade: "",
			endereco_estado: "",
			endereco_cep: "",
			tipo_acesso: "",
			tipo_chave: "",
			tipo_equipamento: "",
			nivel_prioridade: "",
		});
	};

	const handleCreateSite = async e => {
		e.preventDefault();
		const response = await createSite(siteData);
		if (response.status === 201) {
			show("Site cadastrado com sucesso!", "success");
			handleResetSiteData();
		} else {
			show(response.data.message, "error");
		}
	};

	return (
		<PageContainer title={"Cadastro de Sites"}>
			<Breadcrumb title={"Cadastro de Sites"} />
			<Box>
				<Grid component={"form"} onSubmit={handleCreateSite} container spacing={3}>
					{/* Dados do Site */}
					<Grid item xs={12}>
						<BlankCard>
							<CardContent>
								<h3>Dados do Site</h3>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={4}>
										<TextField
											label="Nome do Site"
											name="nome_site"
											value={siteData.nome_site}
											onChange={e => setSiteData({ ...siteData, nome_site: e.target.value })}
											InputLabelProps={{
												shrink: !!siteData.nome_site || focusedField === "nome_site",
											}}
											onFocus={handleFocus("nome_site")}
											onBlur={handleBlur("nome_site")}
											id="nome_site"
											fullWidth
											margin="normal"
										/>
									</Grid>

									<Grid item xs={12} sm={4}>
										<FormControl fullWidth margin="normal">
											<InputLabel id="tipo_acesso_label">Tipo de Acesso</InputLabel>
											<Select
												label="Tipo de Acesso"
												labelId="tipo_acesso_label"
												name="tipo_acesso"
												value={siteData.tipo_acesso}
												onChange={e =>
													setSiteData({
														...siteData,
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
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={4}>
										<FormControl fullWidth margin="normal">
											<InputLabel id="tipo_chave_label">Tipo de Chave</InputLabel>
											<Select
												label="Tipo de Chave"
												labelId="tipo_chave_label"
												name="tipo_chave"
												value={siteData.tipo_chave}
												onChange={e =>
													setSiteData({
														...siteData,
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
										</FormControl>
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
										<TextField
											label="Rua"
											name="endereco_rua"
											id="endereco_rua"
											value={siteData.endereco_rua}
											onChange={e =>
												setSiteData({
													...siteData,
													endereco_rua: e.target.value,
												})
											}
											InputLabelProps={{
												shrink: !!siteData.endereco_rua || focusedField === "endereco_rua",
											}}
											onFocus={handleFocus("endereco_rua")}
											onBlur={handleBlur("endereco_rua")}
											fullWidth
											margin="normal"
										/>
									</Grid>

									<Grid item xs={12} sm={4}>
										<TextField
											type="number"
											label="Número"
											name="endereco_numero"
											value={siteData.endereco_numero}
											onChange={e =>
												setSiteData({
													...siteData,
													endereco_numero: e.target.value,
												})
											}
											InputLabelProps={{
												shrink: !!siteData.endereco_numero || focusedField === "endereco_numero",
											}}
											onFocus={handleFocus("endereco_numero")}
											onBlur={handleBlur("endereco_numero")}
											id="endereco_numero"
											fullWidth
											margin="normal"
										/>
									</Grid>

									<Grid item xs={12} sm={4}>
										<TextField
											label="Cidade"
											name="endereco_cidade"
											value={siteData.endereco_cidade}
											onChange={e =>
												setSiteData({
													...siteData,
													endereco_cidade: e.target.value,
												})
											}
											InputLabelProps={{
												shrink: !!siteData.endereco_cidade || focusedField === "endereco_cidade",
											}}
											onFocus={handleFocus("endereco_cidade")}
											onBlur={handleBlur("endereco_cidade")}
											id="endereco_cidade"
											fullWidth
											margin="normal"
										/>
									</Grid>

									<Grid item xs={12} sm={4}>
										<FormControl fullWidth margin="normal">
											<InputLabel id="endereco_estado_label">UF</InputLabel>
											<Select
												labelId="endereco_estado_label"
												label="UF"
												name="endereco_estado"
												value={siteData.endereco_estado}
												onChange={e =>
													setSiteData({
														...siteData,
														endereco_estado: e.target.value,
													})
												}
												InputLabelProps={{
													shrink: !!siteData.endereco_estado || focusedField === "endereco_estado",
												}}
												onFocus={handleFocus("endereco_estado")}
												onBlur={handleBlur("endereco_estado")}
												id="endereco_estado"
											>
												{ufList?.map((uf, index) => (
													<MenuItem key={index} value={uf}>
														{uf}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={4}>
										<TextField
											label="CEP"
											name="endereco_cep"
											value={siteData.endereco_cep}
											onChange={e =>
												setSiteData({
													...siteData,
													endereco_cep: e.target.value,
												})
											}
											InputLabelProps={{
												shrink: !!siteData.endereco_cep || focusedField === "endereco_cep",
											}}
											onFocus={handleFocus("endereco_cep")}
											onBlur={handleBlur("endereco_cep")}
											id="endereco_cep"
											fullWidth
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
												setSiteData({
													...siteData,
													tipo_equipamento: e.id_tipo_equipamento,
												})
											}
										/>
									</Grid>

									<Grid item xs={12} sm={4}>
										<FormControl fullWidth margin="normal">
											<InputLabel id="nivel_prioridade_label">Prioridade</InputLabel>
											<Select
												label="Prioridade"
												labelId="nivel_prioridade_label"
												name="nivel_prioridade"
												value={siteData.nivel_prioridade}
												onChange={e =>
													setSiteData({
														...siteData,
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
										</FormControl>
									</Grid>
								</Grid>
							</CardContent>
						</BlankCard>
					</Grid>

					{/* Botões */}
					<Grid item xs={12}>
						<BlankCard>
							<CardContent>
								<Button variant="contained" color="primary" sx={{ mr: 1 }} type="submit">
									Cadastrar
								</Button>
								<Button variant="outlined" onClick={handleResetSiteData}>
									Cancelar
								</Button>
							</CardContent>
						</BlankCard>
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	);
};

export default SitesCadastro;
