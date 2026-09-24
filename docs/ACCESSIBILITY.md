# Acessibilidade e qualidade — revisão de 24/09/2026

## Resultado verificado

- `npm run lint`: zero erros e zero avisos no código de aplicação e configuração Vite.
- `npm run typecheck`: aprovado, com TypeScript estrito, proibição de variáveis/parâmetros não usados e verificação de fallthrough.
- `npm run build`: aprovado.
- `npm test`: 20 cenários aprovados; cenário de teclado repetido após o refinamento final de foco e aprovado.
- `npm audit`: nenhuma vulnerabilidade conhecida reportada na árvore instalada, incluindo desenvolvimento, na data desta revisão.

`npm run check` reúne lint, tipos, build e testes. A configuração de CI disponível em `docs/github-actions-quality.yml` utiliza o mesmo comando; continua sendo um modelo inativo.

## Escopo da acessibilidade

Axe/Playwright com regras WCAG 2.0, 2.1 e 2.2 de níveis A/AA e boas práticas: nenhuma violação automática reportada em temas claro e escuro, nas larguras 320, 768 e 1440 px, com respostas do FAQ expostas.

Também foram verificados teclado (skip link, menu, Escape, FAQ), cores em hover e seleção, foco visível, pausa de animações persistida, preferência de movimento reduzido, carrossel de quatro segundos, bordas dos cards em hover e ampliação de texto para 200% nas colunas de leitura selecionadas. A ampliação de texto não equivale a um teste completo de zoom do navegador em todos os dispositivos.

Gradientes, texturas e pseudo-elementos têm limitações na detecção automática de contraste. Há resultados inconclusivos nessa categoria; foram complementados por inspeção visual e testes explícitos dos pares de cores dos indicadores e botões. Não se declara certificação WCAG, pontuação Lighthouse ou ausência universal de defeitos.

## Correções realizadas

- Contraste do marcador roxo e da resposta de contribuição no tema claro.
- Área rolável dos cards acessível por teclado, com contorno visível.
- Regiões ARIA nomeadas corretamente; remoção de rótulo em contêiner genérico redundante.
- Marcas apontam para `#hero`, e o skip link transfere o foco ao conteúdo.
- Menu aberto pelo teclado transfere foco para seu primeiro link; Escape retorna ao botão.
- Controle global para pausar/retomar animações, com persistência local e respeito à preferência do sistema.
- Carrossel de histórias pausa durante foco em seu conteúdo ou controles.
- Área superior dos cards comporta a elevação de hover sem cortar a borda.
- Limpeza de timers e frames cancelados nos registros de ciclo de vida.
- Seletores de conteúdo limitados ao elemento raiz da aplicação.
- Componentes TSX com marcação mais legível, sem expressões de espaço geradas desnecessariamente.

## Comparação com o original

O teste mantém o limite visual de 0,5% nas áreas preservadas. Áreas deliberadamente alteradas por acessibilidade (controles do cabeçalho, cores corrigidas e viewport/controles de transparência) são mascaradas na comparação de pixels; possuem testes específicos de comportamento, contraste, foco e limites de recorte. Textos, dimensões e destinos continuam comparados, normalizando apenas o antigo `#` para o destino explícito `#hero`.

## Ainda requer avaliação humana

- Leitura real com NVDA, VoiceOver e/ou TalkBack.
- Zoom do navegador, alto contraste/cores forçadas e aparelhos físicos.
- Compreensão das mensagens, tempo de leitura e conforto das animações com pessoas usuárias.
- Revisão de código por outro integrante e onboarding independente.

Referências: [WCAG — contraste](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [WCAG — pausa de movimento](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Compatibilidade do lint

O ESLint está na linha 9 porque a versão publicada de eslint-plugin-jsx-a11y declara suporte até ESLint 9. O registro npm sinaliza essa linha como descontinuada; a migração para ESLint 10 depende de compatibilidade do plugin ou substituição deliberada das regras de JSX. Não foi forçada uma combinação de peer dependencies incompatíveis. A auditoria npm não reportou vulnerabilidades conhecidas, o que não elimina essa pendência de atualização da ferramenta de desenvolvimento.
