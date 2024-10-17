import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, InputLabel, TextField, Typography } from "@mui/material";
import { useTipoAcesso } from "../../zustand/TipoAcesso/tipoAcessoStore";
import { useAlert } from "../../context/useAlert";
import { useTipoChave } from "../../zustand/TipoChave/tipoChaveStore";

export const CadastroTipoChave = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const { show } = useAlert();

	const handleClose = () => {
		setOpenDialog(false);
	};

	const [tipoChaveData, setTipoChaveData] = useState({
		tipo_chave_nome: "",
		tipo_chave_descricao: "",
	});

	const { cadastraTipoChave, fetchTipoChave } = useTipoChave(store => store);

	const handleSubmit = async () => {
		show(null, "loading");
		const response = await cadastraTipoChave(tipoChaveData);
		if (response.status == 201) {
			show("Tipo de acesso cadastrado com sucesso!", "success");
			setTimeout(() => {
				handleClose();
				fetchTipoChave();
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
					<Typography>{"Cadastrar novo tipo de chave"}</Typography>
				</Button>
			</Box>
			<Dialog onBackdropClick="false" maxWidth="sm" fullWidth open={openDialog} onClose={handleClose}>
				<DialogContent>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
					>
						<Box>
							<InputLabel id="nome_tipo_label">Nome do Tipo da chave</InputLabel>
							<TextField onChange={e => setTipoChaveData({ ...tipoChaveData, tipo_chave_nome: e.target.value })} fullWidth labelId="nome_tipo_label"></TextField>
						</Box>
						<Box>
							<InputLabel id="descricao_tipo_label">Descrição</InputLabel>
							<TextField onChange={e => setTipoChaveData({ ...tipoChaveData, tipo_chave_descricao: e.target.value })} fullWidth labelId="descricao_tipo_label"></TextField>
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
