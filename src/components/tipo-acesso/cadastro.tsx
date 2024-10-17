import React from "react";
import { Box, Button, Typography } from "@mui/material";

export const CadastroTipoAcesso = () => {
	return (
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
			<Button>
				<Typography>{"Cadastrar novo tipo de acesso"}</Typography>
			</Button>
		</Box>
	);
};
