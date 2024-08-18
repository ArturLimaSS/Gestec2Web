import { AttachFile } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import ProductList from "../../apps/ecommerce/productGrid/ProductList";

export const DialogAnexos = () => {
	const params = useParams();
	const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Button
				onClick={handleClickOpen}
				variant="contained"
				color="primary"
				sx={{
					width: "120px",
					paddingX: 3,
					paddingY: 2,
				}}
				startIcon={<AttachFile />}
			>
				<Typography variant="h6">Anexos</Typography>
			</Button>
			<Dialog fullScreen={isMd} fullWidth open={open} onClose={handleClose}>
				<DialogTitle>Anexos</DialogTitle>
				<DialogContent>
					<ProductList />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Fechar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
