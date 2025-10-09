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
      "block rounded-xl px-4 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-white/15 text-white shadow-inner"
        : "text-neutral-300 hover:bg-white/10 hover:text-white",
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
    <aside className="w-72 min-h-screen bg-neutral-900/90 border-r border-neutral-800/70 text-neutral-100 flex flex-col backdrop-blur">
      <div className="px-6 py-8 border-b border-neutral-800/60">
        <p className="text-xs uppercase tracking-[0.4em] text-blue-300">Proyecto VyC</p>
        <h1 className="mt-3 text-2xl font-bold text-white">Centro de Control</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Gestiona órdenes, inventario, cotizaciones y usuarios desde un único panel.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <section className="px-4">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Módulos</p>
          <ul className="mt-4 space-y-1">
            {moduleLinks.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={internalLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-4 mt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Backoffice</p>
          <ul className="mt-4 space-y-1">
            {externalLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-xl px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
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

      <div className="px-4 py-6 border-t border-neutral-800/60 space-y-3">
        {error && <p className="text-xs text-red-400">{error}</p>}
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
