# CONECTA VOLUNTÁRIO: BANCO DE TALENTOS PARA CAUSAS SOCIAIS

**Universidade Estadual do Maranhão — UEMA / PROFITEC**  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Desenvolvimento Web — segunda atividade avaliativa  
**Autor identificado na documentação da Nota 1:** Welielton Silva da Silva  
**Tutor identificado na documentação da Nota 1:** Adriano Freire Pereira  
**Local e ano:** Buriticupu–MA, 2026

## 1 INTRODUÇÃO

O Conecta Voluntário aborda a dificuldade de conectar pessoas dispostas a compartilhar competências a organizações sociais que necessitam de apoio qualificado. Seu público-alvo compreende estudantes, profissionais, organizações não governamentais e coletivos. O objetivo é centralizar oportunidades de voluntariado, cadastrar talentos por habilidades e permitir o acompanhamento de candidaturas.

A proposta relaciona-se aos ODS 4 (Educação de Qualidade), 10 (Redução das Desigualdades) e 17 (Parcerias e Meios de Implementação). A vinculação expressa os objetivos do projeto acadêmico; não constitui comprovação de impacto social real (NAÇÕES UNIDAS BRASIL, [s. d.]).

## 2 DESENVOLVIMENTO DA APLICAÇÃO

A interface HTML5/CSS3/Bootstrap da Nota 1 foi utilizada como base: foram mantidos a identidade do projeto, as oportunidades ilustrativas, a paleta dos ODS, os fluxos de inscrição e o CSS original. A nova versão reorganiza as telas em componentes React, com navegação de página única, estados vazios, feedback de sucesso e tratamento de falhas.

Os eventos `onChange`, `onClick` e `onSubmit` controlam filtros, formulários e ações. A manipulação do DOM é realizada principalmente pela renderização declarativa do React: alterações de estado atualizam listas, contadores, mensagens e campos. Referências DOM são usadas no modal nativo e no gerenciamento de foco. Foram implementados cadastro em etapas, validação de campos, busca tolerante a acentos, candidatura sem duplicidade, cancelamento, CRUD de vagas e triagem de solicitações.

O script legado apresentava um listener sem fechamento. O fechamento foi corrigido na cópia da raiz; a execução da nova aplicação passou a depender exclusivamente dos componentes React. Também foram corrigidas margens do grid que provocavam rolagem horizontal em telas de 360 px.

## 3 CONSUMO DE DADOS

A API de Localidades do IBGE fornece estados e municípios para o cadastro. Os endpoints utilizados são `/api/v1/localidades/estados?orderBy=nome` e `/api/v1/localidades/estados/{UF}/municipios?orderBy=nome` (IBGE, [s. d.]).

O serviço `src/services/ibge.js` executa `fetch`, verifica o status HTTP e transforma a resposta com `response.json()`. A estrutura recebida é validada antes do uso. Os campos `id`, `nome` e `sigla` são selecionados e ordenados em português, sendo então renderizados nos campos de seleção. A mudança de estado limpa o município anterior. O hook `useLocations` trata carregamento, erro, repetição e cancelamento de requisições obsoletas. O tempo limite é de 12 segundos.

A evidência `api-real.json` registra URLs, status HTTP, quantidade de itens e uma amostra da resposta real, separada dos testes com respostas simuladas. Os dados pessoais digitados não são enviados ao IBGE.

## 4 ORGANIZAÇÃO COM REACT

`App.jsx` define as rotas, e `Layout` compartilha cabeçalho, navegação e rodapé. `JobCard` exibe oportunidades, enquanto `Modal` concentra a janela de detalhes e confirmação. As páginas são separadas em `src/pages/`.

O contexto `AppContext` disponibiliza o estado global. `useReducer` centraliza operações de cadastro, edição, exclusão e candidatura. `useState` controla estados de interface, e `useEffect` sincroniza o estado com o `localStorage` e conduz as consultas externas. O `HashRouter` implementa a navegação SPA e permite recarregar rotas em hospedagem estática (REACT, [s. d.]; REACT ROUTER, [s. d.]).

As vagas e instituições são ilustrativas; voluntários e candidaturas persistem somente no navegador. A gestão é demonstrativa e aberta. A aplicação não implementa autenticação nem comunicação real com instituições. Essas limitações são informadas na interface e não devem ser apresentadas como funcionalidades de produção.

## 5 TESTES E PUBLICAÇÃO

Foram elaborados testes unitários das regras de negócio e do contrato da API, além de cenários de navegador para cadastro, candidatura, duplicidade, aprovação, CRUD, filtros, falhas da API, recuperação de armazenamento, navegação SPA, teclado e responsividade. As larguras verificadas são 360, 390, 768 e 1440 px. O registro final encontra-se em `docs/testes.md` e no relatório JSON de execução.

As imagens em `docs/evidencias/` documentam páginas desktop/mobile, cadastro com consulta real, candidatura aprovada, erro da API e código dos componentes. As imagens de código foram geradas a partir dos arquivos reais da aplicação em um painel de leitura, e não são capturas de um editor de desenvolvimento.

Os links e o estado verificado da publicação encontram-se em `docs/publicacao.md` e nos slides. A disponibilidade pública deve ser confirmada sem uma sessão autenticada; o código-fonte completo é oferecido em arquivo ZIP para consulta e reprodução. Os testes realizados não constituem auditoria completa de acessibilidade ou segurança.

## 6 CONCLUSÃO

A finalização demonstra a evolução de uma interface estática para uma aplicação interativa e componentizada. Os principais aprendizados envolvem atualização declarativa do DOM, compartilhamento de estado, navegação SPA, consumo assíncrono de JSON e validação de fluxos com testes automatizados.

As dificuldades técnicas incluíram o erro sintático herdado, a adaptação do grid em telas estreitas e o tratamento de falhas e cancelamentos de requisições. A separação entre serviços, regras de negócio e componentes facilitou as correções. Como evolução futura, podem ser adicionados backend, autenticação e persistência compartilhada, sem confundir tais possibilidades com o escopo implementado nesta entrega.

## REFERÊNCIAS

IBGE. **API de localidades**. [S. l.]: IBGE, [s. d.]. Disponível em: https://servicodados.ibge.gov.br/api/docs/localidades. Acesso em: 16 set. 2026.

NAÇÕES UNIDAS BRASIL. **Objetivos de Desenvolvimento Sustentável**. [S. l.]: ONU, [s. d.]. Disponível em: https://brasil.un.org/pt-br/sdgs. Acesso em: 16 set. 2026.

REACT. **Managing state**. [S. l.]: React, [s. d.]. Disponível em: https://react.dev/learn/managing-state. Acesso em: 16 set. 2026.

REACT ROUTER. **HashRouter**. [S. l.]: React Router, [s. d.]. Disponível em: https://reactrouter.com/api/declarative-routers/HashRouter. Acesso em: 16 set. 2026.

BOOTSTRAP. **Grid system**. [S. l.]: Bootstrap, [s. d.]. Disponível em: https://getbootstrap.com/docs/5.3/layout/grid/. Acesso em: 16 set. 2026.

Nota editorial: o relatório utiliza seções numeradas, identificação acadêmica, citações autor-data e referências. A instituição não forneceu um modelo próprio de slides; eventuais exigências específicas do tutor prevalecem sobre esta organização.
