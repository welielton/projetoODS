import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="section container">
      <p className="eyebrow">Sobre o projeto</p>
      <h1>Uma ponte entre talentos e causas.</h1>
      <p className="lead text-secondary narrow-copy">
        O Conecta Voluntário aproxima estudantes e profissionais de instituições
        que precisam de apoio qualificado, tornando o voluntariado por
        habilidades mais acessível.
      </p>
      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <article className="form-panel h-100">
            <h2 className="h4">O problema</h2>
            <p>
              Pessoas dispostas a contribuir nem sempre encontram oportunidades
              compatíveis com suas habilidades e horários. Ao mesmo tempo,
              organizações sociais precisam de apoio em educação, tecnologia e
              comunicação.
            </p>
          </article>
        </div>
        <div className="col-md-6">
          <article className="form-panel h-100">
            <h2 className="h4">Nossa proposta</h2>
            <p>
              Centralizar oportunidades, permitir a busca por área e modalidade,
              cadastrar talentos e acompanhar candidaturas em uma experiência
              simples.
            </p>
            <p className="mb-0">
              <strong>Público-alvo:</strong> estudantes, profissionais, ONGs e
              coletivos sociais.
            </p>
          </article>
        </div>
      </div>
      <h2 className="mt-5 mb-4">Três objetivos, um propósito coletivo</h2>
      <div className="row g-4">
        {[
          [
            "4",
            "Educação de qualidade",
            "Mobilizar habilidades para reforço escolar, alfabetização e inclusão digital.",
          ],
          [
            "10",
            "Redução das desigualdades",
            "Ampliar o acesso ao conhecimento e ao apoio social para comunidades em situação de vulnerabilidade.",
          ],
          [
            "17",
            "Parcerias e meios de implementação",
            "Conectar comunidade acadêmica, profissionais e organizações da sociedade civil.",
          ],
        ].map(([n, title, desc]) => (
          <div key={n} className="col-md-4">
            <article className="opportunity-card">
              <span className={`ods-label ods-${n} align-self-start`}>
                ODS {n}
              </span>
              <h3 className="h5 mt-3">{title}</h3>
              <p>{desc}</p>
            </article>
          </div>
        ))}
      </div>
      <p className="mt-3 small">
        Referência:{" "}
        <a
          href="https://brasil.un.org/pt-br/sdgs"
          target="_blank"
          rel="noreferrer"
        >
          Objetivos de Desenvolvimento Sustentável — Nações Unidas Brasil
        </a>
        .
      </p>
      <div className="api-note mt-5">
        <h2 className="h4">Sobre esta demonstração</h2>
        <p>
          A aplicação acadêmica utiliza React, navegação SPA e a API de
          Localidades do IBGE. As oportunidades e instituições são ilustrativas.
          Os perfis e inscrições são armazenados somente neste navegador, sem
          conta, senha ou envio real para ONGs.
        </p>
        <p>
          O painel de gestão é aberto para permitir a avaliação das operações de
          cadastro, edição, exclusão e triagem. Dados de navegadores diferentes
          não são compartilhados.
        </p>
        <Link to="/instituicao">Conheça a instituição ilustrativa →</Link>
      </div>
    </section>
  );
}
