export function Journey() {
  return (
    <section className={"journey"} id={"como"}>
      <div className={"wrap"}>
        <div className={"journey-head reveal"}>
          <div>
            <h2 className={"display"} data-reveal-words="">
              {"Ninguém deveria precisar começar sozinho."}
            </h2>
          </div>
          <p>
            {
              "A SouJunior aproxima quem quer praticar de pessoas, projetos e aprendizados que ajudam a dar os primeiros passos com mais segurança."
            }
          </p>
        </div>
        <div className={"route"}>
          <article className={"route-step reveal"}>
            <div className={"route-dot"}>{"01"}</div>
            <h3>{"Aprender fazendo"}</h3>
            <p>
              {
                "Desafios próximos da realidade profissional, com colaboração, responsabilidade e espaço para errar e aprender."
              }
            </p>
          </article>
          <article className={"route-step reveal"}>
            <div className={"route-dot"}>{"02"}</div>
            <h3>{"Construir em equipe"}</h3>
            <p>
              {
                "Times multidisciplinares transformam conhecimento em entregas, repertório e portfólio demonstrável."
              }
            </p>
          </article>
          <article className={"route-step reveal"}>
            <div className={"route-dot"}>{"03"}</div>
            <h3>{"Ter com quem contar"}</h3>
            <p>
              {
                "Pessoas trocam experiências, encontram direção e constroem conexões para continuar avançando."
              }
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
