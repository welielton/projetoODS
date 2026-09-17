import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { state } = useApp();
  const jobs = state.jobs.filter((j) => j.status === "Ativa");
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <p className="eyebrow">Pequenas ações. Novas possibilidades.</p>
              <h1>
                Seu talento pode
                <br />
                <span>mudar uma história.</span>
              </h1>
              <p className="hero-copy">
                Conecte suas habilidades a causas que importam. Encontre
                oportunidades de voluntariado e faça parte de uma transformação
                coletiva.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/vagas" className="btn btn-primary btn-lg">
                  Encontrar minha causa <span aria-hidden="true">↗</span>
                </Link>
                <Link to="/cadastro" className="btn btn-outline-primary btn-lg">
                  Cadastrar meu talento
                </Link>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <span className="ods-label ods-4">ODS 4 · Educação</span>
                <span className="ods-label ods-10">ODS 10 · Igualdade</span>
                <span className="ods-label ods-17">ODS 17 · Parcerias</span>
              </div>
            </div>
            <div className="col-lg-5">
              <div
                className="hero-visual"
                aria-label="Conexão entre voluntários, habilidades e causas sociais"
                role="img"
              >
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="talent-node node-top">
                  Conhecimento <span>Educação & futuro</span>
                </div>
                <div className="connection-core">
                  cv<span>juntos, vamos além</span>
                </div>
                <div className="talent-node node-left">
                  Tempo <span>Presença que importa</span>
                </div>
                <div className="talent-node node-right">
                  Talento <span>Impacto social</span>
                </div>
                <span className="visual-dot dot-one" />
                <span className="visual-dot dot-two" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container stats-section"
        aria-label="Resumo da demonstração"
      >
        <div className="stats-grid">
          {[
            [jobs.length, "oportunidades ativas"],
            [new Set(jobs.map((j) => j.ngo)).size, "instituições ilustrativas"],
            [state.volunteers.length, "talentos cadastrados"],
            [state.applications.length, "candidaturas locais"],
          ].map(([n, label]) => (
            <div key={label}>
              <strong>{n.toString().padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Um caminho simples</p>
            <h2>Da sua habilidade ao impacto.</h2>
          </div>
          <Link to="/sobre">
            Conheça o projeto <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="row g-4">
          {[
            [
              "01",
              "Conte com seu talento",
              "Cadastre sua área de atuação, suas habilidades e sua disponibilidade.",
            ],
            [
              "02",
              "Encontre sua causa",
              "Explore oportunidades por área e modalidade, respeitando sua rotina.",
            ],
            [
              "03",
              "Comece uma conexão",
              "Envie uma candidatura e acompanhe a avaliação no painel.",
            ],
          ].map(([n, title, desc]) => (
            <div className="col-md-4" key={n}>
              <article className="step-card">
                <span>{n}</span>
                <h3 className="h5">{title}</h3>
                <p>{desc}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
      <section className="mission-section">
        <div className="container row mx-auto align-items-center g-4">
          <div className="col-lg-8">
            <p className="eyebrow">Uma rede com propósito</p>
            <h2>
              A mudança começa quando
              <br />a gente se conecta.
            </h2>
            <p>
              Educação de qualidade, inclusão social e parcerias: três objetivos
              que orientam cada oportunidade deste projeto.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <Link className="btn btn-light btn-lg" to="/vagas">
              Explorar oportunidades →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
