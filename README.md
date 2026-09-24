<div align="center">
  <img src="public/assets/logo-soujunior-azul.svg" width="230" alt="SouJunior" />

# Quem começa precisa de espaço.

Uma comunidade abre portas. O apoio de cada pessoa ajuda a mantê-las abertas.

[**Conheça a página ↗**](https://soujunior-apoia-se.vercel.app) · [Apoie a SouJunior](https://apoia.se/soujunior) · [Explore o código](https://github.com/CauanCosta7/soujunior-apoia-se)

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Licença](https://img.shields.io/badge/Licença-MIT-22c55e)

</div>

![Uma prévia da experiência SouJunior](docs/hero-preview.jpg)

## Por que esta página existe

Dar os primeiros passos em tecnologia fica mais fácil quando existe espaço para praticar, construir em equipe e ter com quem contar. A SouJunior aproxima pessoas em início de carreira dessas oportunidades.

Criamos esta landing page para o **Desafio Junior**, com uma missão: mostrar o que essa comunidade torna possível e convidar mais pessoas a fazer parte dela pelo apoio financeiro. A jornada passa pela causa, pelos resultados e pelo destino dos recursos até chegar à campanha oficial no Apoia.se.

O projeto é do **Squad Cebolucius — nº 21**:

**Cauan Costa · Cauã Jefferson · Klênildson Araújo**

## Um passeio pela experiência

- **Entenda a causa.** A abertura apresenta a comunidade e oferece caminhos para conhecer seu impacto ou apoiar diretamente.
- **Conheça as pessoas por trás dos números.** Indicadores e histórias mostram a experiência construída na SouJunior.
- **Veja o que o apoio mantém de pé.** Os cards apresentam infraestrutura, banco de dados, plataformas e operação. Em celular e tablet, avançam automaticamente a cada **4 segundos**, com setas e um controle para pausar.
- **Escolha como contribuir.** As sugestões começam em R$ 2; o valor e a modalidade são confirmados no Apoia.se, onde o pagamento acontece.
- **Tire suas dúvidas.** O FAQ reúne respostas e acesso aos canais da comunidade.

Tema claro e escuro, navegação por teclado, layout responsivo e animações sutis acompanham essa jornada. A preferência por movimento reduzido é respeitada, e o tema escolhido fica salvo no navegador.

### De onde vêm os dados?

Os dados de impacto e as informações sobre o destino do apoio foram **fornecidos diretamente pela SouJunior ao squad via WhatsApp**, conforme confirmado pela equipe. Essa é a origem dos números e das despesas apresentados na página.

<details>
<summary>Ver a página completa</summary>

![Página completa em desktop](docs/preview-1440.png)

</details>

## Rode na sua máquina

Você precisa de **Node.js 22** e npm. A instalação foi validada com Node 22.15.1. Não é necessário configurar banco de dados ou variáveis de ambiente.

```bash
git clone https://github.com/CauanCosta7/soujunior-apoia-se.git
cd soujunior-apoia-se
npm install
npm run dev
```

Abra **http://localhost:5173**, ou o endereço indicado pelo terminal.

| Comando | Para que serve |
| --- | --- |
| `npm run dev` | Desenvolver com atualização automática no navegador |
| `npm run build` | Verificar TypeScript e gerar a versão de produção em `dist/` |
| `npm run preview` | Conferir o build localmente |
| `npm run typecheck` | Verificar os tipos sem gerar arquivos |
| `npm test` | Executar os testes de interface e regressão |
| `npm run audit:dark` | Auditar contraste do tema escuro, com o servidor local ativo |

Para instalar exatamente as versões do lockfile, use `npm ci`.

## Por dentro do código

**React** organiza as seções, **TypeScript** ajuda a manter as interações seguras e **Vite** cuida do desenvolvimento e do build. A aplicação é estática e não processa pagamentos.

```text
src/
├── components/   # Uma seção por componente: Hero, Impact, Support, FAQ…
├── hooks/        # Interações, animações e ciclo de vida
├── styles/       # Layout, temas e refinamentos visuais
├── App.tsx       # A página montada a partir das seções
└── main.tsx      # Entrada da aplicação
public/assets/    # Logos, mascotes, imagens e texturas locais
tests/            # Fluxos, contraste e comparação visual
docs/             # Decisões técnicas e evidências da entrega
```

A base visual veio da página original, migrada para componentes React. As imagens que já eram locais continuam no projeto; fontes e fotografias originalmente externas mantêm suas referências.

Leia a [arquitetura](docs/ARCHITECTURE.md) para entender a ordem dos estilos, os efeitos e os cuidados ao evoluir cada seção.

## Cuidado com os detalhes

Os testes cobrem larguras de **390, 768 e 1440 px**, comparação com a página de referência, tema persistido, menu mobile, FAQ, contribuições e carrosséis. Há verificações específicas para contraste no tema escuro, hover, foco por teclado e movimento reduzido.

Para executar:

```bash
npx playwright install chromium
npm test
```

As comparações visuais dependem das fontes e imagens externas. Os registros de [QA](docs/QA.md) e da [revisão do tema escuro](docs/DARK-MODE.md) detalham o que foi verificado e o que ainda precisa de avaliação manual.

## Da nossa máquina para a Vercel

O [site publicado](https://soujunior-apoia-se.vercel.app) usa o preset Vite, com `npm run build` e saída em `dist/`. Essas configurações estão em `vercel.json`.

Para publicar com a CLI autenticada:

```bash
vercel --prod
```

A configuração de GitHub Actions está disponível como [modelo](docs/github-actions-quality.yml), ainda sem ativação no repositório.

## Construindo em equipe

Quer contribuir? Rode o projeto, escolha uma melhoria e abra uma branch. No pull request, conte o que mudou, por quê e como você conferiu o resultado. Capturas ajudam bastante quando a mudança é visual. Antes de enviar, execute o build e os testes e peça a revisão de outro integrante.

A [conferência do edital](docs/EDITAL.md) reúne os requisitos do hackathon e o checklist de entrega, incluindo vídeo e registros de participação.

## Créditos

- **SouJunior:** marca, campanha, retratos e informações fornecidas ao squad.
- **Unsplash e Pexels:** fotografias referenciadas nos componentes.
- **Google Fonts:** Funnel Display e Funnel Sans.
- **Ferramentas:** React, TypeScript, Vite, Playwright, axe-core, Prettier, PNGJS e Pixelmatch.

O código é distribuído sob a [licença MIT](LICENSE). Marcas e materiais de terceiros mantêm seus respectivos direitos e condições de uso.

<div align="center">

**Mais pessoas. Mais oportunidades. Um futuro mais justo.**

[Faça parte dessa história 💙](https://apoia.se/soujunior)

</div>
