export function Footer() {
  return (
    <footer id="footer">
      <div className="wrap foot">
        <div>
          <a className="brand" href="#hero" aria-label="SouJunior - início">
            <img
              className="brand-white"
              src={"assets/logo-soujunior-branco.svg"}
              alt={"SouJunior"}
            />
          </a>
          <small>
            {"Mais pessoas. Mais oportunidades. Um futuro mais justo."}
          </small>
        </div>
        <nav className="foot-links">
          <a
            className="foot-link"
            href={"https://apoia.se/soujunior"}
            target="_blank"
            rel="noopener"
          >
            <strong>{"Apoia.se"}</strong>
            {"Campanha oficial"}
          </a>
          <a
            className="foot-link"
            href={"https://discord.gg/FkBcf3vdQZ"}
            target="_blank"
            rel="noopener"
          >
            <strong>{"Discord"}</strong>
            {"Dúvidas e comunidade"}
          </a>
          <a
            className="foot-link"
            href={"https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W"}
            target="_blank"
            rel="noopener"
          >
            <strong>{"WhatsApp"}</strong>
            {"Grupo de avisos"}
          </a>
          <a
            className="foot-link"
            href={"https://github.com/SouJunior"}
            target="_blank"
            rel="noopener"
          >
            <strong>{"GitHub"}</strong>
            {"Projetos open-source"}
          </a>
        </nav>
      </div>
    </footer>
  );
}
