export function Hero() {
  return (
    <section
      className={"hero hero-manifesto"}
      id={"hero"}
      aria-labelledby={"hero-title"}
    >
      {"\n      "}
      <div className={"hero-texture"} aria-hidden={"true"}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {"\n      "}
      <div className={"wrap hero-grid"}>
        {"\n        "}
        <div className={"hero-copy reveal"}>
          {"\n          "}
          <h1 id={"hero-title"}>
            <span className={"hero-line"}>{"Talento precisa"}</span>
            <span className={"hero-line"}>{"de pessoas que"}</span>
            <span className={"hero-emphasis"}>
              {"acreditam."}
              <svg
                className={"hero-scribble"}
                viewBox={"0 0 360 112"}
                preserveAspectRatio={"none"}
                aria-hidden={"true"}
              >
                <path
                  pathLength={"1"}
                  d={
                    "M20 58C22 21 88 7 181 8c92 1 159 17 160 49 2 34-65 49-161 47C87 102 16 89 20 58Z"
                  }
                ></path>
                <path
                  pathLength={"1"}
                  d={
                    "M13 61C18 27 82 13 177 12c98-1 166 13 169 44 4 35-62 51-165 50C83 105 8 92 13 61Z"
                  }
                ></path>
              </svg>
            </span>
          </h1>
          {"\n          "}
          <p className={"lead"}>
            {
              "A SouJunior conecta pessoas em início de carreira a projetos, mentoria e uma comunidade onde conhecimento vira experiência."
            }
          </p>
          {"\n          "}
          <div className={"hero-actions"}>
            <a
              className={"btn hero-primary"}
              href={"https://apoia.se/soujunior"}
              target={"_blank"}
              rel={"noopener"}
            >
              {"Apoie a SouJunior"}
            </a>
            <a className={"btn hero-secondary"} href={"#impacto"}>
              {"Conheça o impacto"}
            </a>
          </div>
          {"\n        "}
        </div>
        {"\n        "}
        <div className={"hero-visual reveal"}>
          {"\n          "}
          <img
            className={"hero-person"}
            src={"assets/hero-soujunior.png"}
            alt={
              "Jovem participante da comunidade SouJunior ao lado do mascote"
            }
            width={"1690"}
            height={"1148"}
            fetchPriority={"high"}
            decoding={"async"}
          />
          {"\n        "}
        </div>
        {"\n      "}
      </div>
      {"\n    "}
    </section>
  );
}
