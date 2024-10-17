import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/Store";
import Spinner from "./views/spinner/Spinner";
import "./_mockApis";
import "./utils/i18n";
import { AlertProvider } from "./context/useAlert";
import { CircularProgress } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<Suspense fallback={<CircularProgress />}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Suspense>
	</Provider>
);
