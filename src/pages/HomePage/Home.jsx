
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "../../components/Logo";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const revealRefs = useRef([]);
  revealRefs.current = [];
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="min-h-screen font-sans text-slate-100 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <div className="hidden md:flex items-center gap-6">
              <a href="#sobre" className="text-slate-300 hover:text-white transition">Sobre</a>
              <a href="#servicos" className="text-slate-300 hover:text-white transition">Serviços</a>
              <a href="#portfolio" className="text-slate-300 hover:text-white transition">Projetos</a>
              <a href="#contato" className="text-slate-300 hover:text-white transition">Contato</a>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                  <a href="/login" className="px-3 py-1 rounded-md text-sm border border-slate-700 text-slate-200 hover:bg-slate-800 transition">Entrar</a>
                  <a href="/register" className="bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full font-semibold shadow hover:brightness-95 transition">Registrar</a>
              </div>
              
              <button
                className="md:hidden ml-1 p-2 rounded-md hover:bg-slate-800/60 transition"
                aria-label="menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-slate-800 border-b border-slate-700 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-3">
              <a href="#sobre" className="text-slate-300 hover:text-white transition px-2 py-1">Sobre</a>
              <a href="#servicos" className="text-slate-300 hover:text-white transition px-2 py-1">Serviços</a>
              <a href="#portfolio" className="text-slate-300 hover:text-white transition px-2 py-1">Projetos</a>
              <a href="#contato" className="text-slate-300 hover:text-white transition px-2 py-1">Contato</a>
              <div className="border-t border-slate-700 pt-3 mt-2 flex flex-col space-y-3">
                <a href="/login" className="px-3 py-2 text-center rounded-md text-sm border border-slate-700 text-slate-200 hover:bg-slate-800 transition">Entrar</a>
                <a href="/register" className="bg-amber-400 text-slate-900 px-4 py-2 text-center rounded-full font-semibold shadow hover:brightness-95 transition">Registrar</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <header className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700" aria-hidden />
        <div className="absolute inset-0 opacity-5 bg-[url('/grid-dark.svg')] bg-repeat" aria-hidden />
        <div className="z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center">
          <div className="mb-12">
            <Logo
              className="text-5xl [&>svg]:w-16 [&>svg]:h-16 transform transition-all duration-700 scale-95 opacity-0 animate-hero"
              style={{ animationFillMode: "forwards" }}
            />
          </div>
          <div>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-amber-400">JWT House</span>
              <span className="text-slate-400"> — Software Development</span>
            </p>
            <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Transformamos ideias em software de alto impacto.
            </h1>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
              Design limpo. Código que respira. Entregas que duram.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="#contato" className="bg-amber-400 text-slate-900 px-6 py-3 rounded-full font-semibold shadow hover:brightness-95 transition">
                Fale Conosco
              </a>
              <a href="#servicos" className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition">
                Ver Serviços
              </a>
            </div>
          </div>
          <button
            aria-label="scroll-down"
            onClick={() => document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl text-slate-200/90 animate-bounce"
          >
            ↓
          </button>
        </div>
      </header>
      
      {/* MAIN CONTENT */}
      <main className="bg-slate-50 text-slate-900">
        {/* Small container for visual continuity */}
        <section id="servicos" className="py-12 px-6 max-w-6xl mx-auto -mt-20">
          <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-slate-200/40 p-6 shadow">
            <div className="mx-auto max-w-4xl text-center" ref={addRef}>
              <h2 className="text-2xl md:text-3xl font-bold">
                O que entregamos
              </h2>
              <p className="mt-3 text-slate-700">
                Entregas práticas, seguras e orientadas a resultado. Nós
                escalamos ideias — não a dívida técnica.
              </p>
            </div>

            {/* FEATURES CARDS */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <article
                ref={addRef}
                className="reveal p-6 bg-white/90 rounded-2xl border border-slate-200/40 shadow-sm text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 rounded-lg bg-slate-900/10 flex items-center justify-center text-amber-400">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-semibold">Soluções Rápidas</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      MVPs e features entregues com velocidade sem perder
                      qualidade.
                    </p>
                  </div>
                </div>
              </article>

              <article
                ref={addRef}
                className="reveal p-6 bg-white/90 rounded-2xl border border-slate-200/40 shadow-sm text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 rounded-lg bg-slate-900/10 flex items-center justify-center text-emerald-400">
                    🔒
                  </div>
                  <div>
                    <h3 className="font-semibold">Segurança</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Autenticação, autorização e práticas que protegem seus
                      dados e clientes.
                    </p>
                  </div>
                </div>
              </article>

              <article
                ref={addRef}
                className="reveal p-6 bg-white/90 rounded-2xl border border-slate-200/40 shadow-sm text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 rounded-lg bg-slate-900/10 flex items-center justify-center text-violet-400">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-semibold">Performance</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Códigos otimizados, caching e arquitetura pensada para
                      escala.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="sobre" className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div ref={addRef} className="reveal">
              <h3 className="text-2xl font-bold">Quem somos</h3>
              <p className="mt-4 text-slate-600">
                Somos uma pequena engenharia com ambição de gigante. Arquitetura
                clara, processos enxutos, entregas que fazem diferença no
                negócio. Trabalhamos com times remotos, sprints objetivos e code
                reviews que realmente importam.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Arquitetura de APIs (REST / GraphQL)</li>
                <li>• Frontend moderno (React, Next.js)</li>
                <li>• Mobile (React Native / Flutter)</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a
                  href="#contato"
                  className="bg-amber-400 text-slate-900 px-4 py-2 rounded-full font-semibold"
                >
                  Solicitar orçamento
                </a>
                <a
                  href="#portfolio"
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700"
                >
                  Ver projetos
                </a>
              </div>
            </div>

            <div ref={addRef} className="reveal">
              {/* placeholder image area — substitua por screenshot / mockup */}
              <div className="w-full h-64 md:h-56 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 shadow-inner flex items-center justify-center text-slate-300">
                <div className="text-center px-6">
                  <div className="text-xl font-semibold">
                    Mockup / Screenshot
                  </div>
                  <div className="text-sm mt-2 text-slate-400">
                    Coloque aqui uma imagem do painel ou projeto.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO (small) */}
        <section id="portfolio" className="py-12 px-6 bg-slate-100">
          <div className="max-w-6xl mx-auto">
            <h4 ref={addRef} className="reveal text-2xl font-bold">
              Projetos Recentes
            </h4>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  ref={addRef}
                  className="reveal bg-white rounded-xl shadow p-4"
                >
                  <div className="h-36 bg-gray-200 rounded mb-3" />
                  <h5 className="font-semibold">Projeto {n}</h5>
                  <p className="text-sm text-slate-600">
                    Breve descrição e stack utilizada.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / CONTACT */}
        <section
          id="contato"
          className="py-16 px-6 bg-slate-800 text-slate-100 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h4 ref={addRef} className="reveal text-2xl font-bold">
              Vamos construir algo memorável?
            </h4>
            <p className="mt-3 text-slate-300">
              Se você tem a ideia, nós temos o caminho e o código.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href="mailto:contato@jwthouse.com"
                className="bg-amber-400 text-slate-900 px-6 py-3 rounded-full font-semibold shadow"
              >
                Fale Conosco
              </a>
              <a
                href="/login"
                className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200"
              >
                Área do Cliente
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center text-slate-400">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} JWT HOUSE — Todos os direitos
              reservados.
            </div>
            <nav className="flex gap-4">
              <a href="#" className="hover:text-white transition">
                Política
              </a>
              <a href="#" className="hover:text-white transition">
                Privacidade
              </a>
              <a href="#" className="hover:text-white transition">
                GitHub
              </a>
            </nav>
          </div>
        </footer>
      </main>

      {/* Local styles for animations / reveal */}
      <style>{`
        .animate-hero { 
          animation: heroPop 900ms cubic-bezier(.2,.9,.26,1) forwards; 
        }
        @keyframes heroPop {
          from { opacity: 0; transform: translateY(8px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .reveal { opacity: 0; transform: translateY(12px); transition: all 600ms cubic-bezier(.2,.9,.26,1);}
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}




