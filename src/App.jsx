import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import Management from "./pages/Management";
import Applications from "./pages/Applications";
import Talents from "./pages/Talents";
import About from "./pages/About";
import Institution from "./pages/Institution";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="vagas" element={<Jobs />} />
            <Route path="cadastro" element={<Register />} />
            <Route path="gestao" element={<Management />} />
            <Route path="candidaturas" element={<Applications />} />
            <Route path="talentos" element={<Talents />} />
            <Route path="sobre" element={<About />} />
            <Route path="instituicao" element={<Institution />} />
            <Route path="login" element={<Navigate to="/cadastro" replace />} />
            <Route
              path="*"
              element={
                <section className="section container">
                  <h1>Página não encontrada</h1>
                  <Link to="/">Voltar ao início</Link>
                </section>
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
