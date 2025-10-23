import OperationsSidebar from "./OperationsSidebar";
import AppointmentsCalendar from "./AppointmentsCalendar";

export default function WorkshopPage() {
  return (
    <section className="grid grid-cols-[280px_1fr] gap-6">
      <OperationsSidebar current={1} />
      <main>
        {/* Hero similar to backend intranet landing for maintenance */}
        <header className="text-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-cyan-100/90">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]"></span>
            VyC Ingeniería
          </span>

          <h1 className="mt-6 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-4xl md:text-5xl font-extrabold text-transparent drop-shadow-[0_0_18px_rgba(250,204,21,0.35)]">
            Mantenimiento y Reparación de Vehículos
          </h1>

          <p className="mx-auto max-w-2xl text-base text-cyan-100/80 mt-3">
            Coordina diagnósticos, reparaciones y mantenimientos preventivos de la flota.
          </p>
        </header>

        {/* Single top steps row (large buttons) */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {['PASO 1\nAgendamiento','PASO 2\nRecepción & Diagnóstico','PASO 3\nPresupuesto','PASO 4\nReparación','PASO 5\nPago','PASO 6\nEntrega'].map((label) => (
            <button
              key={label}
              className="px-6 py-3 text-xs uppercase tracking-wider rounded-lg text-cyan-50 bg-gradient-to-br from-[#0e6aa8] via-[#0b5a8a] to-[#08436a] shadow-inner"
              style={{ whiteSpace: 'pre-line' }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-300/25 p-6 space-y-4 backdrop-blur-lg shadow-[0_32px_70px_-50px_rgba(34,211,238,0.45)] text-center">
          <p className="text-sm leading-relaxed text-cyan-50/85">
            Usa esta sección como punto de partida para nuevos tableros operativos. Actualmente las
            operaciones del taller se exponen vía API REST.
          </p>

          <div className="flex justify-center">
            <a href="/usuarios/" className="btn-3d px-6 py-3">🏠 Volver al Home</a>
          </div>

        </div>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-cyan-100 mb-3">Calendario de Agendamiento</h3>
          <AppointmentsCalendar />
        </section>
      </main>
    </section>
  );
}
