import { UploadFile } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useUploadStore } from "../../../zustand/Uploader/UploadStore";
import { useSnackbar, closeSnackbar } from "notistack";
import { useParams } from "react-router";
import { useAlert } from "../../../context/useAlert";

export const DialogAnexos = ({ setOpenMenu }) => {
	const fileInputRef = useRef(null); // Referência para o input
	const [open, setOpen] = useState(false);
	const params = useParams();
	const atividade_id = params.atividade_id;
	const { upload, fetchFiles } = useUploadStore(store => ({
		upload: store.upload,
		fetchFiles: store.fetchFiles,
	}));

	const { show } = useAlert();

	useEffect(() => {
		fetchFiles(atividade_id);
	}, []);

	const { enqueueSnackbar } = useSnackbar();

	const handleUpload = async () => {
		show(null, "loading");

		if (!description) {
			show("Descrição da imagem é obrigatório", "error");
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		formData.append("descricao", description);
		formData.append("atividade_id", atividade_id);
		formData.append("nome_arquivo", file.name);
		const response = await upload(formData);
		if (response.status == 200) {
			show(response.data.message, "success");
			fetchFiles(atividade_id);
			setFile(null);
			setDescription("");
			handleClose();
		} else {
			show(response.data.message, "error");
		}
	};
	const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click(); // Aciona o clique no input
		}
	};

	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	const [preview, setPreview] = useState(null);
	const handleFileChange = event => {
		const file = event.target.files[0];
		if (file) {
			setFile(file); // Salva o arquivo para uso posterior
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result); // Salva a preview do arquivo
			};
			reader.readAsDataURL(file); // Lê o arquivo e salva a preview
			setOpen(true); // Abre o modal quando um arquivo é selecionado
		}
	};

	const handleClose = () => {
		setOpen(false); // Fecha o modal
		setOpenMenu(true);
	};

	return (
		<>
			<Button
				onClick={handleClick}
				role={undefined}
				variant="contained"
				color="primary"
				sx={{
					width: "120px",
					paddingX: 3,
					paddingY: 2,
				}}
				startIcon={<UploadFile />}
			>
				<Typography variant="h6">Anexos</Typography>
			</Button>
			<input
				ref={fileInputRef}
				type="file"
				style={{ display: "none" }} // Oculta o input
				onChange={handleFileChange}
			/>
			<Dialog fullScreen={isMd} fullWidth maxWidth={"lg"} open={open} onClose={handleClose}>
				<DialogTitle>Anexos</DialogTitle>
				<DialogContent>
					<Card>
						<CardHeader title={<TextField label="Título da Imagem" onChange={e => setDescription(e.target.value)} fullWidth></TextField>}></CardHeader>
						<CardContent>{preview && <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: "700px", objectFit: "contain" }} />}</CardContent>
					</Card>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Fechar
					</Button>

					<Button variant="contained" onClick={handleUpload} color="success">
						Salvar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
