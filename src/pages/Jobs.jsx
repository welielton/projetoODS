import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { areas, modalities } from "../data";
import { filterJobs } from "../services/storage";
import JobCard from "../components/JobCard";
import Modal from "../components/Modal";

export default function Jobs() {
  const { state, dispatch } = useApp();
  const [params, setParams] = useSearchParams();
  const search = params.get("busca") || "",
    area = params.get("area") || "",
    modality = params.get("modalidade") || "";
  const [selected, setSelected] = useState(null);
  const [volunteerId, setVolunteerId] = useState("");
  const [message, setMessage] = useState("");
  const jobs = filterJobs(state.jobs, { search, area, modality });
  function filter(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }
  const duplicate =
    selected &&
    state.applications.some(
      (a) => a.jobId === selected.id && a.volunteerId === volunteerId,
    );
  function apply(e) {
    e.preventDefault();
    const volunteer = state.volunteers.find((v) => v.id === volunteerId);
    if (!volunteer || duplicate) return;
    dispatch({
      type: "apply",
      application: {
        id: crypto.randomUUID(),
        jobId: selected.id,
        volunteerId,
        jobTitle: selected.title,
        volunteerName: volunteer.name,
        date: new Date().toISOString(),
        status: "Pendente",
      },
    });
    setMessage(
      `Candidatura para “${selected.title}” enviada. Acompanhe na página Candidaturas.`,
    );
    setSelected(null);
  }
  return (
    <section className="section container">
      <p className="eyebrow">Encontre sua causa</p>
      <h1>Oportunidades para fazer a diferença</h1>
      <p className="lead text-secondary">
        Sua próxima conexão pode começar aqui.
      </p>
      {message && (
        <div role="status" className="alert alert-success">
          {message} <Link to="/candidaturas">Acompanhar</Link>
        </div>
      )}
      <div className="filter-panel row g-3 mb-4">
        <div className="col-lg-5">
          <label className="form-label" htmlFor="search">
            Buscar oportunidades
          </label>
          <input
            id="search"
            className="form-control"
            type="search"
            placeholder="Habilidade, vaga ou instituição"
            value={search}
            onChange={(e) => filter("busca", e.target.value)}
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <label className="form-label" htmlFor="area">
            Área de atuação
          </label>
          <select
            id="area"
            className="form-select"
            value={area}
            onChange={(e) => filter("area", e.target.value)}
          >
            <option value="">Todas as áreas</option>
            {Object.entries(areas).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-6 col-lg-3">
          <label className="form-label" htmlFor="modality">
            Modalidade
          </label>
          <select
            id="modality"
            className="form-select"
            value={modality}
            onChange={(e) => filter("modalidade", e.target.value)}
          >
            <option value="">Todas</option>
            {Object.entries(modalities).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-1 d-flex align-items-end">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setParams({})}
          >
            Limpar
          </button>
        </div>
      </div>
      <p role="status" className="small text-secondary">
        {jobs.length} oportunidade(s) encontrada(s)
      </p>
      <div className="row g-4">
        {jobs.map((job) => (
          <div className="col-md-6 col-xl-4" key={job.id}>
            <JobCard
              job={job}
              onSelect={(j) => {
                setSelected(j);
                setVolunteerId("");
              }}
            />
          </div>
        ))}
      </div>
      {!jobs.length && (
        <div className="empty-state">
          <h2 className="h4">Nenhuma oportunidade encontrada</h2>
          <p>Experimente outra palavra ou remova os filtros.</p>
          <button className="btn btn-primary" onClick={() => setParams({})}>
            Ver todas as vagas
          </button>
        </div>
      )}
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <p className="ngo-name">{selected.ngo}</p>
          <p>{selected.desc}</p>
          <p>
            <strong>Disponibilidade:</strong> {selected.hours}
            <br />
            <strong>Local:</strong> {selected.location}
            <br />
            <strong>Habilidades:</strong> {selected.skills}
          </p>
          <hr />
          {state.volunteers.length ? (
            <form onSubmit={apply}>
              <label htmlFor="candidate" className="form-label">
                Escolha seu cadastro de demonstração
              </label>
              <select
                id="candidate"
                className="form-select mb-3"
                required
                value={volunteerId}
                onChange={(e) => setVolunteerId(e.target.value)}
              >
                <option value="">Selecione um voluntário</option>
                {state.volunteers.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              {duplicate && (
                <p role="status" className="alert alert-info">
                  Você já se candidatou a esta vaga.
                </p>
              )}
              <button
                disabled={!volunteerId || duplicate}
                className="btn btn-primary w-100"
              >
                Confirmar candidatura
              </button>
            </form>
          ) : (
            <>
              <p>Cadastre seu talento antes de se candidatar.</p>
              <Link className="btn btn-primary" to="/cadastro">
                Fazer meu cadastro
              </Link>
            </>
          )}
        </Modal>
      )}
    </section>
  );
}
