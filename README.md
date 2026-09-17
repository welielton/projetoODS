# Conecta Voluntário — Nota 2

Aplicação acadêmica que conecta habilidades de voluntários a oportunidades de organizações sociais. Desenvolvida para a disciplina Desenvolvimento Web (ADS / UEMA / PROFITEC), a partir da interface da Nota 1.

## Executar

Requisito: Node.js 22 ou superior e npm.

```bash
npm ci
npm run dev
```

Abra a URL exibida no terminal. Não abra `index.html` diretamente pelo sistema de arquivos: a versão React precisa do servidor ou da compilação publicada.

```bash
npm run build
npm run preview
npm test
npm run test:e2e
```

Os testes de navegador usam Google Chrome em `/usr/bin/google-chrome` neste ambiente. Em outro computador, configure `CHROME_PATH` ou instale o Chromium com `npx playwright install chromium`. Os testes `evidence.spec.js` incluem consulta real à API do IBGE e precisam de internet; os cenários funcionais usam respostas controladas para serem reproduzíveis.

## Funcionalidades

- Mural de oportunidades com filtros combinados, busca sem acentos e estado vazio.
- Cadastro de voluntários em três etapas, validação e consulta de estados/municípios ao IBGE.
- Candidaturas com bloqueio de duplicidade, acompanhamento e cancelamento.
- Gestão de vagas (criar, consultar, editar e excluir), aprovação/recusa e exclusão de voluntários.
- Banco de talentos com busca por nome, habilidade, cidade e área.
- Navegação SPA, menu móvel, modais acessíveis por teclado e controles de fonte/contraste.
- Persistência em `localStorage`, com aviso e recuperação de dados inválidos.

## Arquitetura

```text
src/
  App.jsx                    Rotas da SPA (HashRouter)
  main.jsx                   Entrada, estilos e limite de erro
  components/                Layout, JobCard e Modal reutilizáveis
  context/AppContext.jsx     Contexto, useReducer e persistência
  hooks/useLocations.js      Estado assíncrono, cancelamento e repetição
  services/ibge.js            Fetch API, validação de HTTP/JSON e transformação
  services/storage.js         Regras de negócio, filtros e leitura local
  pages/                     Telas organizadas por responsabilidade
  data.js                    Vagas ilustrativas reaproveitadas da Nota 1
tests/                       Testes unitários e de navegador
docs/                        Relatório, roteiro e evidências
public/entrega/               Slides PDF/PPTX e arquivo do código
nota1/                       Cópia histórica da primeira versão
```

React atualiza o DOM a partir do estado, usando eventos `onClick`, `onChange` e `onSubmit`. `useReducer` mantém as regras compartilhadas; `useState` mantém formulários e filtros; `useEffect` sincroniza armazenamento e consultas. `HashRouter` permite atualizar diretamente as rotas em hospedagem estática sem reescrita de servidor.

## API externa

Fonte: [API de Localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades).

```text
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados/MA/municipios?orderBy=nome
```

O serviço usa `fetch()`, verifica `response.ok`, executa `response.json()`, valida o array e os campos, seleciona `id`, `nome` e `sigla`, ordena em português e entrega os dados aos selects do cadastro. `AbortController` cancela consultas antigas; o limite de 12 segundos e o botão de repetição tratam indisponibilidade. Nenhum dado pessoal é enviado ao IBGE: apenas a UF selecionada aparece na URL.

## Escopo da demonstração

Vagas e instituições são ilustrativas. Os dados de voluntários e candidaturas ficam somente no navegador atual; não são sincronizados entre dispositivos. O painel de gestão é demonstrativo e aberto. Não há autenticação, senhas, backend, envio de e-mail ou contato real com ONGs. Use dados fictícios. Um backend não é exigido pelo enunciado desta atividade.

## Continuidade da Nota 1

O CSS original é importado antes dos ajustes da nova interface. As seis oportunidades iniciais, os ODS, a proposta, a paleta e os fluxos foram reaproveitados. A pasta `nota1/` preserva os arquivos originais, inclusive o erro de sintaxe identificado na avaliação, como registro histórico; ela não é executada pela SPA. O `js/main.js` da raiz teve o fechamento do listener corrigido, mas não é usado pela aplicação React. Os antigos endereços HTML redirecionam para as rotas novas.

## Material e publicação

- Apresentação: `public/entrega/apresentacao.pptx` e `public/entrega/apresentacao.pdf`.
- Relatório: `docs/relatorio-nota2.md`.
- Testes e evidências: `docs/testes.md` e `docs/evidencias/`.
- Roteiro: `docs/roteiro-apresentacao.md`.
- Links e estado de publicação: `docs/publicacao.md`.

Para regenerar os slides: `npm run slides`. Para exportar PDF, abra o PPTX no PowerPoint/LibreOffice ou execute `libreoffice -env:UserInstallation=file:///tmp/conecta-lo --headless --convert-to pdf --outdir public/entrega public/entrega/apresentacao.pptx`. Para gerar o arquivo do código: `npm run package:source`. Execute `npm run build` novamente depois de atualizar os arquivos da entrega.

O pacote do código inclui fontes, lockfile, testes, documentos e a base da Nota 1; exclui dependências, credenciais, metadados Git e arquivos gerados recursivos.
