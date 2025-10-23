import React from "react";

type Props = {
  activeStep: number;
  onSelectStep: (n: number) => void;
};

const stepLabels = [
  "PASO 1\nAgendamiento",
  "PASO 2\nRecepción & Diagnóstico",
  "PASO 3\nPresupuesto",
  "PASO 4\nReparación",
  "PASO 5\nPago",
  "PASO 6\nEntrega",
];

export default function Sidebar({ activeStep, onSelectStep }: Props) {
  return (
    <aside className="sticky top-8 self-start h-[calc(100vh-64px)]">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-[#071a4c]/80 border border-cyan-300/12 p-6">
        <div className="mb-6">
          <div className="sidebar-badge inline-flex items-center gap-2">VyC Ingeniería</div>
          <h2 className="vyc-title mt-4">Mantenimiento y Reparación de Vehículos</h2>
          <p className="text-xs text-cyan-100/75 mt-2">Coordina diagnósticos, reparaciones y mantenimientos preventivos de la flota.</p>
        </div>

        <div className="mb-4">
          <div className="text-xs text-cyan-200 font-semibold mb-2">OPERACIONES</div>
          <div className="flex flex-col gap-3">
            <a href="#clientes" className="operation-btn">Clientes</a>
            <a href="#proximamente" className="operation-btn opacity-60">Próximamente</a>
          </div>
        </div>

        <nav className="mt-auto flex flex-col gap-3">
          <a href="#agenda" className="text-sm text-cyan-100 hover:text-amber-200">Agenda</a>
          <a href="#ots" className="text-sm text-cyan-100 hover:text-amber-200">OTs</a>
          <a href="#diagnosticos" className="text-sm text-cyan-100 hover:text-amber-200">Diagnósticos</a>
          <a href="#config" className="text-sm text-cyan-100 hover:text-amber-200">Configuración</a>

          <div className="mt-6">
            <a href="/usuarios/" className="block btn-3d w-full text-center">🏠 Volver al Home</a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
