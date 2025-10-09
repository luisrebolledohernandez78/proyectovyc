export default function BillingPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold">Cotizaciones</h2>
        <p className="text-sm text-neutral-400">
          Genera y descarga cotizaciones en PDF para tus clientes directamente desde el backend.
        </p>
      </header>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
        <p className="text-sm text-neutral-300 leading-relaxed">
          El módulo de cotizaciones expone endpoints y vistas en Django. Desde aquí puedes acceder a
          la documentación y a los recursos disponibles.
        </p>
        <ul className="text-sm text-neutral-200 space-y-2">
          <li>
            • Generación de PDF:{" "}
            <code className="text-blue-300">GET /billing/quote/&lt;id&gt;/pdf/</code>.
          </li>
          <li>
            • Revisa las plantillas y estilos en{" "}
            <code className="text-blue-300">templates/billing/</code> (repositorio).
          </li>
          <li>
            • Consulta la documentación interactiva en{" "}
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

