import { useState } from "react";
import { Link } from "react-router-dom";
import { useOTs } from "../../../entities/ot/queries";

export default function OTListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, refetch, isFetching } = useOTs({ page, search });

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Órdenes de Trabajo</h2>

      <div className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por número/cliente…"
          className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 w-full max-w-sm"
        />
        <button
          onClick={() => { setPage(1); refetch(); }}
          className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
        >
          Buscar
        </button>
      </div>

      {isLoading && <p className="opacity-80">Cargando…</p>}

      {isError && (
        <div className="text-red-400">
          <p>Ups, no pudimos cargar OTs.</p>
          <pre className="text-xs opacity-80">{String((error as any)?.message ?? error)}</pre>
          <p className="text-xs opacity-80">
            Tip: revisa que el endpoint en <code>entities/ot/queries.ts</code> apunte a <code>/api/workorders/</code>.
          </p>
        </div>
      )}

      {data && (
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900">
              <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-3">
                <th>ID</th>
                <th>Número</th>
                <th>Estado</th>
                <th>Cliente (ID)</th>
                <th>Vehículo (ID)</th>
                <th>Abierta</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {("results" in data ? data.results : data).map((ot: any) => (
                <tr key={ot.id} className="border-t border-neutral-800 [&>td]:px-4 [&>td]:py-3">
                  <td>
                    <Link to={`/ot/${ot.number}`} className="underline underline-offset-2 hover:opacity-80">
                      {ot.number}
                    </Link>
                  </td>
                  <td>{ot.number ?? "-"}</td>
                  <td>{ot.status ?? "-"}</td>
                  <td>{ot.client ?? "-"}</td>
                  <td>{ot.vehicle ?? "-"}</td>
                  <td>{ot.opened_at ? ot.opened_at.slice(0, 10) : "-"}</td>
                  <td>{ot.grand_total_fmt ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between p-3 bg-neutral-900 border-t border-neutral-800">
            <button
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 rounded-lg bg-neutral-800 disabled:opacity-50"
            >
              ← Anterior
            </button>
            <div className="text-sm opacity-80">Página {page}</div>
            <button
              disabled={isFetching || (data?.results && data.results.length === 0)}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-2 rounded-lg bg-neutral-800 disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
