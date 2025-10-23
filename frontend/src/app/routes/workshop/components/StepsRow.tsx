import React from "react";

const labels = [
  "PASO 1\nAgendamiento",
  "PASO 2\nRecepción & Diagnóstico",
  "PASO 3\nPresupuesto",
  "PASO 4\nReparación",
  "PASO 5\nPago",
  "PASO 6\nEntrega",
];

export default function StepsRow() {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {labels.map((label) => (
        <button
          key={label}
          className="px-6 py-3 text-xs uppercase tracking-wider rounded-lg text-cyan-50 bg-gradient-to-br from-[#0e6aa8] via-[#0b5a8a] to-[#08436a] shadow-inner"
          style={{ whiteSpace: "pre-line" }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
