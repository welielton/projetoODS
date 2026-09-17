import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { areas, modalities } from "../data";
import { normalize } from "../services/storage";

export default function Talents() {
  const { state } = useApp();
  const [search, setSearch] = useState("");
  const volunteers = state.volunteers.filter((v) =>
    normalize(`${v.name} ${v.skills} ${v.city} ${areas[v.area]}`).includes(
      normalize(search),
    ),
  );
  return (
    <section className="section container">
      <p className="eyebrow">Uma rede de possibilidades</p>
      <h1>Banco de talentos</h1>
      <p className="lead text-secondary">
        Conheça os perfis de demonstração cadastrados neste navegador.
      </p>
      <label htmlFor="talent-search" className="form-label">
        Buscar por nome, habilidade, cidade ou área
      </label>
      <input
        type="search"
        id="talent-search"
        className="form-control mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p role="status">{volunteers.length} talento(s) encontrado(s)</p>
      <div className="row g-4">
        {volunteers.map((v) => (
          <div key={v.id} className="col-md-6 col-lg-4">
            <article className="opportunity-card">
              <span className="pill align-self-start mb-3">
                {areas[v.area]}
              </span>
              <h2 className="h5">{v.name}</h2>
              <p>
                {v.city} / {v.uf}
              </p>
              <p>{v.skills}</p>
              <p className="small text-secondary">
                {modalities[v.modality]} · {v.hours}h/semana
              </p>
              {v.motivation && (
                <p className="border-top pt-3">{v.motivation}</p>
              )}
            </article>
          </div>
        ))}
      </div>
      {!volunteers.length && (
        <div className="empty-state">
          <p>Nenhum perfil encontrado.</p>
          <Link className="btn btn-primary" to="/cadastro">
            Cadastrar talento
          </Link>
        </div>
      )}
    </section>
  );
}
