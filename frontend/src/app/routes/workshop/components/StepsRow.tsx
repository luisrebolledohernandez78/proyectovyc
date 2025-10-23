import React from "react";

type Props = {
  activeStep: number;
  onSelect: (n: number) => void;
};

const labels = [
  "PASO 1\nAgendamiento",
  "PASO 2\nRecepción & Diagnóstico",
  "PASO 3\nPresupuesto",
  "PASO 4\nReparación",
  "PASO 5\nPago",
  "PASO 6\nEntrega",
];

export default function StepsRow({ activeStep, onSelect }: Props) {
  return (
    <div className="mb-4 flex flex-wrap justify-center gap-3">
      {labels.map((label, idx) => {
        const step = idx + 1;
        const isActive = activeStep === step;
        return (
          <button
            key={label}
            onClick={() => onSelect(step)}
            className={
              "px-6 py-3 text-xs uppercase tracking-wider rounded-lg text-cyan-50 border border-cyan-400/10 " +
              (isActive
                ? "bg-gradient-to-br from-[#0fb4e0] via-[#0b93c2] to-[#0a6a9d] shadow-[0_10px_30px_-10px_rgba(34,211,238,0.4)] scale-100"
                : "bg-gradient-to-br from-[#0e6aa8] via-[#0b5a8a] to-[#08436a] hover:scale-[1.02]")
            }
            style={{ whiteSpace: "pre-line" }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
