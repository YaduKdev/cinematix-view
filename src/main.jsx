import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey, red } from "@mui/material/colors";

import "./main.css";

axios.defaults.baseURL = "http://localhost:5000";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: grey[50],
        },
        secondary: {
          main: grey[900],
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: grey[900],
        },
        secondary: {
          main: grey[50],
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={2000}
          >
            <App />
          </SnackbarProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
