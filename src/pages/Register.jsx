import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useLocations } from "../hooks/useLocations";
import { areas, modalities } from "../data";

const blank = {
  name: "",
  email: "",
  uf: "",
  city: "",
  area: "",
  skills: "",
  modality: "remoto",
  hours: "2",
  motivation: "",
  consent: false,
};
export default function Register() {
  const { state, dispatch } = useApp();
  const [form, setForm] = useState(blank);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const {
    states,
    cities,
    loading,
    error: apiError,
    retry,
  } = useLocations(form.uf);
  function update(e) {
    const { name, value, checked, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "uf" ? { city: "" } : {}),
    }));
    setError("");
  }
  function submit(e) {
    e.preventDefault();
    if (
      step === 0 &&
      state.volunteers.some(
        (v) => v.email.toLowerCase() === form.email.trim().toLowerCase(),
      )
    ) {
      setError(
        "Este e-mail já possui cadastro neste navegador. Use-o para se candidatar às vagas.",
      );
      return;
    }
    if (step < 2) {
      setStep((n) => n + 1);
      return;
    }
    dispatch({
      type: "saveVolunteer",
      volunteer: {
        ...form,
        id: crypto.randomUUID(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        skills: form.skills.trim(),
      },
    });
    setDone(true);
  }
  if (done)
    return (
      <section className="section container">
        <div className="success-panel">
          <span className="success-symbol" aria-hidden="true">
            ✓
          </span>
          <h1>Seu talento já faz parte da rede.</h1>
          <p>
            Cadastro de {form.name} salvo neste navegador. Agora você pode
            escolher uma causa e enviar sua candidatura.
          </p>
          <Link className="btn btn-primary" to="/vagas">
            Encontrar oportunidades
          </Link>
        </div>
      </section>
    );
  return (
    <section className="section container">
      <div className="row g-5">
        <div className="col-lg-4">
          <p className="eyebrow">Cada habilidade conta</p>
          <h1>
            Conte com
            <br />
            seu talento.
          </h1>
          <p className="lead text-secondary">
            Dê o primeiro passo para se conectar a uma causa.
          </p>
          <p className="small">
            Este é um ambiente de demonstração. Use nome e e-mail fictícios.
            Nenhum cadastro é enviado para uma instituição.
          </p>
          <ol className="registration-steps">
            {["Seu perfil", "Suas habilidades", "Revisão e confirmação"].map(
              (label, i) => (
                <li
                  className={i === step ? "current" : ""}
                  aria-current={i === step ? "step" : undefined}
                  key={label}
                >
                  <span>{i + 1}</span>
                  {label}
                </li>
              ),
            )}
          </ol>
        </div>
        <div className="col-lg-8">
          <form className="form-panel" onSubmit={submit} key={step}>
            <p className="eyebrow">Etapa {step + 1} de 3</p>
            <h2 className="h4 mb-4">
              {
                [
                  "Vamos nos conhecer",
                  "Como você quer contribuir?",
                  "Tudo pronto para começar?",
                ][step]
              }
            </h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {step === 0 && (
              <>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Nome completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      className="form-control"
                      required
                      minLength={3}
                      maxLength={100}
                      pattern=".*\S.*"
                      value={form.name}
                      onChange={update}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="form-control"
                      required
                      maxLength={150}
                      value={form.email}
                      onChange={update}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="uf" className="form-label">
                      Estado (IBGE)
                    </label>
                    <select
                      id="uf"
                      name="uf"
                      className="form-select"
                      required
                      value={form.uf}
                      onChange={update}
                      disabled={!states.length}
                    >
                      <option value="">Selecione o estado</option>
                      {states.map((s) => (
                        <option key={s.id} value={s.sigla}>
                          {s.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      Município (IBGE)
                    </label>
                    <select
                      id="city"
                      name="city"
                      className="form-select"
                      required
                      disabled={!cities.length || Boolean(loading)}
                      value={form.city}
                      onChange={update}
                    >
                      <option value="">
                        {form.uf
                          ? "Selecione o município"
                          : "Escolha um estado primeiro"}
                      </option>
                      {cities.map((c) => (
                        <option key={c.id} value={c.nome}>
                          {c.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="api-note mt-4">
                  <strong>Localidades oficiais do IBGE</strong>
                  <p className="small mb-0">
                    Estados e municípios consultados em tempo real para
                    padronizar a localização dos voluntários.
                  </p>
                  {loading && (
                    <p role="status" className="mt-2 mb-0">
                      {loading}
                    </p>
                  )}
                  {apiError && (
                    <div role="alert">
                      <p className="mt-2">{apiError}</p>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={retry}
                      >
                        Tentar novamente
                      </button>
                    </div>
                  )}
                  <a
                    className="small"
                    href="https://servicodados.ibge.gov.br/api/docs/localidades"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Fonte: API de Localidades do IBGE ↗
                  </a>
                </div>
              </>
            )}
            {step === 1 && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="area" className="form-label">
                    Área de atuação
                  </label>
                  <select
                    className="form-select"
                    id="area"
                    name="area"
                    required
                    value={form.area}
                    onChange={update}
                  >
                    <option value="">Selecione uma área</option>
                    {Object.entries(areas).map(([v, label]) => (
                      <option key={v} value={v}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="modality" className="form-label">
                    Modalidade preferida
                  </label>
                  <select
                    id="modality"
                    name="modality"
                    className="form-select"
                    value={form.modality}
                    onChange={update}
                  >
                    {Object.entries(modalities).map(([v, label]) => (
                      <option key={v} value={v}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="skills" className="form-label">
                    Suas habilidades
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    className="form-control"
                    required
                    minLength={3}
                    maxLength={250}
                    pattern=".*\S.*"
                    placeholder="Ex.: matemática, programação, design"
                    value={form.skills}
                    onChange={update}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="hours" className="form-label">
                    Horas disponíveis por semana
                  </label>
                  <input
                    id="hours"
                    name="hours"
                    className="form-control"
                    type="number"
                    min="1"
                    max="40"
                    required
                    value={form.hours}
                    onChange={update}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="motivation" className="form-label">
                    Sua motivação (opcional)
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    className="form-control"
                    rows="3"
                    maxLength={500}
                    value={form.motivation}
                    onChange={update}
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <>
                <dl className="review-grid">
                  <dt>Nome</dt>
                  <dd>{form.name}</dd>
                  <dt>E-mail</dt>
                  <dd>{form.email}</dd>
                  <dt>Localização</dt>
                  <dd>
                    {form.city} / {form.uf}
                  </dd>
                  <dt>Área</dt>
                  <dd>{areas[form.area]}</dd>
                  <dt>Habilidades</dt>
                  <dd>{form.skills}</dd>
                  <dt>Disponibilidade</dt>
                  <dd>
                    {form.hours}h/semana · {modalities[form.modality]}
                  </dd>
                </dl>
                <div className="form-check mt-4">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    className="form-check-input"
                    required
                    checked={form.consent}
                    onChange={update}
                  />
                  <label htmlFor="consent" className="form-check-label">
                    Entendo que os dados ficam neste navegador e aparecem no
                    banco de talentos da demonstração. Estou usando dados
                    fictícios.
                  </label>
                </div>
              </>
            )}
            <div className="d-flex justify-content-between gap-3 mt-4 pt-4 border-top">
              {step > 0 ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setStep((n) => n - 1)}
                >
                  Voltar
                </button>
              ) : (
                <Link to="/vagas" className="btn btn-outline-secondary">
                  Ver vagas
                </Link>
              )}
              <button
                className="btn btn-primary"
                disabled={
                  step === 0 &&
                  (!form.city || Boolean(loading) || Boolean(apiError))
                }
              >
                {step === 2 ? "Concluir cadastro" : "Continuar →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
