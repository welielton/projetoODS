# Publicação e arquivos para entrega

## Estado verificado

**A aplicação ainda não está publicada com acesso validado para o tutor.** O serviço Sites recebeu o código e salvou a versão 1, mas duas tentativas de publicação falharam ao aguardar a emissão do certificado HTTPS. Nenhum sucesso de publicação foi confirmado. O acesso permanece privado; a solicitação de autorização para acesso público está pendente.

Erro retornado: `Timed out waiting for the TLS certificate for conecta-voluntario-welielton.welielton-silva01.chatgpt.site`.

- Projeto: `appgprj_6aab3424ab54819180f15e0a046412d2`.
- Versão salva: `appgprj_6aab3424ab54819180f15e0a046412d2~appgver_3d4ad6f8d58881918a6bc3c6032a7a8d`.
- Primeira tentativa: `appgdep_6aab483a61648191a64a9c4c2b9d8b5b` (falha).
- Segunda tentativa: `appgdep_6aab4b32d2b08191b64197de557b6afb` (falha).
- Identificador do projeto persistido em `.openai/hosting.json`; reutilizar este projeto, sem criar outro.

Origem inicialmente reservada pelo serviço:

https://conecta-voluntario-welielton.yellow-myna-9452.chatgpt.site

O serviço redireciona esse endereço para:

https://conecta-voluntario-welielton.welielton-silva01.chatgpt.site

Os endereços acima **não devem ser apresentados como links públicos validados**. Os slides registram a pendência. A última versão local contém a correção do link de salto da SPA e atualizações documentais posteriores à versão remota 1; antes de republicar, enviar o código local atualizado, recompilar e salvar uma nova versão.

## Arquivos concluídos

- `public/entrega/apresentacao.pdf`: apresentação com 14 slides.
- `public/entrega/apresentacao.pptx`: apresentação editável.
- `public/entrega/codigo-fonte.zip`: código, testes, documentação e base da Nota 1.
- `entrega/site-publicavel.zip`: aplicação compilada, pronta para hospedagem estática.

## Publicar em outro serviço

1. Extraia `entrega/site-publicavel.zip` e publique seu conteúdo em uma hospedagem estática de sua escolha. O arquivo `index.html` deve ficar na raiz publicada.
2. Se usar o código-fonte, execute `npm ci` e `npm run build`; publique `dist`.
3. Libere o acesso de leitura ao tutor e teste a aplicação sem estar autenticado no serviço de hospedagem.
4. Confira os downloads em `/entrega/apresentacao.pdf`, `/entrega/apresentacao.pptx` e `/entrega/codigo-fonte.zip`.
5. Atualize a URL em `scripts/slides.mjs` e o estado em `docs/publication-status.json` somente após comprovar o acesso.
6. Regenere os slides (`npm run slides`), converta para PDF, gere o pacote (`npm run package:source`), recompile (`npm run build`) e publique novamente os arquivos finais.

A navegação usa `HashRouter` e `base: './'`; não exige regras especiais de reescrita. O código completo também pode ser enviado a GitHub ou Google Drive com acesso de leitura ao tutor. Não inclua credenciais, arquivos `.env` ou `node_modules`.

Para verificar o site público e os downloads em um navegador sem autenticação: `npm run verify:public -- https://ENDERECO-DA-APLICACAO`. O script valida a renderização, recarga de rota e assinaturas dos arquivos PDF/PPTX/ZIP. Ajuste `CHROME_PATH` se necessário. Não marque `public: true` enquanto a verificação não passar.
