import React from "react";

export default function Sidebar() {
  return (
    <aside className="sticky top-8 self-start h-[calc(100vh-64px)]">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-[#071a4c]/80 border border-cyan-300/12 p-4">
        <div>
          <div className="text-sm font-semibold text-amber-200 mb-2">Taller</div>
          <p className="text-xs text-cyan-100/75">Bitácoras, agendamiento y control de flota</p>
        </div>

        <nav className="mt-6 flex-1 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-cyan-100 hover:bg-sky-900/30">
            <span>🏠</span>
            <span>Inicio</span>
          </a>
          <a href="#agenda" className="flex items-center gap-3 px-3 py-2 rounded-md text-cyan-100 hover:bg-sky-900/30">
            <span>📅</span>
            <span>Agenda</span>
          </a>
          <a href="#ots" className="flex items-center gap-3 px-3 py-2 rounded-md text-cyan-100 hover:bg-sky-900/30">
            <span>🧾</span>
            <span>OTs</span>
          </a>
          <a href="#diagnosticos" className="flex items-center gap-3 px-3 py-2 rounded-md text-cyan-100 hover:bg-sky-900/30">
            <span>🔎</span>
            <span>Diagnósticos</span>
          </a>
          <a href="#config" className="flex items-center gap-3 px-3 py-2 rounded-md text-cyan-100 hover:bg-sky-900/30">
            <span>⚙️</span>
            <span>Configuración</span>
          </a>
        </nav>

        <div className="mt-4 text-xs text-cyan-100/70">
          <a href="/usuarios/" className="inline-flex items-center gap-2">🏠 Volver al Home</a>
        </div>
      </div>
    </aside>
  );
}
