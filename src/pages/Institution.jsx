import { Link } from "react-router-dom";
export default function Institution() {
  return (
    <section className="section container">
      <p className="eyebrow">Instituição ilustrativa</p>
      <h1>Instituto Saber & Futuro</h1>
      <p className="lead text-secondary narrow-copy">
        Educação e inclusão digital como caminhos para ampliar possibilidades e
        construir um futuro mais justo.
      </p>
      <div className="row g-4 mt-3">
        <div className="col-md-8">
          <article className="form-panel">
            <h2 className="h4">Nossa missão</h2>
            <p>
              Este perfil demonstra como uma organização social pode apresentar
              sua atuação e encontrar voluntários com competências
              complementares.
            </p>
            <h3 className="h5 mt-4">Frentes de atuação</h3>
            <ul>
              <li>Reforço escolar em matemática e leitura.</li>
              <li>Alfabetização de jovens e adultos.</li>
              <li>Oficinas de tecnologia e inclusão digital.</li>
            </ul>
            <Link
              className="btn btn-primary"
              to="/vagas?busca=Instituto%20Saber"
            >
              Ver oportunidades da instituição
            </Link>
          </article>
        </div>
        <div className="col-md-4">
          <aside className="api-note">
            <h2 className="h5">Parcerias com propósito</h2>
            <p>ODS 4 · Educação de qualidade</p>
            <p>ODS 10 · Redução das desigualdades</p>
            <p>ODS 17 · Parcerias</p>
            <p className="small mb-0">
              Perfil fictício para fins acadêmicos. Não recebe mensagens nem
              inscrições reais.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
