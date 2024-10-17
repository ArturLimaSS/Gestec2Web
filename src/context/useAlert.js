import { createContext, useContext } from "react";
import { useSnackbar } from "notistack";
import { Box, CircularProgress, Typography } from "@mui/material";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const show = (message = "", type = "info") => {

    enqueueSnackbar(
      <Box sx={{
        display: "flex",
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
      }}>
        {type == "loading" && <CircularProgress />}
        <Typography variant="h6" sx={{
          fontWeight: "bold",
        }}>{type == "loading" ? "Processando..." : message}</Typography>
      </Box>,
      {
        variant: type === "loading" ? "" : type, // 'info' como fallback para 'loading'
        autoHideDuration: 3000,
        onClose: () => closeSnackbar(),
      }
    );
  };

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
