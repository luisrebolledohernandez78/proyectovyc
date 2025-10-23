import React from "react";

export default function Hero() {
  return (
    <header className="text-center py-8">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-cyan-100/90">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
        VyC Ingeniería
      </span>

      <h1 className="mt-6 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-4xl md:text-5xl font-extrabold text-transparent drop-shadow-[0_0_18px_rgba(250,204,21,0.35)]">
        Mantenimiento y Reparación de Vehículos
      </h1>

      <p className="mx-auto max-w-2xl text-base text-cyan-100/80 mt-3">
        Coordina diagnósticos, reparaciones y mantenimientos preventivos de la flota.
      </p>
    </header>
  );
}
