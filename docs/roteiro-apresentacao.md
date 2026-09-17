# Roteiro de apresentação presencial — 8 a 10 minutos

1. **Introdução (1 min):** explique a dificuldade de aproximar voluntários e ONGs, o público-alvo e a relação com os ODS 4, 10 e 17.
2. **Evolução (1 min):** mostre a base preservada em `nota1/` e explique o reaproveitamento do CSS, das vagas e da proposta na versão React.
3. **Demonstração (3 min):** filtre vagas; cadastre um perfil fictício; selecione Maranhão e Buriticupu; conclua o cadastro; envie uma candidatura; aprove a candidatura na gestão; consulte o status e recarregue a página para mostrar persistência.
4. **API (1 min):** mostre os selects e o arquivo `src/services/ibge.js`. Explique `fetch`, verificação HTTP, `response.json()`, seleção dos campos e tratamento de erro. Mostre `docs/evidencias/api-real.json`.
5. **React (1 min):** explique componentes, contexto, reducer e rotas. Abra `src/App.jsx` e `src/context/AppContext.jsx`. Demonstre que trocar de rota não recarrega o documento.
6. **Testes e publicação (1 min):** mostre as capturas desktop/mobile, o registro dos testes e os links de acesso e código.
7. **Conclusão (1 min):** relate os aprendizados e as dificuldades registradas. Informe que a aplicação é demonstrativa, os dados ficam no navegador e o painel não possui autenticação.

Antes da apresentação, abra a aplicação em uma janela nova e confirme a conexão com o IBGE. Use dados fictícios. Se a API estiver indisponível, mostre o tratamento de erro e as evidências da consulta real previamente registrada; não apresente uma resposta simulada como acesso real.
