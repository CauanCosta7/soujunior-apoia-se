export function Header() {
  return (
    <header>
      <div className={"wrap nav"}>
        <a className={"brand"} href={"#"} aria-label={"SouJunior - início"}>
          <img src={"assets/logo-soujunior-azul.svg"} alt={"SouJunior"} />
        </a>
        <nav
          className={"links"}
          id={"main-navigation"}
          aria-label={"Navegação principal"}
        >
          <a href={"#como"}>{"Como fazemos"}</a>
          <a href={"#impacto"}>{"Impacto"}</a>
          <a href={"#causa"}>{"Por que apoiar"}</a>
          <a href={"#transparencia"}>{"Transparência"}</a>
          <a href={"#faq"}>{"FAQ"}</a>
          <a
            className={"nav-cta nav-cta-mobile"}
            href={"https://apoia.se/soujunior"}
            target={"_blank"}
            rel={"noopener"}
          >
            {"Quero apoiar"}
          </a>
        </nav>
        <div className={"nav-actions"}>
          <button
            className={"theme-toggle"}
            type={"button"}
            aria-pressed={"false"}
            aria-label={"Ativar modo escuro"}
          >
            <span className={"theme-track"}>
              <svg
                className={"theme-sun"}
                viewBox={"0 0 24 24"}
                aria-hidden={"true"}
              >
                <circle cx={"12"} cy={"12"} r={"4"}></circle>
                <path
                  d={
                    "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                  }
                ></path>
              </svg>
              <svg
                className={"theme-moon"}
                viewBox={"0 0 24 24"}
                aria-hidden={"true"}
              >
                <path
                  d={"M20 15.2A8 8 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z"}
                ></path>
              </svg>
              <span className={"theme-knob"} aria-hidden={"true"}></span>
            </span>
            <span className={"sr-only"}>{"Alternar tema"}</span>
          </button>
          <a
            className={"nav-cta nav-cta-desktop"}
            href={"https://apoia.se/soujunior"}
            target={"_blank"}
            rel={"noopener"}
          >
            {"Quero apoiar"}
          </a>
          <button
            className={"menu"}
            type={"button"}
            aria-label={"Abrir menu"}
            aria-controls={"main-navigation"}
            aria-expanded={"false"}
          >
            <span className={"menu-icon"} aria-hidden={"true"}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
