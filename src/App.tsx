import { useRef } from "react";
import { usePageInteractions } from "./hooks/usePageInteractions";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CommunityStrip } from "./components/CommunityStrip";
import { Journey } from "./components/Journey";
import { Impact } from "./components/Impact";
import { Testimonials } from "./components/Testimonials";
import { Transparency } from "./components/Transparency";
import { Support } from "./components/Support";
import { Faq } from "./components/Faq";
import { FinalCall } from "./components/FinalCall";
import { Footer } from "./components/Footer";
export default function App() {
  const root = useRef<HTMLDivElement>(null);
  usePageInteractions(root);
  return (
    <div ref={root}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <CommunityStrip />
        <Journey />
        <Impact />
        <Testimonials />
        <Transparency />
        <Support />
        <Faq />
        <FinalCall />
      </main>
      <Footer />
    </div>
  );
}
