# Validação — 23/09/2026

Ambiente local: Windows, Node 22.15.1, Chromium do Playwright.

- `npm install`: concluído; auditoria npm inicial sem vulnerabilidades reportadas.
- `npm run build`: TypeScript estrito e Vite concluídos.
- `npm test`: 4 testes aprovados (15,8 s na execução registrada).
- Comparação original/React em 390, 768 e 1440 px: textos, URLs, dimensões e comparação de pixels dentro de 0,5% de tolerância; sem overflow horizontal do documento.
- Interações: tema após reload, menu e Escape com retorno de foco, seleção de valor, FAQ exclusivo, navegação dos dois carrosséis e ausência de faixa duplicada extra após StrictMode.
- Capturas: `preview-390.png`, `preview-768.png` e `preview-1440.png`.
- Vercel: build remoto finalizado com estado READY; produção em https://soujunior-apoia-se.vercel.app.

## Limites e próximos testes manuais

A comparação visual automatizada usa movimento reduzido para estabilidade; o teste de interações começa com movimento habilitado. Dependências externas (fontes e fotos) podem causar indisponibilidade ou diferenças futuras. O teste confirma os destinos dos links, sem concluir pagamentos nem entrar em grupos.

Ainda executar: contraste de todos os estados em ambos os temas, leitor de tela, zoom a 200%, dispositivos físicos, avaliação de compreensão com pessoas e onboarding realizado por outro integrante. Não se declara certificação WCAG nem nota de Lighthouse.

A origem dos dados de impacto e despesas foi confirmada pela equipe em 24/09/2026: informações recebidas diretamente da SouJunior via WhatsApp. Autorizações de imagem e registros de participação permanecem no checklist de `EDITAL.md`.

Verificação pública adicional: resposta HTTP 200, todas as imagens carregadas e nenhum erro de JavaScript; captura de produção em hero-preview.jpg.

Atualização: revisão de tema escuro e microinterações concluída com 7 testes aprovados. Consulte DARK-MODE.md para escopo, estados verificados e limitações.

## Atualização — 24/09/2026

Oito testes aprovados (26,6 s). O novo cenário valida reprodução automática da transparência em quatro segundos mesmo com o ponteiro sobre o card, pausa/retomada, navegação manual, retorno do quarto ao primeiro card e interrupção com movimento reduzido. A rotação para quando o carrossel deixa a área visível ou a aba fica oculta.

## Revisão ampliada — 24/09/2026

20 testes aprovados, lint sem erros/avisos, TypeScript e build aprovados; auditoria de dependências sem vulnerabilidades conhecidas reportadas. Escopo completo, ajustes de comparação visual e limitações em [ACCESSIBILITY.md](ACCESSIBILITY.md).
