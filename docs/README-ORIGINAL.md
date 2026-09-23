# SouJunior — V2 textura urbana

Este pacote contém o código-fonte do projeto Sites na versão recuperada em 23/09/2026.

## Abrir localmente

1. Extraia o ZIP.
2. Na pasta extraída, execute `python -m http.server 8000 --directory dist`.
3. Abra `http://localhost:8000` no navegador.

A página principal está em `dist/index.html`. Os estilos adicionais estão em `dist/assets/*.css`, as interações em `dist/assets/interactions.js` e as imagens locais em `dist/assets/`. O arquivo `dist/wireframe.html` é um material adicional do projeto. `.openai/hosting.json` é a configuração de publicação do Sites, e `site-bundle.tar.gz` é o pacote de publicação original.

Algumas imagens, fontes e links referenciados pelo HTML são carregados de serviços externos e precisam de conexão à internet para aparecer. A página é estática: HTML, CSS e JavaScript; não há etapa de compilação.

## Passar para o Codex

Anexe este ZIP a uma conversa com o Codex, ou extraia-o em uma pasta que o Codex possa acessar. Exemplo de pedido:

> Abra o projeto SouJunior — V2 textura urbana neste ZIP. Use `dist/index.html` como página principal, preserve os arquivos em `dist/assets` e mantenha o visual existente. Quero [descreva a mudança]. Primeiro examine a estrutura e depois faça a alteração nos arquivos.

Se você quiser migrar para React ou outro framework, peça isso explicitamente e informe se deseja manter o visual e o conteúdo idênticos.
