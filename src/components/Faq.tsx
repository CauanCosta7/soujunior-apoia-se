export function Faq() {
  return (
    <section
      id="faq"
      className="faq-section faq-stack"
      aria-labelledby="faq-title"
    >
      <div className="wrap faq-layout">
        <div className="faq-intro">
          <h2 className="display" id="faq-title" data-reveal-words="">
            {"O que você pode querer saber antes de apoiar."}
          </h2>
        </div>

        <div className="faq-list">
          <details className="faq-entry">
            <summary aria-controls="faq-answer-1">
              <span className="faq-question">
                {"Para onde vai o dinheiro?"}
              </span>
              <span className="faq-toggle" aria-hidden="true"></span>
            </summary>

            <div className="faq-answer" id="faq-answer-1">
              <p>
                {"O apoio ajuda a custear a "}
                <strong>{"infraestrutura da SouJunior"}</strong>
                {
                  ": AWS, banco de dados, sites, domínios e plataformas. Também cobre despesas pontuais, como o Restream em meses com mais eventos."
                }
              </p>
            </div>
          </details>

          <details className="faq-entry">
            <summary aria-controls="faq-answer-2">
              <span className="faq-question">{"Posso começar com R$ 2?"}</span>
              <span className="faq-toggle" aria-hidden="true"></span>
            </summary>

            <div className="faq-answer" id="faq-answer-2">
              <p>
                {"Sim, a proposta de apoio começa em "}
                <strong>{"R$ 2"}</strong>
                {
                  ". Você confirma o valor e a modalidade na campanha oficial. Escolha o que cabe no seu momento."
                }
              </p>
            </div>
          </details>

          <details className="faq-entry">
            <summary aria-controls="faq-answer-3">
              <span className="faq-question">
                {"O pagamento acontece aqui?"}
              </span>
              <span className="faq-toggle" aria-hidden="true"></span>
            </summary>

            <div className="faq-answer" id="faq-answer-3">
              <p>
                {"O pagamento é feito na "}
                <a
                  href={"https://apoia.se/soujunior"}
                  target="_blank"
                  rel="noopener"
                >
                  {"campanha oficial da SouJunior no Apoia.se"}
                </a>
                {
                  ". Esta página apresenta a iniciativa e encaminha você para concluir o apoio por lá."
                }
              </p>
            </div>
          </details>

          <details className="faq-entry">
            <summary aria-controls="faq-answer-4">
              <span className="faq-question">
                {"O apoio precisa ser mensal?"}
              </span>
              <span className="faq-toggle" aria-hidden="true"></span>
            </summary>

            <div className="faq-answer" id="faq-answer-4">
              <p>
                {
                  "As modalidades são definidas na campanha. Antes de concluir, confira no "
                }
                <a
                  href={"https://apoia.se/soujunior"}
                  target="_blank"
                  rel="noopener"
                >
                  {"Apoia.se"}
                </a>
                {" a frequência e as condições do apoio escolhido."}
              </p>
            </div>
          </details>

          <details className="faq-entry">
            <summary aria-controls="faq-answer-5">
              <span className="faq-question">
                {"Posso participar sem doar?"}
              </span>
              <span className="faq-toggle" aria-hidden="true"></span>
            </summary>

            <div className="faq-answer" id="faq-answer-5">
              <p>
                {"Sim. Conheça a comunidade no "}
                <a
                  href={"https://discord.gg/FkBcf3vdQZ"}
                  target="_blank"
                  rel="noopener"
                >
                  {"Discord"}
                </a>
                {", acompanhe os avisos pelo "}
                <a
                  href={"https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W"}
                  target="_blank"
                  rel="noopener"
                >
                  {"WhatsApp"}
                </a>
                {" ou participe dos projetos no "}
                <a
                  href={"https://github.com/SouJunior"}
                  target="_blank"
                  rel="noopener"
                >
                  {"GitHub"}
                </a>
                {"."}
              </p>
            </div>
          </details>
        </div>

        <p className="faq-help">
          {"Ainda ficou alguma dúvida? "}
          <a
            href={"https://discord.gg/FkBcf3vdQZ"}
            target="_blank"
            rel="noopener"
          >
            {"Converse com a comunidade"}
          </a>
        </p>
      </div>
    </section>
  );
}
