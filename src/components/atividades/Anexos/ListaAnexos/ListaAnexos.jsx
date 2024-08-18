import React, { useEffect, useState } from "react";
import { filter, orderBy } from "lodash";
import {
	Box,
	Grid,
	Stack,
	CardContent,
	useMediaQuery,
	Typography,
	Rating,
	Fab,
	Tooltip,
	Button,
	Skeleton,
	CardMedia,
	Card,
	Menu,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addToCart, filterReset } from "../../../../store/apps/eCommerce/EcommerceSlice";

import { IconBasket, IconMenu2 } from "@tabler/icons";

import emptyCart from "src/assets/images/products/empty-shopping-cart.svg";
import BlankCard from "../../../shared/BlankCard";
import PageContainer from "../../../container/PageContainer";
import Breadcrumb from "../../../../layouts/full/shared/breadcrumb/Breadcrumb";
import AppCard from "../../../shared/AppCard";
import { useUploadStore } from "../../../../zustand/Uploader/UploadStore";
import { baseImageUrl } from "../../../../constants/endpoint";
import { MoreVert, OpenInNewTwoTone } from "@mui/icons-material";
import { useSnackbar, closeSnackbar } from "notistack";

const ListaAnexos = () => {
	const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));
	const { enqueueSnackbar } = useSnackbar();
	const { arquivos, isLoading, deletaArquivo, atualizaArquivo } = useUploadStore(store => ({
		arquivos: store.arquivos,
		isLoading: store.isLoading,
		deletaArquivo: store.deletaArquivo,
		atualizaArquivo: store.atualizaArquivo,
	}));

	const [arquivosComUrl, setArquivosComUrl] = useState([]);
	useEffect(() => {
		const novoArray = arquivos?.map(arquivo => ({
			...arquivo,
			url: baseImageUrl + arquivo.caminho_arquivo,
		}));

		setArquivosComUrl(novoArray);
	}, [arquivos]);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedArquivo, setSelectedArquivo] = useState({});
	const handleOpenMenu = event => {
		setAnchorEl(event.currentTarget);
		console.log(event.currentTarget);
	};

	const open = Boolean(anchorEl);

	const handleCloseMenu = () => setAnchorEl(null);

	const [openDialogAnexo, setOpenDialogAnexo] = useState(false);
	const handleOpenDialogAnexo = () => setOpenDialogAnexo(true);
	const handleCloseDialogAnexo = () => {
		setOpenDialogAnexo(false);
		setAnchorEl(null);
	};

	const updateAnexo = async () => {
		enqueueSnackbar(
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					gap: 1,
					justifyContent: "center",
					alignItems: "center",
					color: "#fff",
				}}
			>
				<CircularProgress
					sx={{
						color: "#fff",
					}}
				/>{" "}
				<Typography> Atualizando...</Typography>
			</Box>
		);

		const response = await atualizaArquivo(selectedArquivo);
		if (response.status === 200) {
			closeSnackbar();
			enqueueSnackbar("Arquivo atualizado com sucesso!", { variant: "success" });
			handleCloseDialogAnexo();
			setSelectedArquivo({});
		} else {
			enqueueSnackbar("Ocorreu um erro ao atualizar o arquivo!", { variant: "error" });
		}
	};

	const excluirArquivo = async () => {
		enqueueSnackbar(
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					gap: 1,
					justifyContent: "center",
					alignItems: "center",
					color: "#fff",
				}}
			>
				<CircularProgress
					sx={{
						color: "#fff",
					}}
				/>{" "}
				<Typography> Atualizando...</Typography>
			</Box>
		);
		const response = await deletaArquivo(selectedArquivo.anexo_id);
		if (response.status === 200) {
			closeSnackbar();
			enqueueSnackbar("Arquivo excluído com sucesso!", { variant: "success" });
			handleCloseDialogAnexo();
			setSelectedArquivo({});
		} else {
			enqueueSnackbar("Ocorreu um erro ao excluir o arquivo!", { variant: "error" });
		}
	};

	return (
		<>
			<PageContainer title="Shop List" description="this is Shop List page">
				<Box>
					<CardContent>
						<Box>
							<Grid container spacing={3}>
								{arquivosComUrl && arquivosComUrl.length > 0 ? (
									<>
										{arquivosComUrl.map(arquivo => (
											<Grid item xs={12} xl={3} lg={4} md={4} sm={12} display="flex" alignItems="stretch" key={arquivo.id}>
												<BlankCard>
													<Typography>
														{isLoading || !arquivo.url ? (
															<>
																<Skeleton variant="square" width={270} height={300}></Skeleton>
															</>
														) : (
															<CardMedia width={270} height={300} component="img" image={arquivo.url} alt={arquivo.descricao} />
														)}
														;
													</Typography>
													<Tooltip title="Opções">
														<Fab
															onClick={e => {
																handleOpenMenu(e);
																setSelectedArquivo(arquivo);
															}}
															value={arquivo}
															size="small"
															sx={{ bottom: "15px", right: "15px", position: "absolute" }}
														>
															<MoreVert size="16" />
														</Fab>
													</Tooltip>
													<CardContent sx={{ p: 3, pt: 2 }}>
														<Typography variant="h6">{arquivo.descricao}</Typography>
													</CardContent>
												</BlankCard>
											</Grid>
										))}
									</>
								) : (
									<>
										<Grid item xs={12} lg={12} md={12} sm={12}>
											<Box textAlign="center" mt={6}>
												<img src={emptyCart} alt="cart" width="200px" />
												<Typography variant="h2">There is no Product</Typography>
												<Typography variant="h6" mb={3}>
													The Product you are searching is no longer available.
												</Typography>
												<Button variant="contained" onClick={() => dispatch(filterReset())}>
													Try Again
												</Button>
											</Box>
										</Grid>
									</>
								)}
							</Grid>
						</Box>
					</CardContent>
				</Box>
			</PageContainer>
			<Menu open={open} anchorEl={anchorEl} onClose={handleCloseMenu}>
				<MenuItem onClick={handleOpenDialogAnexo}>Visualizar/Editar</MenuItem>
				<MenuItem onClick={excluirArquivo}>Excluir</MenuItem>
			</Menu>

			<Dialog fullWidth maxWidth="xl" fullScreen={isMd} open={openDialogAnexo} onClose={handleCloseDialogAnexo}>
				<DialogTitle>Visualizar/Editar Anexo - {selectedArquivo?.descricao}</DialogTitle>
				<DialogContent>
					<BlankCard>
						<CardContent
							sx={{
								padding: "1",
							}}
						>
							<TextField label="Descrição" value={selectedArquivo?.descricao} onChange={e => setSelectedArquivo({ ...selectedArquivo, descricao: e.target.value })} fullWidth />
							<Box
								sx={{
									marginTop: 1,
									overflow: isMd ? "scroll" : "hidden",
								}}
							>
								<img src={selectedArquivo?.url} alt={selectedArquivo?.descricao} height="100%" width={"100%"} />
							</Box>
						</CardContent>
					</BlankCard>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialogAnexo}>Fechar</Button>
					<Button color="secondary" onClick={updateAnexo} variant="contained">
						Salvar alterações
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ListaAnexos;
