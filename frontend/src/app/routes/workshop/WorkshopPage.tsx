export default function WorkshopPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold">Taller</h2>
        <p className="text-sm text-neutral-400">
          Seguimiento de órdenes de trabajo, reparaciones y acciones realizadas en el taller.
        </p>
      </header>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
        <p className="text-sm text-neutral-300 leading-relaxed">
          Usa esta sección como punto de partida para nuevos tableros operativos. Actualmente las
          operaciones del taller se exponen vía API REST.
        </p>
        <ul className="text-sm text-neutral-200 space-y-2">
          <li>
            • Listado y creación de órdenes:{" "}
            <code className="text-blue-300">GET/POST /api/workorders/</code>.
          </li>
          <li>
            • Consulta de detalle por identificador:{" "}
            <code className="text-blue-300">GET /api/workorders/&lt;identifier&gt;/</code>.
          </li>
          <li>
            • Registro de acciones de reparación:{" "}
            <code className="text-blue-300">POST /api/repairs/</code>.
          </li>
          <li>
            • Revisa el flujo completo en{" "}
            <a
              className="underline decoration-dotted underline-offset-4 hover:text-white"
              href={import.meta.env.VITE_API_DOCS_URL ?? "http://127.0.0.1:8000/api/docs/"}
              target="_blank"
              rel="noreferrer"
            >
              Swagger UI
            </a>
            .
          </li>
        </ul>
      </div>
    </section>
  );
}

