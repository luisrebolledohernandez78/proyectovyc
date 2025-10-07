import { useState } from "react";
import { Link } from "react-router-dom";

import { unwrapList, useOTs } from "../../../entities/ot/queries";
import { TOTListItem, TPaginatedOT } from "../../../entities/ot/types";

export default function OTListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error, refetch, isFetching } = useOTs({ page, search });

  const rows: TOTListItem[] = data ? unwrapList(data as TPaginatedOT | TOTListItem[]) : [];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Ordenes de Trabajo</h2>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por numero, cliente o patente"
          className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 w-full max-w-sm"
        />
        <button
          onClick={() => {
            setPage(1);
            refetch();
          }}
          className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
        >
          Buscar
        </button>
      </div>

      {isLoading && <p className="opacity-80">Cargando...</p>}

      {isError && (
        <div className="text-red-400">
          <p>No pudimos cargar las ordenes.</p>
          <pre className="text-xs opacity-80">{String((error as any)?.message ?? error)}</pre>
        </div>
      )}

      {rows.length > 0 && (
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-4xl mx-auto rounded-2xl border border-blue-950 overflow-x-auto shadow-2xl bg-white/95">
            <table className="min-w-[740px] mx-auto text-sm border border-blue-900">
              <thead className="bg-[#002366] text-white">
                <tr>
                  <th className="px-6 py-3 border-b border-blue-900">Numero</th>
                  <th className="px-6 py-3 border-b border-blue-900">Estado</th>
                  <th className="px-6 py-3 border-b border-blue-900">Cliente</th>
                  <th className="px-6 py-3 border-b border-blue-900">Vehiculo</th>
                  <th className="px-6 py-3 border-b border-blue-900">Apertura</th>
                  <th className="px-6 py-3 border-b border-blue-900 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((ot, idx) => (
                  <tr
                    key={ot.id}
                    className={`border-b border-blue-900 ${
                      idx % 2 === 0 ? "bg-blue-100/80" : "bg-blue-50/80"
                    } hover:bg-blue-200 transition-colors`}
                  >
                    <td className="px-6 py-3 font-semibold text-blue-900">
                      <Link to={`/ot/${ot.number}`} className="underline underline-offset-2 hover:opacity-80">
                        {ot.number}
                      </Link>
                    </td>
                    <td className="px-6 py-3">{ot.status_display}</td>
                    <td className="px-6 py-3">
                      {ot.client_name} <span className="text-xs opacity-70">#{ot.client_id}</span>
                    </td>
                    <td className="px-6 py-3">
                      {ot.vehicle_plate} <span className="text-xs opacity-70">#{ot.vehicle_id}</span>
                    </td>
                    <td className="px-6 py-3">{ot.opened_at.slice(0, 10)}</td>
                    <td className="px-6 py-3 text-right">{ot.grand_total_fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between p-3 bg-[#002366] border-t border-blue-900 text-white">
              <button
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 font-semibold shadow-md disabled:opacity-50"
              >
                Anterior
              </button>
              <div className="text-sm opacity-80">Pagina {page}</div>
              <button
                disabled={isFetching || rows.length === 0}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 font-semibold shadow-md disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && rows.length === 0 && (
        <p className="opacity-70">No se encontraron ordenes con el filtro aplicado.</p>
      )}
    </section>
  );
}
