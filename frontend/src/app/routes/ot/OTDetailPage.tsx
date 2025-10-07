import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useOT } from "../../../entities/ot/queries";
import { TOTDetail } from "../../../entities/ot/types";

type TabKey = "datos" | "actividades" | "repuestos";

export default function OTDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<TabKey>("datos");

  const { data: ot, isLoading, isError, error } = useOT(id ?? "");

  if (isLoading) {
    return <section className="p-4">Cargando...</section>;
  }

  if (isError || !ot) {
    const err = error as any;
    const status = err?.response?.status;
    const url = err?.config?.url;
    const msg = err?.message ?? "Error desconocido";
    return (
      <section className="p-4 text-red-400 space-y-2">
        <p>No pudimos cargar la orden solicitada.</p>
        <pre className="text-xs opacity-80">
{status ? `HTTP ${status} - ${url}\n` : ""}{msg}
        </pre>
        <Link to="/ot" className="inline-block mt-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">
          Volver
        </Link>
      </section>
    );
  }

  const repairs = ot.repairs;
  const parts = ot.parts;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          {ot.number} <span className="text-sm opacity-70">({ot.status_display})</span>
        </h2>
        <Link to="/ot" className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">
          Volver
        </Link>
      </div>

      <div className="mt-2 flex gap-2">
        <Tab active={tab === "datos"} onClick={() => setTab("datos")}>
          Datos
        </Tab>
        <Tab active={tab === "actividades"} onClick={() => setTab("actividades")}>
          Actividades
        </Tab>
        <Tab active={tab === "repuestos"} onClick={() => setTab("repuestos")}>
          Repuestos
        </Tab>
      </div>

      {tab === "datos" && <DatosTab ot={ot} />}

      {tab === "actividades" && (
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-3xl mx-auto rounded-2xl border border-blue-950 overflow-x-auto shadow-2xl bg-white/95">
            <Table
              headers={["Descripcion", "Tecnico", "Horas", "Tarifa", "Total"]}
              rows={repairs.map((item) => [
                item.description,
                item.technician_name ?? "Sin asignar",
                item.hours.toFixed(2),
                `$${item.labor_rate.toFixed(0)}`,
                item.labor_cost_fmt,
              ])}
            />
          </div>
        </div>
      )}

      {tab === "repuestos" && (
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-3xl mx-auto rounded-2xl border border-blue-950 overflow-x-auto shadow-2xl bg-white/95">
            <Table
              headers={["Repuesto", "SKU", "Cantidad", "Precio", "Total"]}
              rows={parts.map((item) => [
                item.item_name,
                item.sku,
                item.quantity,
                item.unit_price_fmt,
                item.total_fmt,
              ])}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function DatosTab({ ot }: { ot: TOTDetail }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-2xl mx-auto rounded-2xl border border-blue-950 overflow-x-auto shadow-2xl bg-white/95">
        <table className="min-w-[520px] mx-auto text-sm border border-blue-900">
          <thead className="bg-[#002366] text-white">
            <tr>
              <th className="px-4 py-3 border-b border-blue-900">Campo</th>
              <th className="px-4 py-3 border-b border-blue-900">Valor</th>
            </tr>
          </thead>
          <tbody>
            <Row label="Estado" value={ot.status_display} index={0} />
            <Row label="Cliente" value={`${ot.client.name} (${ot.client.rut})`} index={1} />
            <Row label="Contacto" value={ot.client.phone ?? "Sin telefono"} index={2} />
            <Row label="Vehiculo" value={`${ot.vehicle.plate} - ${ot.vehicle.model ?? "Sin modelo"}`} index={3} />
            <Row label="Tecnico responsable" value={ot.responsible_technician?.full_name ?? "Sin asignar"} index={4} />
            <Row label="Apertura" value={ot.opened_at.slice(0, 10)} index={5} />
            <Row label="Cierre" value={ot.closed_at ? ot.closed_at.slice(0, 10) : "Abierta"} index={6} />
            <Row label="Total Mano de Obra" value={ot.total_labor_fmt} index={7} />
            <Row label="Total Repuestos" value={ot.total_parts_fmt} index={8} />
            <Row label="Total General" value={ot.grand_total_fmt} index={9} />
            <Row label="Descripcion" value={ot.description ?? "Sin descripcion"} index={10} />
            <Row
              label="Cotizacion"
              value={
                ot.quote
                  ? `${ot.quote.status_display} • ${ot.quote.grand_total_fmt}`
                  : "Sin cotizacion asociada"
              }
              index={11}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ label, value, index }: { label: string; value: string; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <tr className={`border-b border-blue-900 ${isEven ? "bg-blue-50/80" : "bg-white/80"}`}>
      <td className="px-4 py-3 font-semibold text-blue-900">{label}</td>
      <td className="px-4 py-3">{value}</td>
    </tr>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border ${
        active ? "bg-neutral-800 border-neutral-700" : "bg-neutral-900 border-neutral-800 hover:bg-neutral-800/60"
      }`}
    >
      {children}
    </button>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="rounded-xl border border-neutral-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-900">
          <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-3">
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-4 py-6 opacity-70">
                Sin datos
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-neutral-800 [&>td]:px-4 [&>td]:py-3">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
