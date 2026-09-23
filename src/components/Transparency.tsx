export function Transparency() {
  return (
    <section
      className={"why funding-section"}
      id={"causa"}
      aria-labelledby={"resources-title"}
    >
      {"\n      "}
      <div className={"wrap"}>
        {"\n        "}
        <div id={"transparencia"} aria-labelledby={"resources-title"}>
          {"\n          "}
          <div className={"spend-landscape"}>
            {"\n            "}
            <div className={"spend-sticky"}>
              <div className={"funding-heading"}>
                <h3 id={"resources-title"}>
                  {"O que o seu apoio ajuda a manter de pé"}
                </h3>
                <p>{"Custos reais da SouJunior."}</p>
              </div>
              <div className={"spend-progress"} aria-hidden={"true"}>
                <span></span>
              </div>
              <div
                className={"spend-viewport"}
                id={"spend-carousel"}
                role={"region"}
                aria-roledescription={"carrossel"}
                aria-label={
                  "Destinos dos recursos apresentados conforme a página avança"
                }
              >
                <div className={"spend-cards"}>
                  {"\n            "}
                  <article className={"spend-card reveal"}>
                    <div className={"spend-title"}>
                      <svg
                        className={"ui-icon"}
                        viewBox={"0 0 24 24"}
                        aria-hidden={"true"}
                        focusable={"false"}
                      >
                        <path
                          d={
                            "M7 18a5 5 0 0 1-1-9.9 6 6 0 0 1 11.7-.8A5 5 0 0 1 18 18Z"
                          }
                        ></path>
                      </svg>
                      <h4>{"Infraestrutura em nuvem"}</h4>
                    </div>
                    <p>
                      {
                        "Serviços como a AWS, usados para manter os ambientes dos projetos em funcionamento."
                      }
                    </p>
                  </article>
                  {"\n            "}
                  <article className={"spend-card reveal"}>
                    <div className={"spend-title"}>
                      <svg
                        className={"ui-icon"}
                        viewBox={"0 0 24 24"}
                        aria-hidden={"true"}
                        focusable={"false"}
                      >
                        <ellipse cx={"12"} cy={"5"} rx={"8"} ry={"3"}></ellipse>
                        <path
                          d={
                            "M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"
                          }
                        ></path>
                      </svg>
                      <h4>{"Banco de dados"}</h4>
                    </div>
                    <p>
                      {
                        "A estrutura que armazena e organiza as informações usadas pelos projetos."
                      }
                    </p>
                  </article>
                  {"\n            "}
                  <article className={"spend-card reveal"}>
                    <div className={"spend-title"}>
                      <svg
                        className={"ui-icon"}
                        viewBox={"0 0 24 24"}
                        aria-hidden={"true"}
                        focusable={"false"}
                      >
                        <circle cx={"12"} cy={"12"} r={"9"}></circle>
                        <path
                          d={"M3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z"}
                        ></path>
                      </svg>
                      <h4>{"Sites, domínios e plataformas"}</h4>
                    </div>
                    <p>
                      {
                        "Os endereços e as ferramentas digitais usados pela SouJunior."
                      }
                    </p>
                  </article>
                  {"\n            "}
                  <article className={"spend-card reveal"}>
                    <div className={"spend-title"}>
                      <svg
                        className={"ui-icon"}
                        viewBox={"0 0 24 24"}
                        aria-hidden={"true"}
                        focusable={"false"}
                      >
                        <rect
                          x={"3"}
                          y={"4"}
                          width={"18"}
                          height={"13"}
                          rx={"2"}
                        ></rect>
                        <path d={"m10 8 5 3-5 3ZM8 21h8M12 17v4"}></path>
                      </svg>
                      <h4>{"Eventos e operação"}</h4>
                    </div>
                    <p>
                      {
                        "Restream em meses com mais eventos e outras despesas operacionais pontuais."
                      }
                    </p>
                  </article>
                  {"\n            "}
                </div>
              </div>
              <div
                className={"spend-mobile-controls"}
                aria-label={"Controles dos destinos dos recursos"}
              >
                <button
                  className={"spend-prev"}
                  type={"button"}
                  aria-label={"Destino anterior"}
                  aria-controls={"spend-carousel"}
                >
                  <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
                    <path d={"m15 18-6-6 6-6"}></path>
                  </svg>
                </button>
                <span className={"spend-position"} aria-live={"polite"}>
                  {"1 / 4"}
                </span>
                <button
                  className={"spend-next"}
                  type={"button"}
                  aria-label={"Próximo destino"}
                  aria-controls={"spend-carousel"}
                >
                  <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
                    <path d={"m9 6 6 6-6 6"}></path>
                  </svg>
                </button>
              </div>
            </div>
            {"\n          "}
          </div>
          {"\n        "}
        </div>
        {"\n      "}
      </div>
      {"\n    "}
    </section>
  );
}
