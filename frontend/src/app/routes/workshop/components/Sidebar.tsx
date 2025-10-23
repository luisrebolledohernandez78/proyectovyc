import React from "react";

export default function Sidebar() {
  return (
    <aside className="sticky top-8 self-start">
      <div className="space-y-4">
        <a href="#" className="module-card neon-border block mx-auto" style={{width:320}}>
          <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-[1.05rem] font-extrabold uppercase text-transparent drop-shadow-[0_0_12px_rgba(250,204,21,0.35)]">
            Taller
          </span>
          <span className="mt-3 text-[0.77rem] font-normal tracking-normal text-cyan-100/75">
            Bitácoras, agendamiento y control de flota
          </span>
        </a>

  <div className="rounded-2xl border border-cyan-300/15 bg-[#071a4c]/90 p-6">
          <h4 className="text-lg font-semibold text-amber-200">Atajos</h4>
          <nav className="mt-4 flex flex-col gap-2">
            <a className="px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">Agenda</a>
            <a className="px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">OTs</a>
            <a className="px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">Diagnósticos</a>
          </nav>

          <div className="mt-6">
            <a href="/usuarios/" className="inline-flex items-center gap-2 px-4 py-3 bg-transparent border-2 border-amber-300 rounded-lg text-amber-200 w-full justify-center">🏠 Volver al Home</a>
            <form method="post" action="/logout/" className="mt-3">
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 btn-3d">🚪 Salir</button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
