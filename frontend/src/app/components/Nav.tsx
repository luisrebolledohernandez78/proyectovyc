import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg ${isActive ? "bg-neutral-800" : "hover:bg-neutral-800/60"}`;

  return (
    <header className="border-b border-neutral-800">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        <Link to="/" className="font-semibold">
          VyC - Sistema de control de mantenimiento y reparacion
        </Link>
        <nav className="flex gap-2">
          <NavLink to="/ot" className={linkClass}>
            Ordenes de Trabajo
          </NavLink>
          {/* agrega mas: inventario, clientes, etc. */}
        </nav>
      </div>
    </header>
  );
}
