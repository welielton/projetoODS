/**
 * Conecta Voluntário - JavaScript Completo com CRUD e Persistência
 * Versão 1.2 (Nota 1 Avançada)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initStorageDefaults();
  initJobFilters();
  initPublicJobsGrid();
  initMultiStepForm();
  initAccessibilityControls();
  initApplicationModal();
  initVolunteerPanel();
  initUserAuth();
  initGestaoDashboard();
});

/* ==========================================================================
   DADOS PADRÃO (INITIAL STATE NO LOCALSTORAGE)
   ========================================================================== */
const DEFAULT_VAGAS = [
  {
    id: 'vaga-1',
    title: 'Professor(a) de Reforço de Matemática',
    ngo: 'Instituto Saber & Futuro',
    ods: 'ODS 4: Educação de Qualidade',
    odsBadge: 'var(--ods-4)',
    area: 'educacao',
    modality: 'remoto',
    modalityLabel: '100% Remoto',
    hours: '2h/semana',
    location: 'Brasil (Online)',
    skills: 'Matemática, Didática, 2h/semana',
    desc: 'Aulas online semanais de reforço para jovens do 9º ano da rede pública em preparação para vestibulares e cursos técnicos.',
    status: 'Ativa'
  },
  {
    id: 'vaga-2',
    title: 'Designer Gráfico para Campanhas Sociais',
    ngo: 'Coletivo Vozes da Periferia',
    ods: 'ODS 17: Parcerias e Meios',
    odsBadge: 'var(--ods-17)',
    area: 'comunicacao',
    modality: 'remoto',
    modalityLabel: '100% Remoto',
    hours: '3h/semana',
    location: 'Brasil (Online)',
    skills: 'Canva / Figma, Redes Sociais, 3h/semana',
    desc: 'Criação de peças visuais e identidade para campanhas de arrecadação de agasalhos e cestas básicas nas redes sociais.',
    status: 'Ativa'
  },
  {
    id: 'vaga-3',
    title: 'Instrutor de Inclusão Digital e Informática',
    ngo: 'Associação Mãos Que Acolhem',
    ods: 'ODS 10: Redução das Desigualdades',
    odsBadge: 'var(--ods-10)',
    area: 'tecnologia',
    modality: 'presencial',
    modalityLabel: 'Presencial',
    hours: '4h/sábado',
    location: 'São Paulo - SP',
    skills: 'Informática, Empatia, 4h/sábado',
    desc: 'Ensino de informática básica (digitação, navegação segura, elaboração de currículos) para jovens e idosos da comunidade.',
    status: 'Ativa'
  },
  {
    id: 'vaga-4',
    title: 'Desenvolvedor(a) Web Front-end Voluntário',
    ngo: 'Rede Solidária Brasil',
    ods: 'ODS 17: Parcerias e Meios',
    odsBadge: 'var(--ods-17)',
    area: 'tecnologia',
    modality: 'remoto',
    modalityLabel: '100% Remoto',
    hours: '4h/semana',
    location: 'Brasil (Online)',
    skills: 'HTML / CSS, Bootstrap, 4h/semana',
    desc: 'Auxílio na manutenção e aprimoramento do portal de transparência e captação de recursos da ONG com HTML, CSS e JavaScript.',
    status: 'Ativa'
  },
  {
    id: 'vaga-5',
    title: 'Orientador(a) Pedagógico de Alfabetização',
    ngo: 'Instituto Saber & Futuro',
    ods: 'ODS 4: Educação de Qualidade',
    odsBadge: 'var(--ods-4)',
    area: 'educacao',
    modality: 'hibrido',
    modalityLabel: 'Híbrido',
    hours: '3h/semana',
    location: 'Campinas - SP',
    skills: 'Pedagogia / Letras, EJA, 3h/semana',
    desc: 'Planejamento de atividades lúdicas e materiais de apoio para alfabetização de jovens e adultos (EJA).',
    status: 'Ativa'
  },
  {
    id: 'vaga-6',
    title: 'Apoio em Triagem Social e Atendimento',
    ngo: 'Associação Mãos Que Acolhem',
    ods: 'ODS 10: Redução das Desigualdades',
    odsBadge: 'var(--ods-10)',
    area: 'social',
    modality: 'presencial',
    modalityLabel: 'Presencial',
    hours: '4h/semana',
    location: 'São Paulo - SP',
    skills: 'Serviço Social, Atendimento, 4h/semana',
    desc: 'Recepção e cadastro de famílias em situação de vulnerabilidade para encaminhamento a programas de auxílio.',
    status: 'Ativa'
  }
];

const DEFAULT_SOLICITACOES = [
  {
    id: 'sol-1',
    volunteerName: 'Larissa Medeiros',
    jobTitle: 'Professor(a) de Reforço de Matemática',
    ngo: 'Instituto Saber & Futuro',
    contact: 'larissa@email.com',
    date: '28/08/2026',
    status: 'Pendente'
  },
  {
    id: 'sol-2',
    volunteerName: 'Carlos Eduardo Silva',
    jobTitle: 'Designer Gráfico para Campanhas Sociais',
    ngo: 'Coletivo Vozes da Periferia',
    contact: 'carlos.design@email.com',
    date: '29/08/2026',
    status: 'Aprovada'
  },
  {
    id: 'sol-3',
    volunteerName: 'Lucas Felipe Souza',
    jobTitle: 'Desenvolvedor(a) Web Front-end Voluntário',
    ngo: 'Rede Solidária Brasil',
    contact: 'lucas.felipe@email.com',
    date: '30/08/2026',
    status: 'Pendente'
  },
  {
    id: 'sol-4',
    volunteerName: 'Ana Beatriz Rocha',
    jobTitle: 'Apoio em Triagem Social e Atendimento',
    ngo: 'Associação Mãos Que Acolhem',
    contact: 'anabeatriz@email.com',
    date: '30/08/2026',
    status: 'Pendente'
  },
  {
    id: 'sol-5',
    volunteerName: 'Mariana Costa',
    jobTitle: 'Instrutor de Inclusão Digital e Informática',
    ngo: 'Associação Mãos Que Acolhem',
    contact: 'mariana.costa@email.com',
    date: '27/08/2026',
    status: 'Recusada'
  }
];

const DEFAULT_VOLUNTARIOS = [
  {
    id: 'vol-1',
    name: 'Larissa Medeiros',
    email: 'larissa.medeiros@email.com',
    phone: '(11) 98765-4321',
    city: 'São Paulo / SP',
    area: 'Educação / Pedagogia (ODS 4)',
    areaKey: 'educacao',
    skills: 'Matemática Básica, Didática Infantil, Alfabetização',
    modality: '100% Remoto (Online)',
    hours: '3 horas semanais (Sábados)',
    motivation: 'Desejo aplicar os conceitos pedagógicos que aprendo na faculdade para ajudar crianças do ensino fundamental a superarem dificuldades em matemática.',
    status: 'Disponível'
  },
  {
    id: 'vol-2',
    name: 'Carlos Eduardo Silva',
    email: 'carlos.design@email.com',
    phone: '(41) 99123-8877',
    city: 'Curitiba / PR',
    area: 'Design & Comunicação (ODS 17)',
    areaKey: 'design',
    skills: 'Figma, Canva, Identidade Visual, Posts para Instagram',
    modality: '100% Remoto (Online)',
    hours: '4 horas semanais',
    motivation: 'Quero apoiar instituições sociais a profissionalizarem sua comunicação visual para aumentar o engajamento e as doações.',
    status: 'Ativo'
  },
  {
    id: 'vol-3',
    name: 'Ana Beatriz Rocha',
    email: 'anabeatriz.social@email.com',
    phone: '(19) 98112-3344',
    city: 'Campinas / SP',
    area: 'Assistência Social & Inclusão (ODS 10)',
    areaKey: 'social',
    skills: 'Triagem de Famílias, Acolhimento Humanizado, Encaminhamentos',
    modality: 'Presencial (Campinas/SP)',
    hours: '4 horas aos sábados',
    motivation: 'Acredito na escuta qualificada como motor de transformação comunitária.',
    status: 'Em Contato'
  },
  {
    id: 'vol-4',
    name: 'Lucas Felipe Souza',
    email: 'lucas.felipe@email.com',
    phone: '(31) 98844-5566',
    city: 'Belo Horizonte / MG',
    area: 'Tecnologia da Informação & Web (ODS 4 e 17)',
    areaKey: 'tecnologia',
    skills: 'Desenvolvimento Web Front-End, Manutenção de Sites, Informática',
    modality: '100% Remoto',
    hours: '3 horas semanais',
    motivation: 'Estudante de ADS com vontade de construir soluções digitais para ONGs.',
    status: 'Disponível'
  }
];

function initStorageDefaults() {
  if (!localStorage.getItem('conecta_vagas')) {
    localStorage.setItem('conecta_vagas', JSON.stringify(DEFAULT_VAGAS));
  }
  if (!localStorage.getItem('conecta_solicitacoes')) {
    localStorage.setItem('conecta_solicitacoes', JSON.stringify(DEFAULT_SOLICITACOES));
  }
  if (!localStorage.getItem('conecta_voluntarios')) {
    localStorage.setItem('conecta_voluntarios', JSON.stringify(DEFAULT_VOLUNTARIOS));
  }
}

/* ==========================================================================
   1. NAVBAR & EFEITO DE ROLAGEM
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-sm');
    } else {
      navbar.classList.remove('shadow-sm');
    }
  });
}

/* ==========================================================================
   2. RENDERIZAÇÃO DINÂMICA DO MURAL DE VAGAS (VAGAS.HTML)
   ========================================================================== */
function initPublicJobsGrid() {
  const gridContainer = document.getElementById('jobsGridContainer');
  if (!gridContainer) return;

  const vagas = JSON.parse(localStorage.getItem('conecta_vagas') || '[]');
  if (!vagas.length) return;

  gridContainer.innerHTML = '';

  vagas.forEach(vaga => {
    const col = document.createElement('div');
    col.className = 'col-md-6 job-item-col';

    let badgeClass = 'job-badge-remoto';
    let badgeIcon = 'bi-laptop';
    if (vaga.modality === 'presencial') {
      badgeClass = 'job-badge-presencial';
      badgeIcon = 'bi-geo-alt';
    } else if (vaga.modality === 'hibrido') {
      badgeClass = 'job-badge-hibrido';
      badgeIcon = 'bi-shuffle';
    }

    const skillsHtml = vaga.skills.split(',').map(s => `<span class="job-skill-tag">${s.trim()}</span>`).join('');

    col.innerHTML = `
      <article class="job-card" data-title="${vaga.title}" data-area="${vaga.area}" data-modality="${vaga.modality}" data-ngo="${vaga.ngo}">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span class="badge ${badgeClass}"><i class="bi ${badgeIcon} me-1"></i> ${vaga.modalityLabel || vaga.modality}</span>
          <span class="badge" style="background-color: ${vaga.odsBadge || '#0d6efd'};">${vaga.ods || 'ODS'}</span>
        </div>
        <h3 class="h5 fw-bold text-dark mb-1">${vaga.title}</h3>
        <p class="text-muted small mb-2">
          <i class="bi bi-building me-1 text-primary"></i> ${vaga.ngo}
        </p>
        <p class="small text-secondary flex-grow-1">
          ${vaga.desc}
        </p>
        <div class="mb-3">
          ${skillsHtml}
        </div>
        <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
          <span class="text-muted small"><i class="bi bi-geo-alt me-1"></i> ${vaga.location || 'Brasil'}</span>
          <button class="btn btn-sm btn-primary rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#jobDetailsModal"
            data-job-id="${vaga.id}"
            data-job-title="${vaga.title}"
            data-job-ngo="${vaga.ngo}"
            data-job-location="${vaga.location || 'Remoto / Presencial'}"
            data-job-ods="${vaga.ods}"
            data-job-hours="${vaga.hours}"
            data-job-desc="${vaga.desc}">
            Candidatar-se
          </button>
        </div>
      </article>
    `;

    gridContainer.appendChild(col);
  });

  const countBadge = document.getElementById('jobsCountBadge');
  if (countBadge) {
    countBadge.textContent = `${vagas.length} vaga${vagas.length !== 1 ? 's' : ''} disponível${vagas.length !== 1 ? 'is' : ''}`;
  }
}

/* ==========================================================================
   3. FILTROS INTERATIVOS DO MURAL DE VAGAS
   ========================================================================== */
function initJobFilters() {
  const searchInput = document.getElementById('searchJobInput');
  const areaCheckboxes = document.querySelectorAll('.filter-area-checkbox');
  const modalityRadios = document.querySelectorAll('input[name="modalidadeFilter"]');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  function filterJobs() {
    const jobCards = document.querySelectorAll('.job-item-col');
    const resultsCounter = document.getElementById('jobsCountBadge');
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    const selectedAreas = [];
    areaCheckboxes.forEach(cb => {
      if (cb.checked) selectedAreas.push(cb.value.toLowerCase());
    });

    let selectedModality = 'todas';
    modalityRadios.forEach(radio => {
      if (radio.checked) selectedModality = radio.value.toLowerCase();
    });

    let visibleCount = 0;

    jobCards.forEach(col => {
      const card = col.querySelector('.job-card');
      if (!card) return;

      const title = card.getAttribute('data-title')?.toLowerCase() || '';
      const area = card.getAttribute('data-area')?.toLowerCase() || '';
      const modality = card.getAttribute('data-modality')?.toLowerCase() || '';
      const ngo = card.getAttribute('data-ngo')?.toLowerCase() || '';
      const description = card.textContent.toLowerCase();

      const matchSearch = !searchText || title.includes(searchText) || ngo.includes(searchText) || description.includes(searchText);
      const matchArea = selectedAreas.length === 0 || selectedAreas.includes(area);
      const matchModality = selectedModality === 'todas' || modality === selectedModality;

      if (matchSearch && matchArea && matchModality) {
        col.style.display = 'block';
        visibleCount++;
      } else {
        col.style.display = 'none';
      }
    });

    if (resultsCounter) {
      resultsCounter.textContent = `${visibleCount} vaga${visibleCount !== 1 ? 's' : ''} encontrada${visibleCount !== 1 ? 's' : ''}`;
    }

    const noResultsMsg = document.getElementById('noResultsMessage');
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) searchInput.addEventListener('input', filterJobs);
  areaCheckboxes.forEach(cb => cb.addEventListener('change', filterJobs));
  modalityRadios.forEach(radio => radio.addEventListener('change', filterJobs));

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) searchInput.value = '';
      areaCheckboxes.forEach(cb => cb.checked = false);
      const defaultRadio = document.querySelector('input[name="modalidadeFilter"][value="todas"]');
      if (defaultRadio) defaultRadio.checked = true;
      filterJobs();
    });
  }
}

/* ==========================================================================
   4. FORMULÁRIO DE CADASTRO POR ETAPAS (STEPPER) & LOCALSTORAGE
   ========================================================================== */
function initMultiStepForm() {
  const form = document.getElementById('volunteerMultiStepForm');
  if (!form) return;

  const steps = document.querySelectorAll('.form-step-section');
  const stepIndicators = document.querySelectorAll('.step-item');
  const progressBar = document.querySelector('.stepper-progress');
  const nextBtns = document.querySelectorAll('.btn-next-step');
  const prevBtns = document.querySelectorAll('.btn-prev-step');

  let currentStep = 1;
  const totalSteps = steps.length;

  function updateStepView() {
    steps.forEach((step, index) => {
      const stepNum = index + 1;
      if (stepNum === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    stepIndicators.forEach((indicator, index) => {
      const stepNum = index + 1;
      indicator.classList.remove('active', 'completed');
      if (stepNum === currentStep) {
        indicator.classList.add('active');
      } else if (stepNum < currentStep) {
        indicator.classList.add('completed');
      }
    });

    if (progressBar) {
      const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    window.scrollTo({ top: form.offsetTop - 80, behavior: 'smooth' });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStepEl = document.querySelector(`.form-step-section[data-step="${currentStep}"]`);
      const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.checkValidity()) {
          input.reportValidity();
          isValid = false;
        }
      });

      if (isValid && currentStep < totalSteps) {
        currentStep++;
        updateStepView();
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepView();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newVolunteer = {
      id: `vol-${Date.now()}`,
      name: document.getElementById('inputNome')?.value || 'Novo Voluntário',
      email: document.getElementById('inputEmail')?.value || 'email@exemplo.com',
      phone: document.getElementById('inputTelefone')?.value || '(00) 00000-0000',
      city: `${document.getElementById('inputCidade')?.value || 'Cidade'} / ${document.getElementById('selectEstado')?.value || 'UF'}`,
      area: document.getElementById('selectOcupacao')?.options[document.getElementById('selectOcupacao')?.selectedIndex]?.text || 'Educação / Social',
      areaKey: document.getElementById('selectOcupacao')?.value || 'educacao',
      skills: document.getElementById('inputHabilidadesEspecificas')?.value || 'Ensino, Apoio Comunitário',
      modality: document.querySelector('input[name="radioModalidadeForm"]:checked')?.value === 'remoto' ? '100% Remoto (Online)' : 'Presencial / Híbrido',
      hours: `${document.getElementById('selectHorasSemana')?.value || '3-5'} horas semanais`,
      motivation: document.getElementById('textareaMotivacao')?.value || 'Desejo contribuir para causas sociais transformadoras.',
      status: 'Disponível'
    };

    try {
      const savedVolunteers = JSON.parse(localStorage.getItem('conecta_voluntarios') || '[]');
      savedVolunteers.unshift(newVolunteer);
      localStorage.setItem('conecta_voluntarios', JSON.stringify(savedVolunteers));
    } catch (err) {
      console.warn('Erro ao salvar no LocalStorage:', err);
    }

    const successCard = document.getElementById('formSuccessMessage');
    const formCard = document.getElementById('formCardBody');
    
    if (successCard && formCard) {
      formCard.style.display = 'none';
      successCard.classList.remove('d-none');
      window.scrollTo({ top: successCard.offsetTop - 80, behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   5. PAINEL DE GESTÃO ADMINISTRATIVA (GESTAO.HTML) - CRUD COMPLETO
   ========================================================================== */
function initGestaoDashboard() {
  const listaVagasBody = document.getElementById('listaGestaoVagasBody');
  const listaSolicitacoesBody = document.getElementById('listaGestaoSolicitacoesBody');
  const listaVoluntariosBody = document.getElementById('listaGestaoVoluntariosBody');

  if (!listaVagasBody && !listaSolicitacoesBody && !listaVoluntariosBody) return;

  function showGestaoAlert(msg, isDanger = false) {
    const alertEl = document.getElementById('gestaoGlobalAlert');
    const msgEl = document.getElementById('gestaoAlertMessage');
    const iconEl = document.getElementById('gestaoAlertIcon');
    if (!alertEl || !msgEl) return;

    msgEl.textContent = msg;
    alertEl.className = `alert alert-${isDanger ? 'danger' : 'success'} alert-dismissible fade show mb-4 shadow-sm`;
    if (iconEl) {
      iconEl.className = `bi bi-${isDanger ? 'exclamation-triangle-fill' : 'check-circle-fill'} me-2`;
    }
    alertEl.classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- RENDERIZAR TABELA DE VAGAS (CRUD) ---
  function renderVagasTable() {
    const vagas = JSON.parse(localStorage.getItem('conecta_vagas') || '[]');
    if (!listaVagasBody) return;

    listaVagasBody.innerHTML = '';
    
    if (!vagas.length) {
      listaVagasBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Nenhuma vaga cadastrada. Clique em "Cadastrar Nova Vaga".</td></tr>`;
    } else {
      vagas.forEach((vaga, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="ps-3">
            <strong class="d-block text-dark">${vaga.title}</strong>
            <small class="text-muted"><i class="bi bi-building me-1"></i>${vaga.ngo}</small>
          </td>
          <td><span class="badge" style="background-color: ${vaga.odsBadge || '#0d6efd'};">${vaga.ods || 'ODS'}</span></td>
          <td><span class="badge ${vaga.modality === 'remoto' ? 'job-badge-remoto' : (vaga.modality === 'presencial' ? 'job-badge-presencial' : 'job-badge-hibrido')}">${vaga.modalityLabel || vaga.modality}</span></td>
          <td><small class="text-muted">${vaga.hours}</small></td>
          <td><span class="badge ${vaga.status === 'Ativa' ? 'bg-success' : (vaga.status === 'Pausada' ? 'bg-warning text-dark' : 'bg-secondary')}">${vaga.status || 'Ativa'}</span></td>
          <td class="text-end pe-3">
            <button class="btn btn-sm btn-outline-primary btn-edit-vaga me-1" data-vaga-id="${vaga.id}" title="Editar Vaga">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger btn-delete-vaga" data-vaga-id="${vaga.id}" data-vaga-title="${vaga.title}" title="Excluir Vaga">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        `;
        listaVagasBody.appendChild(tr);
      });
    }

    // Atualizar Contadores
    const countVagasEl = document.getElementById('dashTotalVagas');
    const badgeCountVagas = document.getElementById('badgeCountVagas');
    if (countVagasEl) countVagasEl.textContent = vagas.length;
    if (badgeCountVagas) badgeCountVagas.textContent = vagas.length;
  }

  // --- RENDERIZAR TABELA DE SOLICITAÇÕES / CANDIDATURAS (CRUD) ---
  function renderSolicitacoesTable() {
    const solicitacoes = JSON.parse(localStorage.getItem('conecta_solicitacoes') || '[]');
    if (!listaSolicitacoesBody) return;

    listaSolicitacoesBody.innerHTML = '';

    if (!solicitacoes.length) {
      listaSolicitacoesBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Nenhuma solicitação pendente no momento.</td></tr>`;
    } else {
      solicitacoes.forEach(sol => {
        let statusBadge = 'bg-warning text-dark';
        if (sol.status === 'Aprovada') statusBadge = 'bg-success text-white';
        if (sol.status === 'Recusada') statusBadge = 'bg-danger text-white';

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="ps-3">
            <strong class="d-block text-dark">${sol.volunteerName}</strong>
            <small class="text-muted">${sol.contact}</small>
          </td>
          <td>
            <strong class="d-block small text-dark">${sol.jobTitle}</strong>
            <small class="text-muted"><i class="bi bi-building me-1"></i>${sol.ngo}</small>
          </td>
          <td><small class="text-muted">${sol.contact}</small></td>
          <td><small class="text-muted">${sol.date || 'Hoje'}</small></td>
          <td><span class="badge ${statusBadge}">${sol.status}</span></td>
          <td class="text-end pe-3">
            <button class="btn btn-sm btn-outline-success btn-approve-sol me-1" data-sol-id="${sol.id}" title="Aprovar Candidato">
              <i class="bi bi-check-lg"></i>
            </button>
            <button class="btn btn-sm btn-outline-warning btn-reject-sol me-1" data-sol-id="${sol.id}" title="Recusar Solicitação">
              <i class="bi bi-x-lg"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger btn-delete-sol" data-sol-id="${sol.id}" title="Excluir Registro">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        listaSolicitacoesBody.appendChild(tr);
      });
    }

    const countSolEl = document.getElementById('dashTotalSolicitacoes');
    const badgeCountSol = document.getElementById('badgeCountSolicitacoes');
    if (countSolEl) countSolEl.textContent = solicitacoes.length;
    if (badgeCountSol) badgeCountSol.textContent = solicitacoes.length;
  }

  // --- RENDERIZAR TABELA DE VOLUNTÁRIOS (CRUD) ---
  function renderVoluntariosTable() {
    const voluntarios = JSON.parse(localStorage.getItem('conecta_voluntarios') || '[]');
    if (!listaVoluntariosBody) return;

    listaVoluntariosBody.innerHTML = '';

    if (!voluntarios.length) {
      listaVoluntariosBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Nenhum voluntário cadastrado no banco de talentos.</td></tr>`;
    } else {
      voluntarios.forEach(v => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="ps-3">
            <strong class="d-block text-dark">${v.name}</strong>
            <small class="text-muted"><i class="bi bi-geo-alt me-1"></i>${v.city || 'Brasil'}</small>
          </td>
          <td>
            <strong class="d-block small text-dark">${v.area || 'Geral'}</strong>
            <small class="text-muted">${v.skills}</small>
          </td>
          <td>
            <span class="badge job-badge-remoto mb-1">${v.modality}</span>
            <small class="d-block text-muted">${v.hours}</small>
          </td>
          <td><span class="badge bg-success-subtle text-success border border-success-subtle">${v.status || 'Disponível'}</span></td>
          <td class="text-end pe-3">
            <button class="btn btn-sm btn-outline-danger btn-delete-vol" data-vol-id="${v.id}" data-vol-name="${v.name}" title="Excluir Voluntário">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        `;
        listaVoluntariosBody.appendChild(tr);
      });
    }

    const countVolEl = document.getElementById('dashTotalVoluntarios');
    const badgeCountVol = document.getElementById('badgeCountVoluntarios');
    if (countVolEl) countVolEl.textContent = voluntarios.length;
    if (badgeCountVol) badgeCountVol.textContent = voluntarios.length;
  }

  // Inicializar todas as tabelas
  renderVagasTable();
  renderSolicitacoesTable();
  renderVoluntariosTable();

  // --- CADASTRAR NOVA VAGA (FORMULÁRIO MODAL) ---
  const formNovaVaga = document.getElementById('formCadastrarNovaVaga');
  if (formNovaVaga) {
    formNovaVaga.addEventListener('submit', (e) => {
      e.preventDefault();

      const titulo = document.getElementById('vagaTitulo')?.value;
      const ong = document.getElementById('vagaOng')?.value;
      const ods = document.getElementById('vagaOds')?.value;
      const area = document.getElementById('vagaArea')?.value;
      const modalidade = document.getElementById('vagaModalidade')?.value;
      const horas = document.getElementById('vagaHoras')?.value;
      const localizacao = document.getElementById('vagaLocalizacao')?.value || 'Brasil (Online)';
      const skills = document.getElementById('vagaSkills')?.value || 'Geral';
      const desc = document.getElementById('vagaDescricao')?.value;

      let odsBadge = 'var(--ods-4)';
      if (ods.includes('10')) odsBadge = 'var(--ods-10)';
      if (ods.includes('17')) odsBadge = 'var(--ods-17)';

      let modLabel = '100% Remoto';
      if (modalidade === 'presencial') modLabel = 'Presencial';
      if (modalidade === 'hibrido') modLabel = 'Híbrido';

      const novaVaga = {
        id: `vaga-${Date.now()}`,
        title: titulo,
        ngo: ong,
        ods: ods.split(':')[0],
        odsBadge: odsBadge,
        area: area,
        modality: modalidade,
        modalityLabel: modLabel,
        hours: horas,
        location: localizacao,
        skills: skills,
        desc: desc,
        status: 'Ativa'
      };

      const vagas = JSON.parse(localStorage.getItem('conecta_vagas') || '[]');
      vagas.unshift(novaVaga);
      localStorage.setItem('conecta_vagas', JSON.stringify(vagas));

      renderVagasTable();

      const modalEl = document.getElementById('modalNovaVaga');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
      formNovaVaga.reset();

      showGestaoAlert(`A vaga "${titulo}" foi publicada com sucesso e já está disponível no Mural de Vagas!`);
    });
  }

  // --- EDITAR VAGA SOCIAL (FORMULÁRIO MODAL) ---
  const formEditarVaga = document.getElementById('formEditarVaga');
  if (formEditarVaga) {
    formEditarVaga.addEventListener('submit', (e) => {
      e.preventDefault();

      const vagaId = document.getElementById('editVagaId')?.value;
      const titulo = document.getElementById('editVagaTitulo')?.value;
      const ong = document.getElementById('editVagaOng')?.value;
      const ods = document.getElementById('editVagaOds')?.value;
      const area = document.getElementById('editVagaArea')?.value;
      const modalidade = document.getElementById('editVagaModalidade')?.value;
      const horas = document.getElementById('editVagaHoras')?.value;
      const localizacao = document.getElementById('editVagaLocalizacao')?.value || 'Brasil (Online)';
      const status = document.getElementById('editVagaStatus')?.value || 'Ativa';
      const skills = document.getElementById('editVagaSkills')?.value || 'Geral';
      const desc = document.getElementById('editVagaDescricao')?.value;

      let odsBadge = 'var(--ods-4)';
      if (ods.includes('10')) odsBadge = 'var(--ods-10)';
      if (ods.includes('17')) odsBadge = 'var(--ods-17)';

      let modLabel = '100% Remoto';
      if (modalidade === 'presencial') modLabel = 'Presencial';
      if (modalidade === 'hibrido') modLabel = 'Híbrido';

      let vagas = JSON.parse(localStorage.getItem('conecta_vagas') || '[]');
      const index = vagas.findIndex(v => v.id === vagaId);

      if (index !== -1) {
        vagas[index] = {
          ...vagas[index],
          title: titulo,
          ngo: ong,
          ods: ods.split(':')[0],
          odsBadge: odsBadge,
          area: area,
          modality: modalidade,
          modalityLabel: modLabel,
          hours: horas,
          location: localizacao,
          status: status,
          skills: skills,
          desc: desc
        };

        localStorage.setItem('conecta_vagas', JSON.stringify(vagas));
        renderVagasTable();

        const modalEl = document.getElementById('modalEditarVaga');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        showGestaoAlert(`A vaga "${titulo}" foi editada e atualizada com sucesso!`);
      }
    });
  }

  // --- GERENCIAMENTO DE CLIQUES NAS TABELAS (EXCLUSÃO / EDIÇÃO / APROVAÇÃO) ---
  let pendingDeleteAction = null;
  const modalExclusaoEl = document.getElementById('modalConfirmarExclusao');
  let modalExclusaoInstance = null;
  if (modalExclusaoEl) {
    modalExclusaoInstance = new bootstrap.Modal(modalExclusaoEl);
  }

  // Abrir Modal de Edição de Vaga
  document.addEventListener('click', (e) => {
    const btnEditVaga = e.target.closest('.btn-edit-vaga');
    if (btnEditVaga) {
      const vagaId = btnEditVaga.getAttribute('data-vaga-id');
      const vagas = JSON.parse(localStorage.getItem('conecta_vagas') || '[]');
      const vaga = vagas.find(v => v.id === vagaId);

      if (vaga) {
        document.getElementById('editVagaId').value = vaga.id;
        document.getElementById('editVagaTitulo').value = vaga.title;
        document.getElementById('editVagaOng').value = vaga.ngo;

        const selectOds = document.getElementById('editVagaOds');
        if (selectOds) {
          for (let opt of selectOds.options) {
            if (opt.value.includes(vaga.ods) || vaga.ods.includes(opt.value)) {
              selectOds.value = opt.value;
              break;
            }
          }
        }

        document.getElementById('editVagaArea').value = vaga.area || 'educacao';
        document.getElementById('editVagaModalidade').value = vaga.modality || 'remoto';
        document.getElementById('editVagaHoras').value = vaga.hours || '3h/semana';
        document.getElementById('editVagaLocalizacao').value = vaga.location || '';
        document.getElementById('editVagaStatus').value = vaga.status || 'Ativa';
        document.getElementById('editVagaSkills').value = vaga.skills || '';
        document.getElementById('editVagaDescricao').value = vaga.desc || '';

        const modalEditarEl = document.getElementById('modalEditarVaga');
        if (modalEditarEl) {
          const modalEditar = new bootstrap.Modal(modalEditarEl);
          modalEditar.show();
        }
      }
    }

  // Excluir Vaga
  document.addEventListener('click', (e) => {
    const btnDelVaga = e.target.closest('.btn-delete-vaga');
    if (btnDelVaga) {
      const vagaId = btnDelVaga.getAttribute('data-vaga-id');
      const vagaTitle = btnDelVaga.getAttribute('data-vaga-title');
      
      document.getElementById('textoConfirmarExclusao').textContent = `Tem certeza que deseja excluir permanentemente a vaga "${vagaTitle}"? Ela será removida de todo o sistema.`;
      
      pendingDeleteAction = () => {
        let vagas = JSON.parse(localStorage.getItem('conecta_vagas') || '[]');
        vagas = vagas.filter(v => v.id !== vagaId);
        localStorage.setItem('conecta_vagas', JSON.stringify(vagas));
        renderVagasTable();
        showGestaoAlert(`A vaga "${vagaTitle}" foi excluída com sucesso.`, true);
      };

      if (modalExclusaoInstance) modalExclusaoInstance.show();
    }

    // Excluir Voluntário
    const btnDelVol = e.target.closest('.btn-delete-vol');
    if (btnDelVol) {
      const volId = btnDelVol.getAttribute('data-vol-id');
      const volName = btnDelVol.getAttribute('data-vol-name');

      document.getElementById('textoConfirmarExclusao').textContent = `Tem certeza que deseja remover o voluntário "${volName}" do banco de talentos?`;

      pendingDeleteAction = () => {
        let vols = JSON.parse(localStorage.getItem('conecta_voluntarios') || '[]');
        vols = vols.filter(v => v.id !== volId);
        localStorage.setItem('conecta_voluntarios', JSON.stringify(vols));
        renderVoluntariosTable();
        showGestaoAlert(`O voluntário "${volName}" foi removido do banco de talentos.`, true);
      };

      if (modalExclusaoInstance) modalExclusaoInstance.show();
    }

    // Excluir Solicitação
    const btnDelSol = e.target.closest('.btn-delete-sol');
    if (btnDelSol) {
      const solId = btnDelSol.getAttribute('data-sol-id');
      
      document.getElementById('textoConfirmarExclusao').textContent = `Tem certeza que deseja excluir esta solicitação de candidatura?`;

      pendingDeleteAction = () => {
        let sols = JSON.parse(localStorage.getItem('conecta_solicitacoes') || '[]');
        sols = sols.filter(s => s.id !== solId);
        localStorage.setItem('conecta_solicitacoes', JSON.stringify(sols));
        renderSolicitacoesTable();
        showGestaoAlert(`Solicitação excluída com sucesso.`, true);
      };

      if (modalExclusaoInstance) modalExclusaoInstance.show();
    }

    // Aprovar Solicitação
    const btnApproveSol = e.target.closest('.btn-approve-sol');
    if (btnApproveSol) {
      const solId = btnApproveSol.getAttribute('data-sol-id');
      const sols = JSON.parse(localStorage.getItem('conecta_solicitacoes') || '[]');
      const item = sols.find(s => s.id === solId);
      if (item) {
        item.status = 'Aprovada';
        localStorage.setItem('conecta_solicitacoes', JSON.stringify(sols));
        renderSolicitacoesTable();
        showGestaoAlert(`Candidatura de ${item.volunteerName} para "${item.jobTitle}" foi APROVADA!`);
      }
    }

    // Recusar Solicitação
    const btnRejectSol = e.target.closest('.btn-reject-sol');
    if (btnRejectSol) {
      const solId = btnRejectSol.getAttribute('data-sol-id');
      const sols = JSON.parse(localStorage.getItem('conecta_solicitacoes') || '[]');
      const item = sols.find(s => s.id === solId);
      if (item) {
        item.status = 'Recusada';
        localStorage.setItem('conecta_solicitacoes', JSON.stringify(sols));
        renderSolicitacoesTable();
        showGestaoAlert(`Candidatura de ${item.volunteerName} foi marcada como RECUSADA.`, true);
      }
    }
  });

  // Botão do Modal de Confirmação Final de Exclusão
  const btnConfirmDelete = document.getElementById('btnConfirmarExclusaoFinal');
  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', () => {
      if (pendingDeleteAction) {
        pendingDeleteAction();
        pendingDeleteAction = null;
      }
      if (modalExclusaoInstance) modalExclusaoInstance.hide();
    });
  }
}

/* ==========================================================================
   6. AUTENTICAÇÃO DE USUÁRIO (LOGIN & CADASTRO)
   ========================================================================== */
function initUserAuth() {
  const registerForm = document.getElementById('userRegisterForm');
  const loginForm = document.getElementById('userLoginForm');

  // Ajuste visual dinâmico CPF vs CNPJ
  const roleRadios = document.querySelectorAll('input[name="userRole"]');
  const docLabel = document.getElementById('labelDocumento');
  const docInput = document.getElementById('regDocumento');

  if (roleRadios.length && docLabel && docInput) {
    roleRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'gestor_ong') {
          docLabel.innerHTML = 'CNPJ da Instituição <span class="text-danger">*</span>';
          docInput.placeholder = '00.000.000/0001-00';
        } else {
          docLabel.innerHTML = 'CPF <span class="text-danger">*</span>';
          docInput.placeholder = '000.000.000-00';
        }
      });
    });
  }

  // Cadastro de Novo Usuário
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const senha = document.getElementById('regSenha')?.value;
      const senhaConf = document.getElementById('regSenhaConfirma')?.value;

      if (senha !== senhaConf) {
        alert('As senhas digitadas não coincidem. Por favor, verifique.');
        return;
      }

      const nome = document.getElementById('regNome')?.value;
      const email = document.getElementById('regEmail')?.value;
      const role = document.querySelector('input[name="userRole"]:checked')?.value || 'voluntario';

      const user = {
        nome,
        email,
        senha,
        role,
        createdAt: new Date().toISOString()
      };

      try {
        const usersList = JSON.parse(localStorage.getItem('conecta_registered_users') || '[]');
        usersList.push(user);
        localStorage.setItem('conecta_registered_users', JSON.stringify(usersList));
      } catch (err) {
        console.warn(err);
      }

      localStorage.setItem('conecta_user_session', JSON.stringify(user));

      const alertSuccess = document.getElementById('registerSuccessAlert');
      if (alertSuccess) {
        alertSuccess.classList.remove('d-none');
        setTimeout(() => {
          window.location.href = 'gestao.html';
        }, 1500);
      }
    });
  }

  // Login de Usuário / Administrador
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
      const senha = document.getElementById('loginSenha')?.value;
      const alertSuccess = document.getElementById('loginSuccessAlert');
      const alertError = document.getElementById('loginErrorAlert');

      if (alertError) alertError.classList.add('d-none');

      // Buscar se existe usuário cadastrado no LocalStorage
      const registeredUsers = JSON.parse(localStorage.getItem('conecta_registered_users') || '[]');
      const foundUser = registeredUsers.find(u => u.email.toLowerCase() === email && u.senha === senha);

      // Credenciais do Administrador Geral
      const isAdmin = (email === 'admin@conectavoluntario.org' && (senha === 'admin123' || senha === 'admin@conecta2026'));

      if (isAdmin || foundUser) {
        const userSession = {
          nome: isAdmin ? 'Administrador Geral' : foundUser.nome,
          email: email,
          role: isAdmin ? 'admin' : foundUser.role,
          loggedInAt: new Date().toISOString()
        };

        localStorage.setItem('conecta_user_session', JSON.stringify(userSession));

        if (alertSuccess) {
          alertSuccess.classList.remove('d-none');
          setTimeout(() => {
            window.location.href = 'gestao.html';
          }, 1000);
        }
      } else {
        if (alertError) {
          alertError.classList.remove('d-none');
        } else {
          alert('E-mail ou senha incorretos. Por favor, verifique suas credenciais.');
        }
      }
    });
  }
}

/* ==========================================================================
   7. MODAL DE CANDIDATURA / DETALHES DE VAGA
   ========================================================================== */
function initApplicationModal() {
  const modalElement = document.getElementById('jobDetailsModal');
  if (!modalElement) return;

  modalElement.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    if (!button) return;

    const title = button.getAttribute('data-job-title') || 'Vaga de Voluntariado';
    const ngo = button.getAttribute('data-job-ngo') || 'Instituição Parceira';
    const location = button.getAttribute('data-job-location') || 'Remoto / Presencial';
    const ods = button.getAttribute('data-job-ods') || 'ODS 4, 10 e 17';
    const hours = button.getAttribute('data-job-hours') || '4h semanais';
    const desc = button.getAttribute('data-job-desc') || 'Descrição completa da vaga.';

    document.getElementById('modalJobTitle').textContent = title;
    document.getElementById('modalJobNgo').textContent = ngo;
    document.getElementById('modalJobLocation').textContent = location;
    document.getElementById('modalJobOds').textContent = ods;
    document.getElementById('modalJobHours').textContent = hours;
    document.getElementById('modalJobDesc').textContent = desc;

    // Salvar no botão de confirmação
    const confirmBtn = document.getElementById('confirmApplicationBtn');
    if (confirmBtn) {
      confirmBtn.setAttribute('data-target-title', title);
      confirmBtn.setAttribute('data-target-ngo', ngo);
    }
  });

  const confirmApplyBtn = document.getElementById('confirmApplicationBtn');
  if (confirmApplyBtn) {
    confirmApplyBtn.addEventListener('click', () => {
      const targetTitle = confirmApplyBtn.getAttribute('data-target-title') || 'Vaga de Voluntariado';
      const targetNgo = confirmApplyBtn.getAttribute('data-target-ngo') || 'Instituição Parceira';

      // Registrar nova solicitação no LocalStorage
      const newSol = {
        id: `sol-${Date.now()}`,
        volunteerName: 'Você (Voluntário Logado)',
        jobTitle: targetTitle,
        ngo: targetNgo,
        contact: 'seuemail@exemplo.com',
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'Pendente'
      };

      try {
        const sols = JSON.parse(localStorage.getItem('conecta_solicitacoes') || '[]');
        sols.unshift(newSol);
        localStorage.setItem('conecta_solicitacoes', JSON.stringify(sols));
      } catch (err) {
        console.warn(err);
      }

      const applyAlert = document.getElementById('applicationSuccessAlert');
      if (applyAlert) {
        applyAlert.classList.remove('d-none');
        setTimeout(() => {
          applyAlert.classList.add('d-none');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) modalInstance.hide();
        }, 1800);
      }
    });
  }
}

/* ==========================================================================
   8. PAINEL DE VOLUNTÁRIOS (PAINEL_ONG.HTML)
   ========================================================================== */
function initVolunteerPanel() {
  const tableBody = document.getElementById('volunteersTableBody');
  if (!tableBody) return;

  const volunteers = JSON.parse(localStorage.getItem('conecta_voluntarios') || '[]');
  if (!volunteers.length) return;

  tableBody.innerHTML = '';

  volunteers.forEach(v => {
    const tr = document.createElement('tr');
    tr.className = 'volunteer-row';
    tr.setAttribute('data-name', v.name);
    tr.setAttribute('data-area', v.areaKey || 'geral');
    tr.setAttribute('data-skills', `${v.skills} ${v.area}`.toLowerCase());
    tr.setAttribute('data-city', v.city || 'Brasil');

    const initials = v.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

    tr.innerHTML = `
      <td class="ps-4">
        <div class="d-flex align-items-center">
          <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3 fw-bold flex-shrink-0" style="width: 44px; height: 44px;">
            ${initials || 'CV'}
          </div>
          <div>
            <strong class="d-block text-dark">${v.name}</strong>
            <small class="text-muted"><i class="bi bi-geo-alt me-1"></i>${v.city || 'Brasil'}</small>
          </div>
        </div>
      </td>
      <td>
        <strong class="d-block small text-dark">${v.area || 'Voluntariado'}</strong>
        <span class="badge bg-light text-dark border me-1">${v.skills.split(',')[0] || 'Geral'}</span>
      </td>
      <td>
        <span class="badge" style="background-color: var(--ods-4);">ODS</span>
      </td>
      <td>
        <span class="badge job-badge-remoto d-inline-block mb-1">${v.modality}</span>
        <small class="d-block text-muted">${v.hours}</small>
      </td>
      <td>
        <span class="badge bg-success-subtle text-success border border-success-subtle">${v.status || 'Disponível'}</span>
      </td>
      <td class="text-end pe-4">
        <button class="btn btn-sm btn-outline-primary rounded-pill px-3 view-volunteer-btn"
          data-name="${v.name}"
          data-email="${v.email}"
          data-phone="${v.phone}"
          data-city="${v.city || 'Brasil'}"
          data-area="${v.area}"
          data-skills="${v.skills}"
          data-modality="${v.modality}"
          data-hours="${v.hours}"
          data-motivation="${v.motivation}">
          <i class="bi bi-eye me-1"></i> Ver Perfil
        </button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  const totalCountEl = document.getElementById('totalVolunteersCount');
  const foundBadge = document.getElementById('volunteersFoundBadge');
  if (totalCountEl) totalCountEl.textContent = volunteers.length;
  if (foundBadge) foundBadge.textContent = `Exibindo ${volunteers.length} voluntários`;

  // Filtros
  const searchInput = document.getElementById('filterVolunteerInput');
  const areaSelect = document.getElementById('filterVolunteerArea');

  function filterVolunteers() {
    const rows = document.querySelectorAll('.volunteer-row');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedArea = areaSelect ? areaSelect.value.toLowerCase() : 'todas';
    let visible = 0;

    rows.forEach(row => {
      const name = row.getAttribute('data-name')?.toLowerCase() || '';
      const area = row.getAttribute('data-area')?.toLowerCase() || '';
      const skills = row.getAttribute('data-skills')?.toLowerCase() || '';
      const city = row.getAttribute('data-city')?.toLowerCase() || '';

      const matchQuery = !query || name.includes(query) || skills.includes(query) || city.includes(query);
      const matchArea = selectedArea === 'todas' || area.includes(selectedArea);

      if (matchQuery && matchArea) {
        row.style.display = '';
        visible++;
      } else {
        row.style.display = 'none';
      }
    });

    if (foundBadge) {
      foundBadge.textContent = `Exibindo ${visible} voluntário${visible !== 1 ? 's' : ''}`;
    }
  }

  if (searchInput) searchInput.addEventListener('input', filterVolunteers);
  if (areaSelect) areaSelect.addEventListener('change', filterVolunteers);

  // Modal Detalhes do Voluntário
  const modalEl = document.getElementById('volunteerProfileModal');
  if (modalEl) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-volunteer-btn');
      if (!btn) return;

      document.getElementById('vModalName').textContent = btn.getAttribute('data-name');
      document.getElementById('vModalCity').innerHTML = `<i class="bi bi-geo-alt me-1"></i> ${btn.getAttribute('data-city')}`;
      document.getElementById('vModalArea').textContent = btn.getAttribute('data-area');
      document.getElementById('vModalEmail').textContent = btn.getAttribute('data-email');
      document.getElementById('vModalPhone').textContent = btn.getAttribute('data-phone');
      document.getElementById('vModalModality').textContent = btn.getAttribute('data-modality');
      document.getElementById('vModalHours').textContent = btn.getAttribute('data-hours');
      document.getElementById('vModalSkills').textContent = btn.getAttribute('data-skills');
      document.getElementById('vModalMotivation').textContent = `"${btn.getAttribute('data-motivation')}"`;

      const cleanPhone = btn.getAttribute('data-phone').replace(/\D/g, '');
      const whatsappBtn = document.getElementById('vModalWhatsappBtn');
      if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/55${cleanPhone}?text=Ol%C3%A1%20${encodeURIComponent(btn.getAttribute('data-name'))}%2C%20vimos%20seu%20cadastro%20no%20Conecta%20Volunt%C3%A1rio!`;
      }

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    });
  }
}

/* ==========================================================================
   9. ACESSIBILIDADE (CONTROLE DE FONTE & ALTO CONTRASTE)
   ========================================================================== */
function initAccessibilityControls() {
  const fontIncreaseBtn = document.getElementById('btnFontIncrease');
  const fontDecreaseBtn = document.getElementById('btnFontDecrease');
  const highContrastBtn = document.getElementById('btnHighContrast');

  let currentFontSize = 100;

  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', () => {
      if (currentFontSize < 130) {
        currentFontSize += 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', () => {
      if (currentFontSize > 90) {
        currentFontSize -= 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast-mode');
    });
  }
}
