# Revisão do tema escuro — 23/09/2026

## Correções

- Removido o efeito de branco sobre branco no hover de Conheça o impacto por meio de um par explícito: texto azul profundo sobre branco.
- CTAs amarelos mantêm texto escuro; CTAs com fundo azul usam um azul com contraste suficiente para texto branco.
- Títulos animados, perguntas e títulos de jornada usam amarelo no hover escuro, em vez de azul sobre azul.
- Contribuição selecionada usa amarelo + texto azul profundo, com `aria-pressed` preservado; bordas dos valores e foco por teclado foram reforçados.
- Roxo do quarto indicador e do segundo marcador de jornada foi escurecido para melhorar contraste.
- Símbolo R$ usa fonte monoespaçada e acabamento de moeda. A mudança é restrita ao símbolo.
- Cards de transparência recebem elevação, borda e sombra no hover; ícones e brilho têm uma animação curta ao entrar na tela. O símbolo R$ também recebe uma animação curta de entrada.
- Movimentos novos são desligados com `prefers-reduced-motion: reduce`.

## Evidências

`npm run build` e `npm test`: 7 testes aprovados. Incluem os 4 testes da migração e 3 casos novos para cores, seleção, teclado, títulos e animações.

Auditoria axe de contraste em 390 e 1440 px, com todas as respostas do FAQ abertas e menu mobile aberto: nenhuma violação automática reportada após as correções. Estados de hover dos CTAs e dos valores também receberam verificações de pares de cores com mínimo de 4,5:1. Os quatro cards de impacto usam pseudo-elementos; seus pares foram calculados separadamente porque a análise automática não determina esses fundos.

Gradientes, texturas e sobreposições geram resultados inconclusivos no axe. Foram inspecionados os estilos computados e as capturas; isso não equivale a certificação integral de acessibilidade. Leitor de tela, zoom de 200%, dispositivos físicos e validação com usuários continuam pendentes.

- `dark-button-hover.jpg`: texto visível no botão de fundo branco.
- `dark-impact.jpg`: seção de impacto em tema escuro.
- `dark-transparency.jpg`: composição dos cards e contraste do conteúdo.
- `npm run audit:dark -- https://soujunior-apoia-se.vercel.app`: revisão adicional no site publicado.

Referências: [contraste mínimo, incluindo hover e foco](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [movimentos decorrentes de interação](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).
