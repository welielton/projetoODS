# Registro de testes — Nota 2

Execução em 16 de setembro de 2026 (America/Fortaleza). Os registros JSON usam UTC.

## Ambiente

Node.js 24, Vite, React, Bootstrap e Chrome automatizado com Playwright. As versões exatas das dependências estão registradas em `package-lock.json`.

## Resultados

**8 casos unitários aprovados**, distribuídos em dois arquivos:

- Resposta JSON válida: seleção dos campos e ordenação.
- Rejeição de status HTTP de erro e formato inesperado.
- Falha de rede e validação da UF.
- Filtros combinados, busca sem acentos e exclusão de vagas encerradas do mural.
- Recuperação de armazenamento com JSON inválido ou estrutura incompleta.
- Inicialização com armazenamento indisponível.
- CRUD, duplicidade de cadastro/candidatura, alteração de status e vaga encerrada.
- Exclusão de voluntário com remoção de candidaturas relacionadas.

**8 cenários de navegador aprovados**:

| Cenário | Resultado |
|---|---|
| Cadastro, candidatura, bloqueio de duplicidade, aprovação e persistência após recarregar | Aprovado |
| Busca sem acentos, filtros combinados e estado vazio | Aprovado |
| Criar, editar, encerrar e excluir vaga com confirmação | Aprovado |
| API indisponível, mensagem de erro e repetição bem-sucedida | Aprovado |
| Armazenamento corrompido e recuperação da interface | Aprovado |
| Navegação SPA, Escape no modal, menu móvel e ausência de overflow | Aprovado |
| Capturas desktop/mobile e consulta real ao IBGE | Aprovado |
| Registro da arquitetura e arquivos reais do React | Aprovado |

O teste de responsividade percorreu oito rotas nas larguras **360, 390, 768 e 1440 px**. A tabela administrativa mantém rolagem própria, sem alargar a página. A consulta real ao IBGE retornou **HTTP 200**, **27 UFs** e **217 municípios do Maranhão**. URL, horário e amostras estão em `evidencias/api-real.json`.

## Correções realizadas

1. Fechamento do listener incompleto em `js/main.js`, detectado por `node --check` na versão original. A SPA não depende desse arquivo legado.
2. Redução do espaçamento horizontal do grid em telas estreitas, após o teste detectar 12 px de transbordamento na tela inicial de 360 px.
3. Eliminação dos fluxos que simulavam login seguro ou envio real de mensagens: a versão entregue identifica claramente a gestão e os dados como demonstração local.
4. Links das páginas antigas redirecionados para a SPA; imagens e documentos da nova entrega usam caminhos portáveis.
5. Link de salto para o conteúdo ajustado para mover o foco sem alterar a rota do HashRouter; comportamento verificado com teclado.

## Reprodução

```bash
npm ci
npm test
npm run test:e2e
npm run build
```

As respostas controladas dos testes funcionais não substituem a consulta real, registrada separadamente. A suíte depende de um Chrome/Chromium disponível; a execução real da API depende de internet. O relatório JSON final está em `evidencias/resultados-e2e.json`.

Não foi realizada auditoria completa WCAG, avaliação de segurança de produção ou teste com usuários reais. A aplicação é um protótipo acadêmico funcional com armazenamento local.
