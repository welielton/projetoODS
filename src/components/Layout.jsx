import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const links = [
  ["/vagas", "Encontrar vagas"],
  ["/cadastro", "Ser voluntário"],
  ["/candidaturas", "Candidaturas"],
  ["/gestao", "Gestão"],
  ["/sobre", "Sobre & ODS"],
];
export default function Layout() {
  const [open, setOpen] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [font, setFont] = useState(100);
  const location = useLocation();
  const { warning, clearWarning } = useApp();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    document.getElementById("main-content")?.focus();
    const name =
      links.find(([path]) => path === location.pathname)?.[1] ||
      "Conecte suas habilidades";
    document.title = `${name} | Conecta Voluntário`;
  }, [location.pathname]);
  useEffect(() => {
    document.documentElement.style.fontSize = `${font}%`;
  }, [font]);
  return (
    <div className={contrast ? "app high-contrast" : "app"}>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Pular para o conteúdo
      </a>
      <div className="access-bar">
        <div className="container d-flex justify-content-between align-items-center gap-2">
          <span>Projeto acadêmico · ODS 4, 10 e 17</span>
          <div className="d-flex gap-2">
            <button
              aria-label="Diminuir fonte"
              onClick={() => setFont((n) => Math.max(90, n - 10))}
            >
              A−
            </button>
            <button
              aria-label="Aumentar fonte"
              onClick={() => setFont((n) => Math.min(130, n + 10))}
            >
              A+
            </button>
            <button
              aria-pressed={contrast}
              onClick={() => setContrast((v) => !v)}
            >
              Contraste
            </button>
          </div>
        </div>
      </div>
      <header className="site-header">
        <nav
          className="container navbar navbar-expand-lg"
          aria-label="Navegação principal"
        >
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <span className="logo-mark" aria-hidden="true">
              cv
            </span>
            <span>
              Conecta<span className="brand-light"> Voluntário</span>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            id="main-menu"
            className={`collapse navbar-collapse justify-content-end ${open ? "show" : ""}`}
          >
            <ul className="navbar-nav gap-lg-2">
              {links.map(([to, label]) => (
                <li className="nav-item" key={to}>
                  <NavLink to={to} className="nav-link">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
      <main id="main-content" tabIndex="-1">
        {warning && (
          <div role="alert" className="container alert alert-warning mt-3">
            {warning}{" "}
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={clearWarning}
            >
              Entendi
            </button>
          </div>
        )}
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6">
              <h2 className="h5">Conecta Voluntário</h2>
              <p>Habilidades que aproximam. Conexões que transformam.</p>
              <p className="small mb-0">
                Demonstração acadêmica. Vagas e instituições ilustrativas;
                cadastros e candidaturas ficam somente neste navegador. Use
                dados fictícios.
              </p>
            </div>
            <div className="col-lg-3">
              <h2 className="h6">Explore</h2>
              <Link to="/talentos">Banco de talentos</Link>
              <Link to="/instituicao">Instituição parceira</Link>
              <Link to="/sobre">Sobre o projeto</Link>
            </div>
            <div className="col-lg-3">
              <h2 className="h6">Entrega acadêmica</h2>
              <a href="entrega/apresentacao.pdf">Slides em PDF</a>
              <a href="entrega/apresentacao.pptx">Slides editáveis</a>
              <a href="entrega/codigo-fonte.zip">Código-fonte completo</a>
            </div>
          </div>
          <div className="footer-bottom">
            Desenvolvimento Web · UEMA / PROFITEC · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
