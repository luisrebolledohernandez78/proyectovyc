// frontend/src/app/routes/ot/OTDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { useOT, useOTRepairs, useOTParts } from "../../../entities/ot/queries";
import { useState } from "react";

type TabKey = "datos" | "actividades" | "repuestos";

export default function OTDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<TabKey>("datos");

  const { data: ot, isLoading, isError, error } = useOT(id!);
  const { data: repairs } = useOTRepairs(id!);
  const { data: parts } = useOTParts(id!);

  if (isLoading) return <section className="p-4">Cargando…</section>;

  if (isError || !ot) {
    // Diagnóstico útil: HTTP status y URL que falló
    const err = error as any;
    const status = err?.response?.status;
    const url = err?.config?.url;
    const msg = err?.message ?? "Error desconocido";
    return (
      <section className="p-4 text-red-400 space-y-2">
        <p>No pudimos cargar la OT.</p>
        <pre className="text-xs opacity-80">
{status ? `HTTP ${status} - ${url}\n` : ""}{msg}
        </pre>
        <p className="text-xs opacity-70">
          Tip: abre <code>http://localhost:8000/api/workorders/{id}/</code> en el navegador para ver el detalle directo.
        </p>
        <Link to="/ot" className="inline-block mt-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">
          ← Volver
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">OT #{ot.id} — {ot.number}</h2>
        <Link to="/ot" className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">← Volver</Link>
      </div>

      <div className="mt-2 flex gap-2">
        <Tab active={tab==="datos"} onClick={()=>setTab("datos")}>Datos</Tab>
        <Tab active={tab==="actividades"} onClick={()=>setTab("actividades")}>Actividades</Tab>
        <Tab active={tab==="repuestos"} onClick={()=>setTab("repuestos")}>Repuestos</Tab>
      </div>

      {tab === "datos" && (
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Estado" value={ot.status} />
          <Field label="Cliente (ID)" value={ot.client} />
          <Field label="Vehículo (ID)" value={ot.vehicle} />
          <Field label="Abierta" value={ot.opened_at?.slice(0,10) ?? "-"} />
          <Field label="Cerrada" value={ot.closed_at?.slice(0,10) ?? "-"} />
          <Field label="Total Mano de Obra" value={ot.total_labor_fmt ?? "-"} />
          <Field label="Total Repuestos" value={ot.total_parts_fmt ?? "-"} />
          <Field label="Total General" value={ot.grand_total_fmt ?? "-"} />
          <div className="md:col-span-2">
            <Field label="Descripción" value={ot.description ?? "-"} />
          </div>
        </div>
      )}

      {tab === "actividades" && (
        <Table
          headers={["ID", "Descripción", "Horas/Cant.", "Total"]}
          rows={(repairs ?? []).map(a => [a.id, a.description, a.qty ?? "-", a.total_fmt])}
        />
      )}

      {tab === "repuestos" && (
        <Table
          headers={["ID", "Repuesto", "Cantidad", "Total"]}
          rows={(parts ?? []).map(p => [p.id, p.part_name, p.quantity ?? "-", p.total_fmt])}
        />
      )}      
    </section>
  );
}

function Tab({ active, onClick, children }:{
  active:boolean; onClick:()=>void; children:React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border ${active ? "bg-neutral-800 border-neutral-700" : "bg-neutral-900 border-neutral-800 hover:bg-neutral-800/60"}`}
    >
      {children}
    </button>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-800 p-4">
      <div className="text-xs uppercase opacity-60">{label}</div>
      <div className="text-base mt-1">{value}</div>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="rounded-xl border border-neutral-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-900">
          <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-3">
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="px-4 py-6 opacity-70">Sin datos</td></tr>
          ) : rows.map((r, i) => (
            <tr key={i} className="border-t border-neutral-800 [&>td]:px-4 [&>td]:py-3">
              {r.map((c, j) => <td key={j}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
