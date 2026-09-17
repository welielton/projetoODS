import { useState } from "react";
import { useApp } from "../context/AppContext";
import { areas, modalities } from "../data";
import Modal from "../components/Modal";

const blank = {
  title: "",
  ngo: "",
  ods: "ODS 4: Educação de Qualidade",
  area: "educacao",
  modality: "remoto",
  hours: "2h/semana",
  location: "Brasil (Online)",
  skills: "",
  desc: "",
  status: "Ativa",
};
export default function Management() {
  const { state, dispatch } = useApp();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState("jobs");
  function save(e) {
    e.preventDefault();
    const job = Object.fromEntries(
      Object.entries(editing).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ]),
    );
    if (
      ["title", "ngo", "skills", "desc", "hours", "location"].some(
        (k) => !job[k],
      )
    )
      return;
    dispatch({
      type: "saveJob",
      job: { ...job, id: job.id || crypto.randomUUID() },
    });
    setNotice(
      job.id ? "Vaga atualizada com sucesso." : "Vaga criada com sucesso.",
    );
    setEditing(null);
  }
  const update = (e) =>
    setEditing((j) => ({ ...j, [e.target.name]: e.target.value }));
  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Organizar para transformar</p>
          <h1>Painel de gestão</h1>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setEditing({ ...blank })}
        >
          + Nova vaga
        </button>
      </div>
      <p className="text-secondary">
        Área demonstrativa aberta, sem autenticação. As alterações afetam apenas
        os dados deste navegador.
      </p>
      {notice && (
        <p className="alert alert-success" role="status">
          {notice}
        </p>
      )}
      <div className="dashboard-stats">
        {[
          [
            state.jobs.filter((j) => j.status === "Ativa").length,
            "Vagas ativas",
          ],
          [state.volunteers.length, "Voluntários"],
          [
            state.applications.filter((a) => a.status === "Pendente").length,
            "Candidaturas pendentes",
          ],
        ].map(([n, label]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{n}</strong>
          </div>
        ))}
      </div>
      <div
        className="d-flex flex-wrap gap-2 my-4"
        aria-label="Selecionar seção"
      >
        {[
          ["jobs", "Vagas"],
          ["applications", "Solicitações"],
          ["volunteers", "Voluntários"],
        ].map(([key, label]) => (
          <button
            key={key}
            aria-pressed={tab === key}
            className={`btn ${tab === key ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="table-responsive data-panel">
        <table className="table align-middle mb-0">
          <caption className="visually-hidden">
            {tab === "jobs"
              ? "Gerenciamento de vagas"
              : tab === "applications"
                ? "Avaliação de candidaturas"
                : "Voluntários cadastrados"}
          </caption>
          <thead>
            <tr>
              {(tab === "jobs"
                ? ["Vaga / instituição", "Modalidade", "Status", "Ações"]
                : tab === "applications"
                  ? ["Voluntário / vaga", "Data", "Status", "Avaliação"]
                  : ["Nome / e-mail", "Localização", "Área", "Ações"]
              ).map((label) => (
                <th key={label} scope="col">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tab === "jobs" &&
              state.jobs.map((j) => (
                <tr key={j.id}>
                  <td>
                    <strong>{j.title}</strong>
                    <small className="d-block text-secondary">{j.ngo}</small>
                  </td>
                  <td>{modalities[j.modality]}</td>
                  <td>
                    <span className="pill">{j.status}</span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        aria-label={`Editar ${j.title}`}
                        onClick={() => setEditing({ ...j })}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        aria-label={`Excluir ${j.title}`}
                        onClick={() =>
                          setDeleting({
                            type: "deleteJob",
                            id: j.id,
                            name: j.title,
                          })
                        }
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {tab === "applications" &&
              state.applications.map((a) => (
                <tr key={a.id}>
                  <td>
                    <strong>{a.volunteerName}</strong>
                    <small className="d-block text-secondary">
                      {a.jobTitle}
                    </small>
                  </td>
                  <td>{new Date(a.date).toLocaleDateString("pt-BR")}</td>
                  <td>{a.status}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        disabled={a.status === "Aprovada"}
                        className="btn btn-sm btn-outline-success"
                        aria-label={`Aprovar candidatura de ${a.volunteerName}`}
                        onClick={() => {
                          dispatch({
                            type: "status",
                            id: a.id,
                            status: "Aprovada",
                          });
                          setNotice("Candidatura aprovada.");
                        }}
                      >
                        Aprovar
                      </button>
                      <button
                        disabled={a.status === "Recusada"}
                        className="btn btn-sm btn-outline-danger"
                        aria-label={`Recusar candidatura de ${a.volunteerName}`}
                        onClick={() => {
                          dispatch({
                            type: "status",
                            id: a.id,
                            status: "Recusada",
                          });
                          setNotice("Candidatura recusada.");
                        }}
                      >
                        Recusar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {tab === "volunteers" &&
              state.volunteers.map((v) => (
                <tr key={v.id}>
                  <td>
                    <strong>{v.name}</strong>
                    <small className="d-block text-secondary">{v.email}</small>
                  </td>
                  <td>
                    {v.city} / {v.uf}
                  </td>
                  <td>{areas[v.area]}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      aria-label={`Excluir ${v.name}`}
                      onClick={() =>
                        setDeleting({
                          type: "deleteVolunteer",
                          id: v.id,
                          name: v.name,
                        })
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            {!(
              tab === "jobs"
                ? state.jobs
                : tab === "applications"
                  ? state.applications
                  : state.volunteers
            ).length && (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  Nenhum registro nesta seção.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editing && (
        <Modal
          title={editing.id ? "Editar vaga" : "Nova oportunidade"}
          onClose={() => setEditing(null)}
        >
          <form onSubmit={save}>
            <div className="row g-3">
              {[
                ["title", "Título da vaga"],
                ["ngo", "Instituição"],
                ["hours", "Carga horária"],
                ["location", "Localização"],
                ["skills", "Habilidades (separadas por vírgulas)"],
              ].map(([key, label]) => (
                <div
                  key={key}
                  className={
                    key === "title" || key === "skills" ? "col-12" : "col-sm-6"
                  }
                >
                  <label className="form-label" htmlFor={`job-${key}`}>
                    {label}
                  </label>
                  <input
                    id={`job-${key}`}
                    name={key}
                    className="form-control"
                    required
                    pattern=".*\S.*"
                    maxLength={250}
                    value={editing[key]}
                    onChange={update}
                  />
                </div>
              ))}
              <div className="col-sm-6">
                <label className="form-label" htmlFor="job-area">
                  Área
                </label>
                <select
                  id="job-area"
                  name="area"
                  className="form-select"
                  value={editing.area}
                  onChange={update}
                >
                  {Object.entries(areas).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label" htmlFor="job-modality">
                  Modalidade
                </label>
                <select
                  id="job-modality"
                  name="modality"
                  className="form-select"
                  value={editing.modality}
                  onChange={update}
                >
                  {Object.entries(modalities).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label" htmlFor="job-ods">
                  ODS
                </label>
                <select
                  id="job-ods"
                  name="ods"
                  className="form-select"
                  value={editing.ods}
                  onChange={update}
                >
                  {[
                    "ODS 4: Educação de Qualidade",
                    "ODS 10: Redução das Desigualdades",
                    "ODS 17: Parcerias e Meios",
                  ].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label" htmlFor="job-status">
                  Status
                </label>
                <select
                  id="job-status"
                  name="status"
                  className="form-select"
                  value={editing.status}
                  onChange={update}
                >
                  <option>Ativa</option>
                  <option>Encerrada</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="job-desc" className="form-label">
                  Descrição
                </label>
                <textarea
                  id="job-desc"
                  name="desc"
                  className="form-control"
                  required
                  maxLength={1500}
                  rows="3"
                  value={editing.desc}
                  onChange={update}
                />
              </div>
            </div>
            <button className="btn btn-primary w-100 mt-4">Salvar vaga</button>
          </form>
        </Modal>
      )}
      {deleting && (
        <Modal title="Confirmar exclusão" onClose={() => setDeleting(null)}>
          <p>
            Excluir <strong>{deleting.name}</strong>? As candidaturas
            relacionadas também serão removidas deste navegador.
          </p>
          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDeleting(null)}
            >
              Cancelar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleting);
                setDeleting(null);
                setNotice("Registro e candidaturas relacionadas excluídos.");
              }}
            >
              Confirmar exclusão
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
