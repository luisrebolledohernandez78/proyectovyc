import React from "react";

export default function InfoCard() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-300/25 p-6 space-y-4 backdrop-blur-lg shadow-[0_32px_70px_-50px_rgba(34,211,238,0.45)] text-center vyc-card">
      <p className="text-sm leading-relaxed text-cyan-50/85">
        Usa esta sección como punto de partida para nuevos tableros operativos. Aquí podrás abrir
        diagnósticos, ver presupuestos y revisar el calendario de la flota.
      </p>

      <div className="flex justify-center">
        <a href="/usuarios/" className="btn-3d px-6 py-3">🏠 Volver al Home</a>
      </div>
    </div>
  );
}
