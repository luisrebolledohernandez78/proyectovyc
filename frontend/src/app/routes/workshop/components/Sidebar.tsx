import React from "react";

export default function Sidebar() {
  return (
    <aside className="sticky top-8 self-start">
      <div className="space-y-4">
        <div className="rounded-2xl border border-cyan-300/15 bg-[#071a4c]/90 p-6">
          <h4 className="text-lg font-semibold text-amber-200">Atajos</h4>
          <nav className="mt-4 flex flex-col gap-2">
            <a className="px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">Agenda</a>
            <a className="px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">OTs</a>
            <a className="px-4 py-2 rounded-lg bg-transparent border border-cyan-400/10 text-cyan-100/80">Diagnósticos</a>
          </nav>

          <div className="mt-6">
            <a href="/usuarios/" className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-amber-300 rounded-lg text-amber-200 w-full justify-center">🏠 Volver al Home</a>
            {/* Removed large logout button per UX request; keep a small link if needed */}
          </div>
        </div>
      </div>
    </aside>
  );
}
