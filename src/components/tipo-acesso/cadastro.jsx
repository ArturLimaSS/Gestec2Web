import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, InputLabel, TextField, Typography } from "@mui/material";
import { useTipoAcesso } from "../../zustand/TipoAcesso/tipoAcessoStore";
import { useAlert } from "../../context/useAlert";

export const CadastroTipoAcesso = () => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const { show } = useAlert();

	const handleClose = () => {
		setOpen(false);
	};

	const [tipoAcessoData, setTipoAcessoData] = useState({
		tipo_acesso_nome: "",
		tipo_acesso_descricao: "",
	});

	const { cadastraTipoAcesso, fetchTipoAcessos } = useTipoAcesso(store => store);

	const handleSubmit = async () => {
		show(null, "loading");
		const response = await cadastraTipoAcesso(tipoAcessoData);
		if (response.status == 201) {
			show("Tipo de acesso cadastrado com sucesso!", "success");
			setTimeout(() => {
				handleClose();
				fetchTipoAcessos();
			}, 1500);
		} else {
			show("Ocorreu um erro ao cadastrar o tipo de acesso!", "error");
		}
	};
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",

					paddingTop: "1.125rem",
					paddingLeft: "1.125rem",
					paddingRight: "1.125rem",
				}}
			>
				<Button onClick={handleClickOpen}>
					<Typography>{"Cadastrar novo tipo de acesso"}</Typography>
				</Button>
			</Box>
			<Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
					>
						<Box>
							<InputLabel id="nome_tipo_label">Nome do Tipo de acesso</InputLabel>
							<TextField onChange={e => setTipoAcessoData({ ...tipoAcessoData, tipo_acesso_nome: e.target.value })} fullWidth labelId="nome_tipo_label"></TextField>
						</Box>
						<Box>
							<InputLabel id="descricao_tipo_label">Descrição</InputLabel>
							<TextField onChange={e => setTipoAcessoData({ ...tipoAcessoData, tipo_acesso_descricao: e.target.value })} fullWidth labelId="descricao_tipo_label"></TextField>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="error" onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant="contained" color="success" onClick={handleSubmit}>
						Cadastrar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
