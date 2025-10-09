export default function InventoryPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold">Inventario</h2>
        <p className="text-sm text-neutral-400">
          Controla el stock de repuestos y registra consumos vinculados a las órdenes de trabajo.
        </p>
      </header>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
        <p className="text-sm text-neutral-300 leading-relaxed">
          La interfaz dedicada aún está en desarrollo. Mientras tanto puedes gestionar el inventario a
          través de la API y del panel administrativo de Django.
        </p>
        <ul className="text-sm text-neutral-200 space-y-2">
          <li>
            • Registrar consumos de partes vía API en <code className="text-blue-300">POST /api/parts/</code>.
          </li>
          <li>
            • Revisar existencias y catálogos en el panel de administración{" "}
            <a
              className="underline decoration-dotted underline-offset-4 hover:text-white"
              href={import.meta.env.VITE_DJANGO_ADMIN_URL ?? "http://127.0.0.1:8000/admin/"}
              target="_blank"
              rel="noreferrer"
            >
              (Inventario &gt; Parts)
            </a>
            .
          </li>
          <li>
            • Documentación completa en{" "}
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

