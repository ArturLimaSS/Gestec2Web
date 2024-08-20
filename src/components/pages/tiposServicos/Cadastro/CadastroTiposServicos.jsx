import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTiposServicosStore } from "../../../../zustand/TiposServicos/TiposServicosStore";
import { useAuthStore } from "../../../../zustand/Auth/AuthStore";
import { useSnackbar } from "notistack";

export const CadastroTipoServico = () => {
	const [fullWidth, setFullWidth] = useState(true);
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const [tipoServicoData, setTipoServicoData] = useState({
		empresa_id: "",
		nome_tipo_servico: "",
		descricao_tipo_servico: "",
	});

	const { empresa } = useAuthStore(store => ({
		empresa: store.empresa,
	}));

	useEffect(() => {
		setTipoServicoData({ ...tipoServicoData, empresa_id: empresa.empresa_id });
	}, [empresa]);

	useEffect(() => {
		console.log(tipoServicoData);
	}, [tipoServicoData]);

	const handleClose = () => {
		setOpen(false);
	};

	const { createTipoServico, fetchTiposServicos } = useTiposServicosStore(store => ({
		createTipoServico: store.createTipoServico,
		fetchTiposServicos: store.fetchTiposServicos,
	}));

	const { enqueueSnackbar } = useSnackbar();
	const handleCreate = async e => {
		e.preventDefault();
		const response = await createTipoServico(tipoServicoData);
		if (response.status == 201) {
			enqueueSnackbar("Tipo de Serviço cadastrado com sucesso!", {
				variant: "success",
			});
			fetchTiposServicos();
			handleClose();
			setTipoServicoData({});
		} else {
			enqueueSnackbar("Ocorreu um erro ao cadastrar o tipo de serviço!", {
				variant: "error",
			});
		}
	};
	return (
		<>
			<Button onClick={handleClickOpen} variant="contained">
				Cadastro de Tipo de Serviço
			</Button>
			<Dialog fullWidth={fullWidth} maxWidth="md" open={open}>
				<form onSubmit={handleCreate}>
					<DialogContent>
						<DialogTitle>Cadastro de novo Tipo de Serviço</DialogTitle>
						<Divider />
						<Grid
							sx={{
								marginTop: 3,
								display: "flex",
								flexDirection: "column",
							}}
							container
							spacing={3}
						>
							<Grid fullWidth item xs={12}>
								<TextField
									value={tipoServicoData.nome_tipo_servico}
									onChange={e =>
										setTipoServicoData({
											...tipoServicoData,
											nome_tipo_servico: e.target.value,
										})
									}
									fullWidth
									name="nome"
									id=""
									label="Nome"
								></TextField>
							</Grid>
							<Grid fullWidth item xs={12}>
								<TextField
									multiline={true}
									fullWidth
									value={tipoServicoData.descricao_tipo_servico}
									onChange={e =>
										setTipoServicoData({
											...tipoServicoData,
											descricao_tipo_servico: e.target.value,
										})
									}
									name="descricao"
									id="descricao"
									label="Descrição"
								></TextField>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Fechar</Button>
						<Button variant="contained" color="primary" type="submit">
							Salvar
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};
