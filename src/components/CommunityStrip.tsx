export function CommunityStrip() {
  return (
    <div className={"momentum"} aria-label={"Pessoas, tecnologia e comunidade"}>
      {"\n      "}
      <div className={"momentum-slope"}>
        <div className={"momentum-track"}>
          <div className={"momentum-set"}>
            {"\n        "}
            <div className={"moment deep"}>
              <span>
                {"Seu começo"}
                <br />
                {"importa."}
              </span>
            </div>
            {"\n        "}
            <div className={"moment"}>
              <img
                src={
                  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=85"
                }
                alt={"Pessoas colaborando"}
                width={"600"}
                height={"360"}
                decoding={"async"}
              />
            </div>
            {"\n        "}
            <div className={"moment yellow"} aria-hidden={"true"}></div>
            {"\n        "}
            <div className={"moment"}>
              <img
                src={
                  "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&dpr=1&h=750&w=1260"
                }
                alt={"Duas mulheres revisando código em um laptop"}
                width={"5534"}
                height={"3694"}
                decoding={"async"}
              />
            </div>
            {"\n        "}
            <div className={"moment deep"}>
              <span>
                {"Aprender é"}
                <br />
                {"coletivo."}
              </span>
            </div>
            {"\n        "}
            <div className={"moment orange"} aria-hidden={"true"}></div>
            {"\n        "}
            <div className={"moment"}>
              <img
                src={
                  "https://images.pexels.com/photos/12899168/pexels-photo-12899168.jpeg?auto=compress&dpr=1&h=750&w=1260"
                }
                alt={"Colaboração no desenvolvimento de software"}
                width={"4000"}
                height={"6000"}
                decoding={"async"}
              />
            </div>
            {"\n      "}
          </div>
        </div>
      </div>
      {"\n    "}
    </div>
  );
}
