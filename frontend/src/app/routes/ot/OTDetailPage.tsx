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
    return <section className="p-6 text-sm text-cyan-100/80">Cargando...</section>;
  }

  if (isError || !ot) {
    const err = error as any;
    const status = err?.response?.status;
    const url = err?.config?.url;
    const msg = err?.message ?? "Error desconocido";
    return (
      <section className="space-y-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-100 backdrop-blur-md">
        <p>No pudimos cargar la orden solicitada.</p>
        <pre className="max-h-48 overflow-auto text-xs opacity-80">
{status ? `HTTP ${status} - ${url}\n` : ""}{msg}
        </pre>
        <Link to="/ot" className="btn-3d inline-flex text-xs">
          Volver
        </Link>
      </section>
    );
  }

  const repairs = ot.repairs;
  const parts = ot.parts;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-cyan-100">
          {ot.number}{" "}
          <span className="text-sm font-normal text-cyan-100/70">({ot.status_display})</span>
        </h2>
        <Link to="/ot" className="btn-3d text-xs">
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
        <GlassTable
          headers={["Descripción", "Técnico", "Horas", "Tarifa", "Total"]}
          rows={repairs.map((item) => [
            item.description,
            item.technician_name ?? "Sin asignar",
            item.hours.toFixed(2),
            `$${item.labor_rate.toFixed(0)}`,
            item.labor_cost_fmt,
          ])}
        />
      )}

      {tab === "repuestos" && (
        <GlassTable
          headers={["Repuesto", "SKU", "Cantidad", "Precio", "Total"]}
          rows={parts.map((item) => [
            item.item_name,
            item.sku,
            item.quantity,
            item.unit_price_fmt,
            item.total_fmt,
          ])}
        />
      )}
    </section>
  );
}

function DatosTab({ ot }: { ot: TOTDetail }) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Estado", value: ot.status_display },
    { label: "Cliente", value: `${ot.client.name} (${ot.client.rut})` },
    { label: "Contacto", value: ot.client.phone ?? "Sin teléfono" },
    { label: "Vehículo", value: `${ot.vehicle.plate} - ${ot.vehicle.model ?? "Sin modelo"}` },
    { label: "Técnico responsable", value: ot.responsible_technician?.full_name ?? "Sin asignar" },
    { label: "Apertura", value: ot.opened_at.slice(0, 10) },
    { label: "Cierre", value: ot.closed_at ? ot.closed_at.slice(0, 10) : "Abierta" },
    { label: "Total Mano de Obra", value: ot.total_labor_fmt },
    { label: "Total Repuestos", value: ot.total_parts_fmt },
    { label: "Total General", value: ot.grand_total_fmt },
    { label: "Descripción", value: ot.description ?? "Sin descripción" },
    {
      label: "Cotización",
      value: ot.quote ? `${ot.quote.status_display} · ${ot.quote.grand_total_fmt}` : "Sin cotización asociada",
    },
  ];

  return (
    <div
      className="overflow-hidden rounded-3xl border border-cyan-300/25 shadow-[0_32px_70px_-50px_rgba(34,211,238,0.6)]"
      style={{
        background:
          "linear-gradient(150deg, rgba(34,211,238,0.16) 0%, rgba(5,20,51,0.78) 60%, rgba(250,204,21,0.14) 100%)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-[520px] w-full text-sm text-cyan-50/85">
          <thead className="bg-cyan-500/15 text-cyan-50">
            <tr className="[&>th]:px-5 [&>th]:py-3 [&>th]:text-xs [&>th]:uppercase [&>th]:tracking-[0.3em]">
              <th>Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr
                key={item.label}
                className={`transition-colors [&>td]:px-5 [&>td]:py-3 ${
                  index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                }`}
              >
                <td className="font-semibold text-cyan-100">{item.label}</td>
                <td className="text-cyan-50/85">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`btn-3d text-xs ${active ? "" : "opacity-85"}`}
    >
      {children}
    </button>
  );
}

function GlassTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-cyan-300/25 shadow-[0_32px_70px_-50px_rgba(34,211,238,0.6)]"
      style={{
        background:
          "linear-gradient(150deg, rgba(34,211,238,0.16) 0%, rgba(5,20,51,0.78) 60%, rgba(250,204,21,0.14) 100%)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-[520px] w-full text-sm text-cyan-50/85">
          <thead className="bg-cyan-500/15 text-cyan-50">
            <tr className="[&>th]:px-5 [&>th]:py-3 [&>th]:text-xs [&>th]:uppercase [&>th]:tracking-[0.3em]">
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-5 py-6 text-center text-sm text-cyan-100/70"
                >
                  Sin datos disponibles.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition-colors [&>td]:px-5 [&>td]:py-3 ${
                    rowIndex % 2 === 0 ? "bg-white/5" : "bg-white/10"
                  } hover:bg-amber-300/20`}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
