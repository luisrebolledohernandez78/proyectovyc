import React from "react";

const steps = [
  "Agendamiento",
  "Recepción & Diagnóstico",
  "Presupuesto",
  "Reparación",
  "Pago",
  "Entrega",
];

export default function OperationsSidebar({ current = 1 }: { current?: number }) {
  return (
    <aside className="w-72 sticky top-6 h-[calc(100vh-48px)] flex flex-col gap-6">
      <div className="p-4 rounded-lg bg-gradient-to-b from-[#071a4c]/90 via-[#051433]/80 to-[#04091f]/95 border border-cyan-400/10">
        <h3 className="text-sm text-amber-200">V Y C • Taller</h3>
        <h2 className="text-lg font-semibold text-cyan-100">Mantenimiento y Reparación</h2>
        <p className="text-xs text-cyan-100/70">Coordina diagnósticos, reparaciones y entregas.</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-1">
        <div className="space-y-3">
          {steps.map((s, i) => (
            <button
              key={s}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-shadow duration-200 ${
                current === i + 1
                  ? 'border-amber-300 bg-gradient-to-br from-[#0b4a88] via-[#0b3a6a] to-[#073059] shadow-[0_24px_48px_-24px_rgba(11,74,136,0.45)]'
                  : 'border-amber-300/30 bg-transparent'
              }`}
            >
              <div className="text-xs text-amber-200">PASO {i + 1}</div>
              <div className="font-medium text-cyan-100">{s}</div>
            </button>
          ))}
        </div>
      </nav>

      <div className="px-4 pb-6">
        <a href="/usuarios/" className="w-full inline-flex items-center justify-center gap-2 mb-3 px-4 py-3 bg-transparent border-2 border-amber-300 rounded-lg text-amber-200">🏠 Volver al Home</a>
        <form method="post" action="/logout/">{`{% csrf_token %}`}
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-[#062b73] via-[#083069] to-[#0a2150] border-2 border-amber-300 rounded-lg text-cyan-50">🚪 Salir</button>
        </form>
      </div>
    </aside>
  );
}
