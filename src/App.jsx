import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Movies from "./Routes/Movies/Movies";
import Admin from "./Routes/Admin/Admin";
import Auth from "./Routes/Auth/Auth";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey, red } from "@mui/material/colors";

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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </section>
      </ThemeProvider>
    </>
  );
}

export default App;
