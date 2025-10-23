import React from "react";
import Hero from "./components/Hero";
import StepsRow from "./components/StepsRow";
import InfoCard from "./components/InfoCard";
import AppointmentsCalendar from "./AppointmentsCalendar";

export default function WorkshopPage() {
  return (
    <div className="min-h-screen relative">
      {/* soft decorative blobs similar to backend intranet */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute -top-32 right-[25%] h-80 w-80 rounded-full bg-cyan-400/25 blur-[180px]" />
        <div className="absolute bottom-[-25%] left-[18%] h-96 w-96 rounded-full bg-amber-300/18 blur-[220px]" />
      </div>

      <section className="vyc-container grid grid-cols-[320px_1fr] gap-6 p-6">
      <aside>
        {/* Left sidebar: quick module list + logout */}
        <div className="rounded-2xl border border-cyan-300/15 bg-[#071a4c]/90 p-6 h-full">
          <h3 className="text-2xl font-semibold text-amber-200 mb-2">Mantenimiento y Reparación</h3>
          <p className="text-sm text-cyan-100/70 mb-4">Coordina diagnósticos, reparaciones y entregas.</p>

          <nav className="space-y-2 mt-4">
            <a className="block px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">Clientes</a>
            <a className="block px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">Próximamente</a>
          </nav>

          <div className="mt-6">
            <a href="/usuarios/" className="inline-flex items-center gap-2 px-4 py-3 bg-transparent border-2 border-amber-300 rounded-lg text-amber-200 w-full justify-center">🏠 Volver al Home</a>
            <form method="post" action="/logout/" className="mt-3">
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-[#062b73] via-[#083069] to-[#0a2150] border-2 border-amber-300 rounded-lg text-cyan-50">🚪 Salir</button>
            </form>
          </div>
        </div>
      </aside>

      <main>
        <Hero />
        <StepsRow />
        <InfoCard />

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-cyan-100 mb-3">Calendario de Agendamiento</h3>
          <AppointmentsCalendar />
        </section>
      </main>
      </section>
    </div>
  );
}
