import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useState } from "react";

export const CadastroTipoServico = () => {
  const [fullWidth, setFullWidth] = useState(true);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleClickOpen} variant="contained">
        Cadastro de questionário
      </Button>
      <Dialog fullWidth={fullWidth} maxWidth="xl" open={open}>
        <DialogContent>
          <DialogTitle>Cadastro de novo Questionário</DialogTitle>
          <Divider />
          {/* Formulário */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
