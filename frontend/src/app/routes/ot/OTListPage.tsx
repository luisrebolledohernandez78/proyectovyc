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
    <section className="space-y-5">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-cyan-100">Órdenes de Trabajo</h2>
        <p className="text-sm text-cyan-100/75">
          Filtra y consulta el historial de órdenes gestionadas desde el Centro de Control.
        </p>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por número, cliente o patente"
          className="w-full max-w-sm rounded-lg border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm text-cyan-100 placeholder:text-cyan-200/60 transition focus:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
        />
        <button
          onClick={() => {
            setPage(1);
            refetch();
          }}
          className="btn-3d text-xs"
        >
          Buscar
        </button>
      </div>

      {isLoading && <p className="text-sm text-cyan-100/70">Cargando...</p>}

      {isError && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          <p>No pudimos cargar las órdenes.</p>
          <pre className="mt-2 max-h-40 overflow-auto text-xs opacity-80">
            {String((error as any)?.message ?? error)}
          </pre>
        </div>
      )}

      {rows.length > 0 && (
        <div
          className="overflow-hidden rounded-3xl border border-cyan-300/25 shadow-[0_32px_70px_-50px_rgba(34,211,238,0.6)]"
          style={{
            background:
              "linear-gradient(150deg, rgba(34,211,238,0.16) 0%, rgba(5,20,51,0.78) 60%, rgba(250,204,21,0.14) 100%)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm text-cyan-50/90">
              <thead className="bg-cyan-500/15 text-cyan-50">
                <tr className="[&>th]:px-5 [&>th]:py-3 [&>th]:text-xs [&>th]:uppercase [&>th]:tracking-[0.3em]">
                  <th>Número</th>
                  <th>Estado</th>
                  <th>Cliente</th>
                  <th>Vehículo</th>
                  <th>Apertura</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((ot, index) => (
                  <tr
                    key={ot.id}
                    className={`transition-colors [&>td]:px-5 [&>td]:py-3 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                    } hover:bg-amber-300/20`}
                  >
                    <td className="font-semibold text-cyan-100">
                      <Link
                        to={`/ot/${ot.number}`}
                        className="underline decoration-dotted underline-offset-4 hover:text-amber-200"
                      >
                        {ot.number}
                      </Link>
                    </td>
                    <td>{ot.status_display}</td>
                    <td>
                      {ot.client_name} <span className="text-xs text-cyan-100/60">#{ot.client_id}</span>
                    </td>
                    <td>
                      {ot.vehicle_plate} <span className="text-xs text-cyan-100/60">#{ot.vehicle_id}</span>
                    </td>
                    <td>{ot.opened_at.slice(0, 10)}</td>
                    <td className="text-right">{ot.grand_total_fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-cyan-300/30 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-cyan-100/80">
            <button
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="btn-3d text-xs disabled:opacity-40"
            >
              Anterior
            </button>
            <div className="tracking-[0.2em]">Página {page}</div>
            <button
              disabled={isFetching || rows.length === 0}
              onClick={() => setPage((p) => p + 1)}
              className="btn-3d text-xs disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {!isLoading && !isError && rows.length === 0 && (
        <p className="text-sm text-cyan-100/70">No se encontraron órdenes con el filtro aplicado.</p>
      )}
    </section>
  );
}
