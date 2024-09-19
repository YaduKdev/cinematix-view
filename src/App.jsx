import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Routes/Home/Home";
import Movies from "./Routes/Movies/Movies";
import Admin from "./Routes/Admin/Admin";
import Auth from "./Routes/Auth/Auth";

function App() {
  return (
    <>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
