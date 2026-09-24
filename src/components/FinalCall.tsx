export function FinalCall() {
  return (
    <section className="final">
      <div className="final-inner">
        <div>
          <h2>
            {"Mais gente pode começar quando existe espaço para praticar."}
          </h2>
          <a
            className="btn btn-dark"
            href={"https://apoia.se/soujunior"}
            target="_blank"
            rel="noopener"
          >
            {"Apoiar a SouJunior"}
          </a>
        </div>
        <img
          className="final-mascot"
          src={"assets/mascote-soujunior.png"}
          alt={"Mascote azul da SouJunior fazendo sinal de positivo"}
        />
      </div>
    </section>
  );
}
