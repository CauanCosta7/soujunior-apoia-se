<div align="center">
  <img src="public/assets/logo-soujunior-azul.svg" width="230" alt="SouJunior" />

# Talento precisa de pessoas que acreditam.

**Uma landing page para conectar apoio, comunidade e oportunidades.**

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Licença](https://img.shields.io/badge/Licença-MIT-22c55e)

[**Acesse o site**](https://soujunior-apoia-se.vercel.app) · [Código no GitHub](https://github.com/CauanCosta7/soujunior-apoia-se) · [Campanha oficial](https://apoia.se/soujunior) · [Como executar](#comece-em-poucos-passos) · [Arquitetura](docs/ARCHITECTURE.md) · [Conferência do edital](docs/EDITAL.md)

</div>

## O projeto

Página de apoio à SouJunior, criada no contexto do **Desafio Junior**, para apresentar a causa, o impacto da comunidade e o destino das contribuições. O pagamento acontece na campanha oficial do Apoia.se.

Esta entrega migra a versão **V2 — textura urbana** de HTML/CSS/JavaScript para **React + TypeScript + Vite**, preservando os textos, imagens, links, identidade visual, animações e comportamento responsivo. O contexto do hackathon orienta a documentação; não acrescenta informações novas à página.

## Squad Cebolucius · nº 21

| Integrante |
| --- |
| Cauan Costa |
| Cauã Jefferson |
| Kledinilson |

Nomes informados pelo squad. Perfis e funções podem ser acrescentados quando confirmados.

![Prévia da página](docs/hero-preview.jpg)

<details>
<summary>Veja a página completa</summary>

![Página SouJunior em desktop](docs/preview-1440.png)

</details>

## Comece em poucos passos

Pré-requisito: **Node.js 22 LTS** e npm. A instalação foi validada com Node 22.15.1. Não há banco de dados, backend ou variáveis de ambiente obrigatórias.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente **http://localhost:5173**.

```bash
npm run build       # TypeScript estrito + bundle de produção em dist/
npm run preview     # Visualizar o build, normalmente na porta 4173
npm run typecheck   # Verificar tipos sem gerar arquivos
```

Para reproduzir exatamente as dependências do arquivo de lock, use `npm ci`.

## Uma experiência do início ao apoio

| Recurso | Comportamento |
| --- | --- |
| Identidade urbana | Composição, texturas, mascotes e tipografia da versão original |
| Navegação responsiva | Âncoras, menu mobile, fechamento com Escape e retorno de foco |
| Tema claro e escuro | Preferência armazenada localmente, com fallback se o armazenamento estiver bloqueado |
| Histórias da comunidade | Carrossel com setas, swipe e reprodução automática |
| Transparência | Cartões animados no desktop e carrossel em telas menores |
| Sugestões de contribuição | Seleção acessível e confirmação; o valor é escolhido novamente no Apoia.se |
| FAQ | Acordeão com animação, teclado e estados acessíveis |
| Movimento | Revelação por viewport, números animados e respeito a movimento reduzido |

## Organização

```text
src/
├── components/           # Header, Hero, CommunityStrip, Journey, Impact,
│                         # Testimonials, Transparency, Support, Faq, FinalCall, Footer
├── hooks/                # Ciclo de vida e interações tipadas
├── styles/               # CSS original, na mesma ordem de precedência
├── App.tsx               # Composição da página
└── main.tsx              # Entrada React com StrictMode
public/assets/            # Logos, mascotes, texturas e imagens locais
public/wireframe.html     # Material de referência recebido
tests/                   # Regressão visual e fluxos de interação
docs/                    # Arquitetura, edital, evidências e original de referência
```

Leia as [decisões de arquitetura](docs/ARCHITECTURE.md) antes de alterar estilos ou animações.

## Qualidade verificável

```bash
npx playwright install chromium
npm test
```

Os testes comparam a versão React ao HTML original em **390, 768 e 1440 px**: conteúdo, destinos, dimensões, ausência de overflow e diferença visual inferior a 0,5%. Também exercitam tema persistido, menu/Escape, contribuição, FAQ e carrosséis sob React StrictMode.

A comparação visual usa movimento reduzido para capturar estados estáveis. Os recursos externos precisam estar disponíveis para reproduzir as imagens e fontes. Isso não substitui auditoria manual de contraste, leitor de tela, zoom a 200% ou testes com usuários. Veja o [registro de validação](docs/QA.md).

## Publicação na Vercel

O arquivo `vercel.json` define o preset Vite, `npm run build` e a saída `dist`. Na Vercel, importe este repositório e mantenha essas configurações. Também é possível publicar pela CLI autenticada:

```bash
vercel --prod
```

Nenhum segredo deve ser versionado. `.env*`, `.vercel`, `.openai`, dependências e builds estão ignorados.

## Hackathon: evidência antes de promessa

A [matriz do edital](docs/EDITAL.md) relaciona cada requisito à implementação e identifica o que depende de confirmação. Entre as pendências estão a fonte dos números de impacto, vídeo de até cinco minutos e evidências reais de colaboração. A existência das seções não comprova, por si só, todos os critérios de avaliação.

## Como contribuir

1. Configure o projeto seguindo este README e registre impedimentos reais do onboarding.
2. Crie uma branch com uma mudança de escopo claro.
3. Preserve conteúdo, links e layout; valide qualquer alteração editorial com o squad.
4. Execute build e testes e abra um pull request com evidências.
5. Solicite revisão de outro integrante e registre participação real, sem fabricar commits ou métricas.

## Créditos e licença

Código sob [licença MIT](LICENSE). Marcas, fotografias, retratos e outros materiais de terceiros continuam sujeitos aos direitos e termos de seus respectivos titulares; a licença do código não concede direitos sobre esses materiais.

- Identidade, campanha e retratos: [SouJunior](https://www.soujunior.tech/).
- Fotografias externas preservadas: Unsplash e Pexels (URLs nos componentes).
- Tipografia externa preservada: Funnel Display e Funnel Sans, via Google Fonts.
- Bibliotecas: React, Vite, TypeScript, Playwright, Prettier, PNGJS e Pixelmatch. Consulte as licenças das dependências distribuídas.

**A página não coleta pagamentos nem envia os valores escolhidos.** O apoio é concluído exclusivamente no [Apoia.se da SouJunior](https://apoia.se/soujunior).
