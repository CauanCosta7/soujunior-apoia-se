export function Testimonials() {
  return (
    <section className={"testimonials"}>
      <div className={"wrap"}>
        <div className={"testimonials-head reveal"}>
          <div>
            <h2 className={"display"} data-reveal-words="">
              {"O que muda quando alguém encontra espaço para tentar."}
            </h2>
          </div>
          <div className={"test-controls"}>
            <button
              className={"test-prev"}
              type={"button"}
              aria-label={"Depoimento anterior"}
              aria-controls={"testimonial-carousel"}
            >
              <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <path d={"m15 18-6-6 6-6"}></path>
              </svg>
            </button>
            <button
              className={"test-next"}
              type={"button"}
              aria-label={"Próximo depoimento"}
              aria-controls={"testimonial-carousel"}
            >
              <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <path d={"m9 6 6 6-6 6"}></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={"test-track"}
          id={"testimonial-carousel"}
          role={"region"}
          aria-roledescription={"carrossel"}
          aria-label={"Histórias da comunidade"}
          aria-live={"off"}
        >
          <article className={"test-card active"}>
            <img
              src={
                "https://www.soujunior.tech/assets/collaborators/anderson-nunes.svg"
              }
              alt={"Anderson Nunes"}
            />
            <div>
              <span className={"test-index"}>{"01 / 03"}</span>
              <blockquote>
                {"“Após 6 meses de participação, meu ‘sim’ chegou.”"}
              </blockquote>
              <b>{"Anderson Nunes"}</b>
              <small>{"Front-end"}</small>
            </div>
          </article>
          <article className={"test-card"}>
            <img
              src={
                "https://www.soujunior.tech/assets/collaborators/anna-claudia.svg"
              }
              alt={"Anna Claudia Andrade"}
            />
            <div>
              <span className={"test-index"}>{"02 / 03"}</span>
              <p className={"test-summary"}>
                {
                  "Na SouJunior, Anna encontrou vivência real em UX/UI, prática em equipe e contato com metodologias ágeis."
                }
              </p>
              <b>{"Anna Claudia Andrade"}</b>
              <small>{"UX/UI Designer"}</small>
            </div>
          </article>
          <article className={"test-card"}>
            <img
              src={
                "https://www.soujunior.tech/assets/collaborators/priscilla-souza.svg"
              }
              alt={"Priscila Souza"}
            />
            <div>
              <span className={"test-index"}>{"03 / 03"}</span>
              <p className={"test-summary"}>
                {
                  "Priscila destaca o aprendizado em projetos e as conexões criadas por meio da comunidade."
                }
              </p>
              <b>{"Priscila Souza"}</b>
              <small>{"UX/UI Designer"}</small>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
