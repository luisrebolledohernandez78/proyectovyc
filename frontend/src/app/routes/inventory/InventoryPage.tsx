export default function InventoryPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-cyan-100">Inventario</h2>
        <p className="text-sm text-cyan-100/75">
          Controla el stock de repuestos y registra consumos vinculados a las órdenes de trabajo.
        </p>
      </header>

      <div
        className="rounded-3xl border border-cyan-300/25 p-6 space-y-4 backdrop-blur-lg shadow-[0_32px_70px_-50px_rgba(34,211,238,0.6)]"
        style={{
          background:
            "linear-gradient(140deg, rgba(34,211,238,0.12) 0%, rgba(5,20,51,0.75) 60%, rgba(250,204,21,0.12) 100%)",
        }}
      >
        <p className="text-sm leading-relaxed text-cyan-50/85">
          La interfaz dedicada aún está en desarrollo. Mientras tanto puedes gestionar el inventario a
          través de la API y del panel administrativo de Django.
        </p>
        <ul className="text-sm text-cyan-100/85 space-y-2">
          <li>
            ✨ Registrar consumos de partes vía API en{" "}
            <code className="text-cyan-200">POST /api/parts/</code>.
          </li>
          <li>
            ✨ Revisar existencias y catálogos en el panel de administración{" "}
            <a
              className="underline decoration-dotted underline-offset-4 text-cyan-100/85 transition-colors hover:text-amber-200"
              href={import.meta.env.VITE_DJANGO_ADMIN_URL ?? "http://127.0.0.1:8000/admin/"}
              target="_blank"
              rel="noreferrer"
            >
              (Inventario &gt; Parts)
            </a>
            .
          </li>
          <li>
            ✨ Documentación completa en{" "}
            <a
              className="underline decoration-dotted underline-offset-4 text-cyan-100/85 transition-colors hover:text-amber-200"
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
