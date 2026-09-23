# Arquitetura e decisões

A página é uma aplicação estática React com TypeScript estrito. Vite serve o ambiente local e gera o bundle; a Vercel hospeda a saída. Não existem API, autenticação, coleta de dados ou processamento de pagamentos nesta aplicação.

## Componentes e estilos

Cada seção é um componente TSX real, sem iframe e sem `dangerouslySetInnerHTML`. `App` apenas organiza as seções. A marcação, as classes e os textos foram preservados. Os arquivos CSS são importados na ordem `base`, `interactions`, `direction`, `v3`; essa cascata é parte do visual original. A redundância dos estilos herdados foi mantida para evitar regressão nesta migração.

## Interações e ciclo de vida

`usePageInteractions` inicializa o módulo TypeScript `interactions` após o commit do DOM. Ele preserva os algoritmos do JavaScript original, incluindo Web Animations API, IntersectionObserver e requestAnimationFrame. O DOM das seções é estático; a camada imperativa administra estados visuais, ARIA e conteúdo decorativo.

O cleanup remove listeners, observadores, timeouts, frames e animações; restaura os nós e atributos originais, inclusive os títulos divididos em palavras e a faixa duplicada. Isso permite o ciclo montar/desmontar/remontar de StrictMode e atualizações do desenvolvimento sem duplicação. Promessas de fontes verificam se o efeito foi descartado. O acesso a localStorage tolera indisponibilidade.

Tradeoff: concentrar a adaptação preserva os movimentos existentes e facilita compará-los ao original, mas mantém acoplamento a seletores CSS. Ao evoluir uma seção com dados dinâmicos, leve também seu estado para um hook específico e evite que React e a camada imperativa disputem os mesmos nós. Não reexecute o gerador da migração: os componentes finais são o código mantido.

## Recursos e referência

Os recursos que já eram locais permanecem em `public/assets`, sem renomeação. Fontes e fotos que já eram remotas continuam remotas para manter as URLs e imagens. Não há garantia de operação totalmente offline. Os CSS/JS originais em `public/assets` são usados pela referência dos testes; a aplicação importa as versões de `src`.

`docs/original.html` registra o HTML recebido. Os testes servem essa referência com os recursos originais e comparam seu resultado ao React. `public/wireframe.html` é material adicional, sem ligação no fluxo principal. O pacote original `site-bundle.tar.gz` permanece local e está ignorado pelo Git.

## Segurança e manutenção

Links de nova aba preservam `rel="noopener"`. Não há segredos no cliente. Não inclua anexos de pesquisa com dados pessoais, tokens de implantação ou credenciais no repositório. Revise dependências regularmente; atualizações devem passar por build e regressão visual.

## Modelo de integração contínua

A configuração de GitHub Actions está em docs/github-actions-quality.yml como modelo inativo. A autenticação de publicação não possui a permissão workflow. Para ativar CI, um mantenedor autorizado pode mover esse arquivo para .github/workflows/quality.yml pelo GitHub. O build e os testes continuam disponíveis localmente.
