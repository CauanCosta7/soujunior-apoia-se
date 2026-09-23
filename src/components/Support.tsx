export function Support() {
  return (
    <section className={"giving"} id={"apoie"}>
      <div className={"wrap giving-shell"}>
        <div className={"giving-story reveal"}>
          <h2 className={"display"} data-reveal-words="">
            {
              "Ajude esta comunidade a continuar aberta para quem está começando."
            }
          </h2>
          <p>
            {
              "Seu apoio ajuda a manter a infraestrutura usada por pessoas que ainda estão construindo experiência. Escolha um valor que faça sentido para o seu momento."
            }
          </p>
          <div className={"giving-note"}>
            <b aria-hidden={"true"}>{"R$"}</b>
            <span>
              {"Contribua a partir de R$ 2, se couber no seu momento."}
            </span>
          </div>
        </div>
        <div className={"giving-action reveal"} id={"planos"}>
          <h3>{"Quanto você gostaria de contribuir?"}</h3>
          <p>{"Nenhum apoio é pequeno quando se soma a tantos outros."}</p>
          <div
            className={"amounts"}
            role={"group"}
            aria-label={"Sugestões de contribuição"}
          >
            <button className={"amount"} type={"button"} aria-pressed={"false"}>
              {"R$ 2"}
            </button>
            <button className={"amount"} type={"button"} aria-pressed={"false"}>
              {"R$ 5"}
            </button>
            <button className={"amount"} type={"button"} aria-pressed={"false"}>
              {"R$ 10"}
            </button>
            <button className={"amount"} type={"button"} aria-pressed={"false"}>
              {"R$ 25"}
            </button>
            <button className={"amount"} type={"button"} aria-pressed={"false"}>
              {"Outro"}
            </button>
          </div>
          <div className={"response"} role={"status"} aria-live={"polite"}>
            {"💙 Escolha um valor para fazer parte dessa história."}
          </div>
          <a
            className={"btn"}
            href={"https://apoia.se/soujunior"}
            target={"_blank"}
            rel={"noopener"}
          >
            {"Continuar no Apoia.se"}
          </a>
          <p className={"fine"}>
            {
              "No Apoia.se, você confere as modalidades e conclui com segurança."
            }
          </p>
        </div>
      </div>
    </section>
  );
}
