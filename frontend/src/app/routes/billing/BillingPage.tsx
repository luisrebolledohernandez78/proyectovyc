export default function BillingPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-cyan-100">Cotizaciones</h2>
        <p className="text-sm text-cyan-100/75">
          Genera y descarga cotizaciones en PDF para tus clientes directamente desde el backend.
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
          El módulo de cotizaciones expone endpoints y vistas en Django. Desde aquí puedes acceder a la
          documentación y a los recursos disponibles.
        </p>
        <ul className="text-sm text-cyan-100/85 space-y-2">
          <li>
            ✨ Generación de PDF: <code className="text-cyan-200">GET /billing/quote/&lt;id&gt;/pdf/</code>.
          </li>
          <li>
            ✨ Revisa las plantillas y estilos en{" "}
            <code className="text-cyan-200">templates/billing/</code> (repositorio).
          </li>
          <li>
            ✨ Consulta la documentación interactiva en{" "}
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
