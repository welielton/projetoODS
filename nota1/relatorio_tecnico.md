# RELATÓRIO TÉCNICO - ETAPA 1 (NOTA 1)
## Disciplina: Desenvolvimento Web
### Projeto: Conecta Voluntário — Banco de Talentos para Causas Sociais

---

**Equipe de Desenvolvimento:**
- **Integrantes:** Welielton e Equipe
- **Curso:** Análise e Desenvolvimento de Sistemas (ADS)
- **ODS Vinculados:** ODS 4 (Educação de Qualidade), ODS 10 (Redução das Desigualdades) e ODS 17 (Parcerias e Meios de Implementação)
- **Tecnologias:** HTML5 Semântico, CSS3 Customizado, Bootstrap 5.3 e JavaScript (LocalStorage)
- **Data de Entrega:** 2026

---

## 1. INTRODUÇÃO E CONTEXTUALIZAÇÃO DO PROJETO

A consolidação da Web como o principal ecossistema de compartilhamento de informações e serviços impulsionou a transformação digital em diversos setores da sociedade. No entanto, o terceiro setor — composto por Organizações da Sociedade Civil (OSCs), coletivos e Organizações Não Governamentais (ONGs) — ainda enfrenta desafios expressivos para atrair, mobilizar e reter trabalho voluntário qualificado.

O projeto **"Conecta Voluntário: Banco de Talentos para Causas Sociais"** surge com o propósito de articular a demanda reprimida por voluntariado baseado em habilidades (*skills-based volunteering*) e as necessidades operacionais e pedagógicas das instituições sociais. Em vez de limitar o voluntariado a ações esporádicas e genéricas, a aplicação permite que estudantes, técnicos e profissionais doem suas competências específicas (tais como aulas de reforço escolar, desenvolvimento web, design gráfico, assistência social e consultoria administrativa) para causas alinhadas à **Agenda 2030 da Organização das Nações Unidas (ONU)**.

---

## 2. SITUAÇÃO-PROBLEMA E OS OBJETIVOS DE DESENVOLVIMENTO SUSTENTÁVEL (ODS)

### 2.1 A Situação-Problema
Diversos estudos sobre engajamento cívico demonstram que uma parcela substancial de estudantes e profissionais deseja dedicar horas semanais a causas de impacto social. Contudo, barreiras frequentes impedem a concretização desse desejo:
1. **Falta de visibilidade e centralização:** Dificuldade em descobrir quais ONGs locais ou regionais são confiáveis e quais serviços demandam urgentemente.
2. **Incompatibilidade de competências:** Frequentemente voluntários qualificados são alocados em tarefas que subutilizam seus conhecimentos técnicos.
3. **Rigidez de horários e formatos:** Falta de canais claros para voluntariado remoto ou de carga horária reduzida e flexível.
4. **Carência técnica das ONGs:** Instituições de pequeno e médio porte carecem de suporte em áreas críticas como tecnologia da informação, comunicação e reforço pedagógico.

### 2.2 ODS Relacionados
A concepção da aplicação foi fundamentada em três Objetivos de Desenvolvimento Sustentável:

* **ODS 4 – Educação de Qualidade:**
  Apoio a projetos de alfabetização infantil, reforço escolar em matemática e redação para estudantes do ensino fundamental/médio da rede pública e inclusão digital para jovens e adultos.
* **ODS 10 – Redução das Desigualdades:**
  Mobilização de especialistas e voluntários para atuar em periferias e áreas de alta vulnerabilidade socioeconômica, democratizando o acesso a serviços pedagógicos, jurídicos e psicossociais.
* **ODS 17 – Parcerias e Meios de Implementação:**
  Estruturação de redes de cooperação intersetorial, conectando a comunidade acadêmica, profissionais do setor privado e organizações do terceiro setor por meio de canais digitais acessíveis e sustentáveis.

---

## 3. PÚBLICO-ALVO E OBJETIVOS DA APLICAÇÃO

### 3.1 Público-Alvo
1. **Voluntários (Estudantes e Profissionais):**
   - *Estudantes universitários* que necessitam cumprir horas complementares/atividades de extensão e buscam aplicar seus conhecimentos acadêmicos em situações reais de impacto.
   - *Profissionais liberais e técnicos* (designers, programadores, educadores, psicólogos) que dispõem de poucas horas semanais e optam por atuar presencialmente ou em modalidade 100% remota.

2. **Organizações da Sociedade Civil (ONGs e Coletivos):**
   - Entidades sem fins lucrativos que necessitam de suporte técnico especializado para manter suas atividades pedagógicas, sociais e de captação de recursos.

### 3.2 Objetivos da Aplicação
- **Objetivo Geral:** Desenvolver uma aplicação web responsiva, acessível e intuitiva que funcione como um banco de talentos e mural de vagas para causas sociais, intermediando a conexão entre voluntários e ONGs parceiras.
- **Objetivos Específicos:**
  - Oferecer uma página inicial informativa que eduque sobre os ODS e apresente métricas de impacto;
  - Disponibilizar um mural de vagas filtrável por área de atuação e modalidade (remoto/presencial/híbrido);
  - Implementar um formulário semântico e acessível em etapas (*multi-step*) para cadastro de voluntários;
  - Prover módulo de autenticação e Painel de Gestão Administrativa com suporte a operações CRUD (Cadastro, Edição, Consulta e Exclusão);
  - Garantir estrita conformidade com os padrões da Web (W3C), semântica HTML5, boas práticas de CSS3 e diretrizes de acessibilidade WCAG AA.

---

## 4. FUNDAMENTAÇÃO TÉCNICA: USO DE HTML5, CSS3 E BOOTSTRAP

### 4.1 Utilização do HTML5 Semântico
Foram empregadas tags estruturais do HTML5 para garantir o significado semântico e a indexabilidade:
- `<header>` e `<nav>`: Estruturação consistente do menu de navegação responsivo em todas as páginas;
- `<main id="main-content">`: Identificação clara da área de conteúdo primordial, permitindo o uso de atalhos de salto (*skip link*);
- `<section>` e `<article>`: Isolamento de blocos de conteúdo autônomo (cards de vagas, depoimentos e objetivos da ONU);
- `<aside>`: Delimitação das barras de filtros laterais e de acessibilidade superior;
- `<figure>` e `<figcaption>`: Apresentação acessível da galeria de fotos e registros da instituição parceira;
- `<footer>`: Rodapé com direitos, navegação secundária e referências à Agenda 2030;
- `<fieldset>` e `<legend>`: Agrupamento temático de campos no formulário de cadastro.

### 4.2 Utilização do CSS3 Customizado
O arquivo `css/style.css` complementa o framework Bootstrap por meio de:
- **Variáveis CSS (`:root`):** Padronização de cores primárias, secundárias e as cores oficiais dos ODS 4 (`#c5192d`), ODS 10 (`#dd1367`) e ODS 17 (`#19486a`);
- **Componente Stepper:** Linha de progresso visual com estados numéricos dinâmicos para o fluxo de inscrição;
- **Transições e Sombras:** Efeitos suaves de *hover* em cards (`--cv-shadow-md` e `--cv-shadow-lg`);
- **Modo Alto Contraste:** Estilos preparados para garantir legibilidade máxima sob diferentes condições visuais;
- **Media Queries para Redução de Movimento:** Suporte a `@media (prefers-reduced-motion: reduce)`.

### 4.3 Utilização do Bootstrap 5.3
O framework Bootstrap 5.3 foi utilizado para assegurar uma base responsiva sólida através de:
- **Grid System e Breakpoints:** Uso de classes como `col-12 col-md-6 col-lg-4` para adaptação fluida em telas móveis, tablets e monitores *desktop*;
- **Navbar Responsiva:** Menu hambúrguer colapsável com transição animada e suporte a dispositivos touch;
- **Abas Nav-Pills:** Navegação intuitiva entre os módulos de Vagas, Solicitações e Voluntários no Painel de Gestão;
- **Modais Interativos:** Componentes de detalhes, edição e confirmação de candidatura no mural de vagas e painel administrativo;
- **Bootstrap Icons:** Conjunto padronizado de ícones vetoriais com suporte a leitores de tela via `aria-hidden="true"`.

---

## 5. USABILIDADE E ACESSIBILIDADE (WCAG 2.1 AA)

1. **Contraste de Cores:** Combinações de fundo e primeiro plano calculadas com razão de contraste superior a 4.5:1 para texto normal;
2. **Link de Salto de Navegação (*Skip Link*):** Permite a usuários de teclado ou leitores de tela saltar diretamente para `<main>`;
3. **Indicador de Foco Visível (`:focus-visible`):** Destaque em azul (#0d6efd) com espessura de 3px e deslocamento em todos os campos e links;
4. **Controles de Redimensionamento de Fonte:** Botões funcionais "A+" e "A-" na barra superior;
5. **Textos Alternativos e Descrições:** Atributos `alt` e elementos `<figcaption>` em todas as imagens e gráficos;
6. **Formulários Rótulo-Entrada:** Associação explícita entre `<label for="id">` e `<input id="id">`.

---

## 6. DESCRIÇÃO DA PRIMEIRA VERSÃO E CAPTURAS DE TELA

### 6.1 Página Inicial (`index.html`)
Apresenta a proposta de valor do projeto, o painel de impacto com indicadores estatísticos (+1.250h doadas, +85 ONGs), os cards explicativos dos ODS 4, 10 e 17, o fluxo da jornada do voluntário e a vitrine de vagas em destaque.

![Figura 1: Página Inicial](/home/welielton/Documents/ADS/projetoWEB/assets/images/mockup_index.jpg)

### 6.2 Mural de Vagas Sociais (`vagas.html`)
Mural público com barra de busca em tempo real e filtros laterais semânticos (`<aside>`) por área de atuação e modalidade (remoto/presencial). Cada card exibe badges de ODS, tags de habilidades e botão modal para inscrição imediata.

![Figura 2: Mural de Vagas](/home/welielton/Documents/ADS/projetoWEB/assets/images/mockup_vagas.jpg)

### 6.3 Inscrição de Voluntários — Stepper (`cadastro.html`)
Formulário semântico estruturado em 4 etapas guiadas (Stepper visual) para coleta de competências, horários e motivação, com validação nativa e persistência no `LocalStorage`.

![Figura 3: Inscrição de Voluntários](/home/welielton/Documents/ADS/projetoWEB/assets/images/mockup_cadastro.jpg)

### 6.4 Painel de Gestão e Operações CRUD (`gestao.html`)
Módulo administrativo com dashboard de métricas e gerenciamento de dados: cadastro de novas vagas com modal, edição de dados de oportunidades existentes, aprovação/recusa de solicitações e exclusão segura.

![Figura 4: Painel de Gestão Administrativa](/home/welielton/Documents/ADS/projetoWEB/assets/images/mockup_gestao.jpg)

---

## 7. FUNCIONALIDADES PREVISTAS E QUADRO COMPARATIVO

| Recurso / Módulo | Etapa 1 (Nota 1) - Atual | Etapa 2 (Nota 2) - Previsto | Etapa 3 (Nota 3) - Final |
| :--- | :--- | :--- | :--- |
| **Interface & Layout** | HTML5 Semântico + Bootstrap 5.3 | Componentização Modular JS | Refinamento Visual e UX final |
| **Armazenamento** | LocalStorage no Navegador | Consumo de API REST / JSON Server | Backend / Banco Integrado |
| **Gestão de Vagas** | CRUD Completo (Criar, Editar, Excluir) | Filtros Assíncronos e Paginação | Dashboard com Relatórios Gráficos |
| **Candidaturas** | Triagem (Aprovar / Recusar / Excluir) | Notificações e E-mail Automático | Fluxo Completo de Admissão da ONG |
| **Acessibilidade** | WCAG 2.1 AA (Contraste e Foco) | Testes com Leitores de Tela | Auditoria e Teste com Usuários |

---

## 8. CONCLUSÃO E PRÓXIMOS PASSOS (PLANEJAMENTO NOTAS 2 E 3)

A entrega da **Nota 1** cumpriu integralmente todos os requisitos solicitados, estabelecendo uma fundação sólida, semântica, responsiva e esteticamente agradável.

### Planejamento para as Etapas Seguintes:
- **Nota 2 (Interatividade e Consumo de Dados):**
  - Integração com API REST simulada (JSON Server / Fetch API) para persistência real de voluntários e vagas;
  - Validação assíncrona avançada de formulários com feedback em tempo real;
  - Componentização modular em JavaScript moderno (ES6 Modules).
- **Nota 3 (Refinamento e Apresentação no Polo):**
  - Realização de testes práticos de usabilidade com usuários e ONGs reais;
  - Otimização de performance (Core Web Vitals);
  - Preparação do material de apresentação perante a banca examinadora no polo educacional.

---

## 9. FONTES E REFERÊNCIAS CONSULTADAS

1. **Nações Unidas Brasil (ONU):** *Objetivos de Desenvolvimento Sustentável (Agenda 2030)*. Disponível em: <https://brasil.un.org/pt-br/sdgs>. Acesso em: 2026.
2. **Bootstrap Framework:** *Bootstrap 5.3 Documentation*. Licença MIT. Disponível em: <https://getbootstrap.com/>. Acesso em: 2026.
3. **W3C / Web Accessibility Initiative (WAI):** *Web Content Accessibility Guidelines (WCAG) 2.1*. Disponível em: <https://www.w3.org/WAI/>.
4. **Legislação Brasileira:** *Lei do Voluntariado (Lei nº 9.608/1998)* e *Lei Geral de Proteção de Dados (Lei nº 13.709/2018)*.
