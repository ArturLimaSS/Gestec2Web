import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeSettings } from "./theme/Theme";
import RTL from "./layouts/full/shared/customizer/RTL";
import ScrollToTop from "./components/shared/ScrollToTop";
import Router from "./routes/Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAuthStore } from "./zustand/Auth/AuthStore";
import { useEffect } from "react";
import { PublicRoutes } from "./routes/PublicRoutes";
import { SnackbarProvider } from "notistack";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { checkLogin, isLogged } = useAuthStore(store => ({
    checkLogin: store.checkLogin,
    isLogged: store.isLogged,
  }));

  useEffect(() => {
    if (token && location.pathname !== "/") {
      checkLogin(navigate);
    }
  }, []);

  const loggedRouter = isLogged || token ? Router : PublicRoutes;

  const routing = useRoutes(loggedRouter);
  const theme = ThemeSettings();
  const customizer = useSelector(state => state.customizer);

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <SnackbarProvider>
          <CssBaseline />
          <ScrollToTop>{routing}</ScrollToTop>
        </SnackbarProvider>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
