import pptxgen from "pptxgenjs";
import fs from "node:fs";
import path from "node:path";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Welielton Silva da Silva";
pptx.subject = "Desenvolvimento Web — Nota 2";
pptx.title = "Conecta Voluntário — Nota 2";
pptx.company = "UEMA / PROFITEC";
pptx.lang = "pt-BR";
pptx.theme = { headFontFace: "Arial", bodyFontFace: "Arial", lang: "pt-BR" };
const C = {
  dark: "183C32",
  green: "226749",
  muted: "51665B",
  bg: "F5F8F3",
  blue: "135CC7",
  line: "DCE6DB",
};
const url =
  "https://conecta-voluntario-welielton.yellow-myna-9452.chatgpt.site";
const statePath = "docs/publication-status.json";
const publication = fs.existsSync(statePath)
  ? JSON.parse(fs.readFileSync(statePath, "utf8"))
  : { public: false, deployed: false };
let number = 0;
function text(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, {
    x,
    y,
    w,
    h,
    fontFace: "Arial",
    fontSize: 19,
    color: C.dark,
    margin: 0,
    breakLine: false,
    valign: "top",
    ...options,
  });
}
function slide(section, title) {
  const s = pptx.addSlide();
  number++;
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 0.14,
    h: 7.5,
    fill: { color: C.green },
    line: { color: C.green },
  });
  text(s, section.toUpperCase(), 0.55, 0.38, 12, 0.3, {
    fontSize: 11,
    bold: true,
    charSpacing: 2,
    color: C.green,
  });
  text(s, title, 0.55, 0.9, 12.2, 0.85, { fontSize: 29, bold: true });
  s.addShape(pptx.ShapeType.line, {
    x: 0.55,
    y: 6.94,
    w: 12.2,
    h: 0,
    line: { color: C.line, width: 1 },
  });
  text(
    s,
    "CONECTA VOLUNTÁRIO · DESENVOLVIMENTO WEB · NOTA 2",
    0.55,
    7.1,
    11.4,
    0.2,
    { fontSize: 9, color: C.muted },
  );
  text(s, String(number).padStart(2, "0"), 12.1, 7.08, 0.5, 0.25, {
    fontSize: 10,
    color: C.muted,
    align: "right",
  });
  return s;
}
function bullets(
  s,
  rows,
  { x = 0.6, y = 2, w = 5.1, size = 20, gap = 0.9 } = {},
) {
  rows.forEach((row, i) =>
    text(s, row, x, y + i * gap, w, gap - 0.13, {
      fontSize: size,
      paraSpaceAfterPt: 9,
    }),
  );
}
function shot(s, filename, x, y, w, h, caption) {
  const image = path.resolve("docs/evidencias", filename);
  if (!fs.existsSync(image)) throw Error(`Evidência ausente: ${image}`);
  s.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: "FFFFFF" },
    line: { color: C.line },
  });
  const buffer = fs.readFileSync(image);
  const iw = buffer.readUInt32BE(16),
    ih = buffer.readUInt32BE(20);
  const scale = Math.min((w - 0.08) / iw, (h - 0.08) / ih);
  s.addImage({
    path: image,
    x: x + (w - iw * scale) / 2,
    y: y + (h - ih * scale) / 2,
    w: iw * scale,
    h: ih * scale,
  });
  if (caption)
    text(s, caption, x, y + h + 0.08, w, 0.4, { fontSize: 10, color: C.muted });
}

let s = slide(
  "Universidade Estadual do Maranhão · PROFITEC",
  "Conecta Voluntário",
);
text(s, "Banco de talentos\npara causas sociais", 0.6, 2, 6.3, 1.5, {
  fontSize: 37,
  bold: true,
  color: C.green,
});
text(
  s,
  "Da interface da Nota 1 à aplicação interativa em React",
  0.6,
  3.65,
  5.8,
  0.9,
  { fontSize: 22 },
);
text(
  s,
  "Welielton Silva da Silva\nAnálise e Desenvolvimento de Sistemas\nTutor: Adriano Freire Pereira\nBuriticupu–MA · 2026",
  0.6,
  5.05,
  6.4,
  1.35,
  { fontSize: 16, color: C.muted, breakLine: false },
);
shot(
  s,
  "inicio-desktop.png",
  7.25,
  1.85,
  5.4,
  4.85,
  "Figura 1 — Aplicação React. Fonte: elaboração própria (2026).",
);
s.addNotes(
  "Identificação recuperada do relatório da Nota 1. Confirmar a lista de integrantes caso o trabalho seja em equipe.",
);

s = slide("1 Introdução", "Uma ponte entre quem sabe e quem precisa");
bullets(
  s,
  [
    "PROBLEMA\nVoluntários têm dificuldade para encontrar causas compatíveis com suas habilidades e horários.",
    "PÚBLICO-ALVO\nEstudantes, profissionais, ONGs e coletivos sociais.",
    "OBJETIVO\nCentralizar vagas, cadastrar talentos e acompanhar candidaturas.",
  ],
  { w: 6.2, gap: 1.45, size: 21 },
);
for (const [i, ods] of [
  ["4", "Educação de qualidade"],
  ["10", "Redução das desigualdades"],
  ["17", "Parcerias e meios de implementação"],
].entries()) {
  const colors = ["B91B30", "B51055", "19486A"];
  s.addShape(pptx.ShapeType.roundRect, {
    x: 7.6,
    y: 2 + i * 1.42,
    w: 4.95,
    h: 1.15,
    rectRadius: 0.12,
    fill: { color: colors[i] },
    line: { color: colors[i] },
  });
  text(s, `ODS ${ods[0]}  |  ${ods[1]}`, 7.85, 2.25 + i * 1.42, 4.45, 0.7, {
    fontSize: 20,
    bold: true,
    color: "FFFFFF",
  });
}
text(
  s,
  "Referência: Nações Unidas Brasil ([s. d.]). O vínculo aos ODS expressa a proposta; não comprova impacto real.",
  0.6,
  6.55,
  12,
  0.25,
  { fontSize: 11, color: C.muted },
);

s = slide(
  "2 Desenvolvimento da aplicação",
  "Continuidade da Nota 1 e melhorias",
);
bullets(
  s,
  [
    "BASE REAPROVEITADA\nHTML semântico, CSS original, Bootstrap, identidade visual e seis oportunidades ilustrativas.",
    "EVOLUÇÃO IMPLEMENTADA\nComponentes React, navegação SPA, formulários controlados e tratamento de falhas.",
    "ORGANIZAÇÃO\nA versão histórica permanece em nota1/. Os antigos endereços HTML levam às rotas novas.",
  ],
  { w: 6.2, gap: 1.45, size: 20 },
);
shot(
  s,
  "vagas-desktop.png",
  7.1,
  1.9,
  5.6,
  4.65,
  "Figura 2 — Mural com filtros. Fonte: elaboração própria (2026).",
);

s = slide("2 Desenvolvimento da aplicação", "Interatividade, eventos e DOM");
bullets(
  s,
  [
    "onChange: busca, filtros combinados e campos controlados.",
    "onSubmit: validação e cadastro em três etapas; criação e edição de vagas.",
    "onClick: candidatura, aprovação, recusa, exclusão e modais.",
    "O React atualiza o DOM quando o estado muda; refs controlam o modal e o foco.",
  ],
  { w: 6, gap: 1.08, size: 20 },
);
shot(
  s,
  "candidatura-aprovada.png",
  7.1,
  2,
  5.6,
  4.4,
  "Figura 3 — Candidatura aprovada após fluxo funcional. Fonte: elaboração própria (2026).",
);

s = slide("2 Desenvolvimento da aplicação", "Gestão e consistência dos dados");
bullets(
  s,
  [
    "CRUD de vagas e exclusão com confirmação.",
    "Vagas encerradas saem do mural; cadastros e candidaturas duplicados são bloqueados.",
    "Exclusões removem também as candidaturas relacionadas.",
    "Persistência local: os dados permanecem ao recarregar este navegador.",
  ],
  { w: 5.1, gap: 1.06, size: 19 },
);
shot(
  s,
  "gestao-desktop.png",
  6.1,
  1.95,
  6.6,
  4.55,
  "Figura 4 — Painel de gestão demonstrativo. Fonte: elaboração própria (2026).",
);

s = slide("3 Consumo de dados", "Localidades oficiais para o cadastro");
bullets(
  s,
  [
    "API EXTERNA\nAPI de Localidades do IBGE; consulta de estados e municípios.",
    "REQUISIÇÕES\nGET /estados?orderBy=nome\nGET /estados/MA/municipios?orderBy=nome",
    "EVIDÊNCIA REAL\nHTTP 200: 27 UFs e 217 municípios do Maranhão. Registro: api-real.json.",
  ],
  { w: 5.35, gap: 1.4, size: 19 },
);
shot(
  s,
  "cadastro-api-real.png",
  6.3,
  1.9,
  6.4,
  4.6,
  "Figura 5 — Maranhão / Buriticupu carregados da API real. Fonte: elaboração própria (2026).",
);
text(
  s,
  "Fonte dos dados: IBGE ([s. d.]). Apenas a UF é enviada; os dados pessoais não são enviados à API.",
  0.6,
  6.6,
  12,
  0.2,
  { fontSize: 11, color: C.muted },
);

s = slide("3 Consumo de dados", "Fetch, JSON e tratamento de falhas");
bullets(
  s,
  [
    "1. fetch() executa a consulta HTTPS.",
    "2. response.ok verifica o status HTTP.",
    "3. response.json() interpreta os dados.",
    "4. Validação, seleção de campos e ordenação antes da renderização.",
    "5. Carregamento, timeout de 12 s, cancelamento e botão para tentar novamente.",
  ],
  { w: 5.5, gap: 0.88, size: 18 },
);
shot(
  s,
  "api-erro.png",
  6.55,
  2,
  6.15,
  4.4,
  "Figura 6 — Falha HTTP simulada para testar a recuperação. Fonte: elaboração própria (2026).",
);

s = slide(
  "4 Organização com framework",
  "Componentes com responsabilidades definidas",
);
bullets(
  s,
  [
    "Layout: cabeçalho, navegação e rodapé compartilhados.",
    "JobCard e Modal: componentes reutilizáveis.",
    "pages/: telas da aplicação.\nservices/: API e regras de negócio.",
    "AppContext e useLocations: estado compartilhado e consultas assíncronas.",
  ],
  { w: 5.2, gap: 1, size: 19 },
);
shot(
  s,
  "codigo-0.png",
  6.2,
  1.9,
  6.5,
  4.65,
  "Figura 7 — Arquivos reais em painel de leitura. Fonte: código do projeto (2026).",
);

s = slide("4 Organização com framework", "Estado e navegação de página única");
bullets(
  s,
  [
    "useState: formulários, filtros e janelas.",
    "Context + useReducer: operações e estado compartilhado entre páginas.",
    "useEffect: persistência local e sincronização das consultas.",
    "HashRouter: troca de telas sem recarregar o documento, inclusive em hospedagem estática.",
  ],
  { w: 5.3, gap: 1.04, size: 19 },
);
shot(
  s,
  "codigo-1.png",
  6.25,
  1.9,
  6.4,
  4.65,
  "Figura 8 — Contexto e persistência. Fonte: código do projeto (2026).",
);
text(
  s,
  "Referências: React ([s. d.]); React Router ([s. d.]).",
  0.6,
  6.6,
  11,
  0.2,
  { fontSize: 11, color: C.muted },
);

s = slide("5 Testes e publicação", "Responsividade demonstrada");
bullets(
  s,
  [
    "Oito rotas verificadas em 360, 390, 768 e 1440 px.",
    "Menu recolhível, colunas adaptáveis e tabela com rolagem interna.",
    "Correção: margens do grid causavam transbordamento na tela de 360 px.",
    "Teclado: fechamento do modal com Escape e retorno do foco.",
  ],
  { w: 6.1, gap: 1.05, size: 20 },
);
shot(s, "inicio-mobile.png", 7.2, 1.85, 2.1, 4.75, "Figura 9 — Início móvel.");
shot(
  s,
  "cadastro-mobile.png",
  10.1,
  1.85,
  2.1,
  4.75,
  "Figura 10 — Cadastro móvel.",
);
text(
  s,
  "Fonte: capturas da aplicação em Chrome, elaboração própria (2026).",
  0.6,
  6.6,
  10,
  0.2,
  { fontSize: 11, color: C.muted },
);

s = slide("5 Testes e publicação", "Verificação funcional e correções");
bullets(
  s,
  [
    "8 CASOS UNITÁRIOS APROVADOS\nFiltros, JSON, HTTP, rede, armazenamento, duplicidade e integridade das relações.",
    "8 CENÁRIOS DE NAVEGADOR APROVADOS\nCadastro até aprovação, CRUD, erros, navegação, responsividade e evidências.",
    "CORREÇÕES DOCUMENTADAS\nListener legado sem fechamento; margens em telas estreitas; caminhos de arquivos portáveis.",
    "REPRODUÇÃO\nnpm test · npm run test:e2e · npm run build",
  ],
  { w: 11.9, gap: 1.09, size: 19 },
);
text(
  s,
  "Resultados: docs/testes.md e docs/evidencias/resultados-e2e.json. Não equivale a auditoria completa WCAG.",
  0.6,
  6.6,
  12,
  0.2,
  { fontSize: 11, color: C.muted },
);

s = slide("5 Testes e publicação", "Aplicação e código-fonte");
text(
  s,
  publication.public
    ? "PUBLICAÇÃO ACESSÍVEL SEM LOGIN"
    : publication.deployed
      ? "VERSÃO PUBLICADA · ACESSO AINDA PRIVADO"
      : (publication.error ? "PUBLICAÇÃO PENDENTE · FALHA NO HTTPS DA HOSPEDAGEM" : "PUBLICAÇÃO EM PREPARAÇÃO"),
  0.6,
  1.9,
  12,
  0.35,
  { fontSize: 16, bold: true, color: C.green },
);
text(s, "Aplicação", 0.6, 2.55, 12, 0.4, { fontSize: 21, bold: true });
text(s, url, 0.6, 3.02, 12, 0.7, {
  fontSize: 18,
  color: C.blue,
  hyperlink: { url },
});
text(s, "Código-fonte completo para download", 0.6, 4, 12, 0.4, {
  fontSize: 21,
  bold: true,
});
text(s, `${url}/entrega/codigo-fonte.zip`, 0.6, 4.48, 12, 0.85, {
  fontSize: 17,
  color: C.blue,
  hyperlink: { url: `${url}/entrega/codigo-fonte.zip` },
});
text(
  s,
  publication.public
    ? "Links verificados sem autenticação. O pacote inclui fontes, testes, documentação e a base da Nota 1."
    : "O acesso do tutor ainda precisa ser liberado e verificado. Não entregar este slide como comprovação de acesso público enquanto essa etapa estiver pendente.",
  0.6,
  5.75,
  11.8,
  0.9,
  { fontSize: 17, color: C.muted },
);

s = slide("6 Conclusão", "Aprendizados e limites da entrega");
bullets(
  s,
  [
    "APRENDIZADOS\nComponentização, eventos, estado compartilhado, consumo de JSON, navegação SPA e testes.",
    "DIFICULDADES RESOLVIDAS\nErro sintático herdado, grid em telas estreitas e falhas de requisições assíncronas.",
    "ESCOPO ACADÊMICO\nVagas ilustrativas, gestão aberta e dados somente no navegador. Sem autenticação ou contato real com ONGs.",
    "EVOLUÇÃO FUTURA\nBackend, autenticação e persistência compartilhada entre dispositivos.",
  ],
  { w: 11.8, gap: 1.12, size: 20 },
);

s = slide("Referências", "Fontes utilizadas");
const refs = [
  [
    "IBGE. API de localidades. [S. l.]: IBGE, [s. d.].",
    "https://servicodados.ibge.gov.br/api/docs/localidades",
  ],
  [
    "NAÇÕES UNIDAS BRASIL. Objetivos de Desenvolvimento Sustentável. [S. l.]: ONU, [s. d.].",
    "https://brasil.un.org/pt-br/sdgs",
  ],
  [
    "REACT. Managing state. [S. l.]: React, [s. d.].",
    "https://react.dev/learn/managing-state",
  ],
  [
    "REACT ROUTER. HashRouter. [S. l.]: React Router, [s. d.].",
    "https://reactrouter.com/api/declarative-routers/HashRouter",
  ],
  [
    "BOOTSTRAP. Grid system. [S. l.]: Bootstrap, [s. d.].",
    "https://getbootstrap.com/docs/5.3/layout/grid/",
  ],
];
refs.forEach(([ref, link], i) => {
  text(s, ref, 0.6, 1.85 + i * 0.95, 12, 0.35, { fontSize: 15 });
  text(
    s,
    `Disponível em: ${link}. Acesso em: 16 set. 2026.`,
    0.6,
    2.22 + i * 0.95,
    12,
    0.45,
    { fontSize: 12, color: C.blue, hyperlink: { url: link } },
  );
});
await pptx.writeFile({ fileName: "public/entrega/apresentacao.pptx" });
console.log(`Apresentação criada: ${number} slides.`);
