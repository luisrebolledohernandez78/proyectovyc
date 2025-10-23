import OperationsSidebar from "./OperationsSidebar";
import AppointmentsCalendar from "./AppointmentsCalendar";

export default function WorkshopPage() {
  return (
    <section className="grid grid-cols-[280px_1fr] gap-6">
      <OperationsSidebar current={1} />
      <main>
        <header className="space-y-1 mb-4">
          <h2 className="text-2xl font-semibold text-cyan-100">Taller</h2>
          <p className="text-sm text-cyan-100/75">
            Seguimiento de órdenes de trabajo, reparaciones y acciones realizadas en el taller.
          </p>
        </header>

        {/* Top steps row similar to backend UI */}
        <div className="mb-6 flex flex-wrap gap-3">
          {['PASO 1\nAgendamiento','PASO 2\nRecepción & Diagnóstico','PASO 3\nPresupuesto','PASO 4\nReparación','PASO 5\nPago','PASO 6\nEntrega'].map((label, idx) => (
            <button
              key={label}
              className={`btn-3d px-6 py-3 text-xs uppercase tracking-wider bg-gradient-to-br from-[#0b4a88] via-[#0b3a6a] to-[#073059] text-cyan-50/95 ${idx === 0 ? 'shadow-lg' : ''}`}
              style={{whiteSpace: 'pre-line'}}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-cyan-300/25 p-6 space-y-4 backdrop-blur-lg shadow-[0_32px_70px_-50px_rgba(34,211,238,0.6)]">
          <p className="text-sm leading-relaxed text-cyan-50/85">
            Usa esta sección como punto de partida para nuevos tableros operativos. Actualmente las
            operaciones del taller se exponen vía API REST.
          </p>

          <AppointmentsCalendar />
        </div>
      </main>
    </section>
  );
}
