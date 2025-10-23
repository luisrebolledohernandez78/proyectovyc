export default function WorkshopPage() {
  return (
    <section className="grid grid-cols-[320px_1fr] gap-6 p-6">
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
  );
}
