import React from "react";

import React from "react";

type Props = {
  activeStep: number;
  onSelectStep: (n: number) => void;
};

const stepLabels = [
  "PASO 1\nAgendamiento",
  "PASO 2\nRecepción & Diagnóstico",
  "PASO 3\nPresupuesto",
  "PASO 4\nReparación",
  "PASO 5\nPago",
  "PASO 6\nEntrega",
];

export default function Sidebar({ activeStep, onSelectStep }: Props) {
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

          <div className="mt-4">
            <div className="text-xs font-semibold text-cyan-200 mb-2">Pasos</div>
            <div className="flex flex-col gap-2">
              {stepLabels.map((label, idx) => {
                const step = idx + 1;
                const isActive = activeStep === step;
                return (
                  <button
                    key={label}
                    onClick={() => onSelectStep(step)}
                    className={
                      "text-left px-3 py-2 rounded-md w-full text-cyan-100 transition-all " +
                      (isActive
                        ? "bg-gradient-to-r from-[#0fb4e0] via-[#0b93c2] to-[#0a6a9d] shadow-md"
                        : "hover:bg-sky-900/20")
                    }
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <a href="#ots" className="flex items-center gap-3 px-3 py-2 rounded-md text-cyan-100 hover:bg-sky-900/30 mt-4">
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
