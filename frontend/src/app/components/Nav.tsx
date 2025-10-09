import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../entities/auth/api";

type InternalLink = {
  label: string;
  to: string;
  end?: boolean;
};

type ExternalLink = {
  label: string;
  href: string;
};

const moduleLinks: InternalLink[] = [
  { label: "Panel general", to: "/inicio", end: true },
  { label: "Órdenes de Trabajo", to: "/ot" },
  { label: "Inventario", to: "/inventario" },
  { label: "Taller", to: "/taller" },
  { label: "Cotizaciones", to: "/cotizaciones" },
];

const userManagementUrl =
  import.meta.env.VITE_BACKOFFICE_URL ?? "http://127.0.0.1:8000/usuarios/";
const djangoAdminUrl =
  import.meta.env.VITE_DJANGO_ADMIN_URL ?? "http://127.0.0.1:8000/admin/";
const apiDocsUrl =
  import.meta.env.VITE_API_DOCS_URL ?? "http://127.0.0.1:8000/api/docs/";

const externalLinks: ExternalLink[] = [
  { label: "Gestión de Usuarios", href: userManagementUrl },
  { label: "Panel Django", href: djangoAdminUrl },
  { label: "Documentación API", href: apiDocsUrl },
];

export default function Nav() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const internalLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "group flex items-center justify-between rounded-2xl border border-transparent px-4 py-2 text-sm font-semibold tracking-wide transition-all",
      isActive
        ? "bg-white/15 text-cyan-50 shadow-[0_20px_45px_-30px_rgba(34,211,238,0.85)] border-cyan-300/40"
        : "text-cyan-100/85 hover:text-cyan-50 hover:bg-white/10 hover:border-cyan-300/25",
    ].join(" ");

  const handleLogout = async () => {
    setError(null);
    try {
      setLoggingOut(true);
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      const message =
        (err as any)?.response?.data?.detail ??
        (err as any)?.message ??
        "No se pudo cerrar la sesión.";
      setError(message);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="relative flex min-h-screen w-72 flex-col overflow-hidden border-r border-cyan-400/20 bg-gradient-to-b from-[#071a4c]/96 via-[#051433]/94 to-[#04091f]/98 text-cyan-50">
      <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
        <div className="absolute -top-28 right-[-35%] h-60 w-60 rounded-full bg-cyan-400/25 blur-3xl" />
        <div className="absolute top-1/3 left-[-28%] h-56 w-56 rounded-full bg-cyan-200/35 blur-[120px]" />
        <div className="absolute bottom-[-45%] right-[-25%] h-72 w-72 rounded-full bg-amber-300/22 blur-[140px]" />
      </div>

      <div className="relative border-b border-cyan-400/15 px-6 py-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-cyan-100/90">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
          Proyecto VyC
        </div>
        <h1 className="mt-4 text-2xl font-bold text-cyan-50">Centro de Control</h1>
        <p className="mt-2 text-sm text-cyan-100/80">
          Gestiona órdenes, inventario, cotizaciones y usuarios desde un único panel.
        </p>
      </div>

      <div className="relative flex-1 overflow-y-auto py-6">
        <section className="px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/60">
            Módulos
          </p>
          <ul className="mt-4 space-y-2">
            {moduleLinks.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={internalLinkClass}>
                  <span>{item.label}</span>
                  <span className="text-[0.55rem] uppercase tracking-[0.4em] text-cyan-100/60 transition-opacity group-hover:opacity-100">
                    Ir
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-4 mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/60">
            Backoffice
          </p>
          <ul className="mt-4 space-y-2">
            {externalLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-2xl border border-transparent bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-100/80 transition-all hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="relative space-y-3 border-t border-cyan-400/15 px-4 py-6">
        {error && <p className="text-xs text-red-300">{error}</p>}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="btn-3d w-full text-sm"
        >
          {loggingOut ? "Saliendo..." : "Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}
