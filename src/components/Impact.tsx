export function Impact() {
  return (
    <section id="impacto" className="impact">
      <div className="wrap">
        <div className="impact-head reveal">
          <div>
            <h2 className="display" data-reveal-words="">
              {"Por trás de cada número, tem alguém construindo experiência."}
            </h2>
          </div>
          <p className="lead">
            {
              "São pessoas aprendendo juntas, mentores compartilhando caminhos e projetos que transformam conhecimento em prática."
            }
          </p>
        </div>
        <div className="impact-compact">
          <div className="impact-photo reveal">
            <img
              src={
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=88"
              }
              alt={"Equipe colaborando em um projeto"}
            />
          </div>
          <div className="impact-numbers">
            <article className="metric">
              <strong>
                <span className="sr-only">{"120"}</span>
                <span
                  className="metric-value"
                  data-count={"120"}
                  aria-hidden="true"
                >
                  {"120"}
                </span>
              </strong>
              <p>{"membros"}</p>
            </article>

            <article className="metric">
              <strong>
                <span className="sr-only">{"35"}</span>
                <span
                  className="metric-value"
                  data-count={"35"}
                  aria-hidden="true"
                >
                  {"35"}
                </span>
              </strong>
              <p>{"mentores"}</p>
            </article>

            <article className="metric">
              <strong>
                <span className="sr-only">{"3"}</span>
                <span
                  className="metric-value"
                  data-count={"3"}
                  aria-hidden="true"
                >
                  {"3"}
                </span>
              </strong>
              <p>{"projetos em desenvolvimento"}</p>
            </article>

            <article className="metric">
              <strong>
                <span className="sr-only">{"Mais de 50"}</span>
                <span
                  className="metric-value"
                  data-count={"50"}
                  aria-hidden="true"
                >
                  {"50"}
                </span>
                <span aria-hidden="true">{"+"}</span>
              </strong>
              <p>{"pessoas que conquistaram uma oportunidade"}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
