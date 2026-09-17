import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Modal from "../components/Modal";
import { areas, modalities } from "../data";

export default function Applications() {
  const { state, dispatch } = useApp();
  const [volunteerId, setVolunteerId] = useState("");
  const [cancel, setCancel] = useState(null);
  const volunteer = state.volunteers.find((v) => v.id === volunteerId);
  const applications = state.applications.filter(
    (a) => !volunteerId || a.volunteerId === volunteerId,
  );
  return (
    <section className="section container">
      <p className="eyebrow">Acompanhe suas conexões</p>
      <h1>Candidaturas</h1>
      <p className="lead text-secondary">
        Consulte o andamento das inscrições realizadas neste navegador.
      </p>
      <div className="mb-4">
        <label htmlFor="application-volunteer" className="form-label">
          Filtrar por voluntário
        </label>
        <select
          id="application-volunteer"
          className="form-select filter-select"
          value={volunteerId}
          onChange={(e) => setVolunteerId(e.target.value)}
        >
          <option value="">Todos os cadastros locais</option>
          {state.volunteers.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
      {volunteer && (
        <section
          className="form-panel mb-4"
          aria-labelledby="volunteer-profile"
        >
          <h2 id="volunteer-profile" className="h4">
            Cadastro de {volunteer.name}
          </h2>
          <dl className="review-grid mb-0">
            <dt>Área de atuação</dt>
            <dd>{areas[volunteer.area] || volunteer.area}</dd>
            <dt>Habilidades</dt>
            <dd>{volunteer.skills}</dd>
            <dt>Localização</dt>
            <dd>
              {volunteer.city} / {volunteer.uf}
            </dd>
            <dt>Modalidade preferida</dt>
            <dd>{modalities[volunteer.modality] || "Não informada"}</dd>
            <dt>Horas por semana</dt>
            <dd>{volunteer.hours || "Não informadas"}</dd>
          </dl>
        </section>
      )}
      <p role="status">{applications.length} candidatura(s) encontrada(s)</p>
      <div className="row g-3">
        {applications.map((a) => {
          const job = state.jobs.find((j) => j.id === a.jobId);
          return (
            <div key={a.id} className="col-md-6">
              <article className="opportunity-card">
                <span className={`status-badge status-${a.status}`}>
                  {a.status}
                </span>
                <h2 className="h5 mt-3">{a.jobTitle}</h2>
                {job && (
                  <>
                    <p className="ngo-name">{job.ngo}</p>
                    <p>{job.desc}</p>
                    <dl>
                      <dt>Área da vaga</dt>
                      <dd>{areas[job.area] || job.area}</dd>
                      <dt>Modalidade e local</dt>
                      <dd>
                        {modalities[job.modality]} · {job.location}
                      </dd>
                      <dt>Disponibilidade</dt>
                      <dd>{job.hours}</dd>
                    </dl>
                  </>
                )}
                <p>
                  {a.volunteerName} ·{" "}
                  {new Date(a.date).toLocaleDateString("pt-BR")}
                </p>
                <button
                  className="btn btn-outline-danger align-self-start"
                  onClick={() => setCancel(a)}
                >
                  Cancelar candidatura
                </button>
              </article>
            </div>
          );
        })}
      </div>
      {!applications.length && (
        <div className="empty-state">
          <h2 className="h4">Nenhuma candidatura enviada</h2>
          <p>
            {volunteer
              ? `${volunteer.name} possui um perfil cadastrado, mas não tem candidaturas registradas neste navegador.`
              : "Não há candidaturas registradas neste navegador."}
          </p>
          <p>
            O cadastro no banco de talentos não inscreve automaticamente em uma
            vaga. Para participar, explore as vagas, clique em “Ver vaga e
            candidatar-se”, selecione o voluntário e confirme a candidatura.
          </p>
          <Link to="/vagas" className="btn btn-primary">
            Explorar vagas
          </Link>
        </div>
      )}
      {cancel && (
        <Modal title="Cancelar candidatura?" onClose={() => setCancel(null)}>
          <p>
            A inscrição de {cancel.volunteerName} em {cancel.jobTitle} será
            removida.
          </p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch({ type: "cancel", id: cancel.id });
              setCancel(null);
            }}
          >
            Confirmar cancelamento
          </button>
        </Modal>
      )}
    </section>
  );
}
