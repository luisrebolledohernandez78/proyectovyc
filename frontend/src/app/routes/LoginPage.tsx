import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../entities/auth/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const data = await login({ username, password });
      if (!data.is_superuser) {
        navigate("/ot", { replace: true });
      }
    } catch (err) {
      const message =
        (err as any)?.response?.data?.detail ??
        (err as any)?.message ??
        "No se pudo iniciar sesión.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001133] via-[#000820] to-[#001b47] text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="px-8 py-10 space-y-6">
            <header className="space-y-2 text-center">
              <p className="text-sm tracking-wide uppercase text-blue-200">Proyecto VyC</p>
              <h1 className="text-3xl font-bold text-white">Portal de Acceso</h1>
              <p className="text-sm text-blue-100">
                Ingresa con tu cuenta para gestionar órdenes de trabajo, inventario y cotizaciones.
              </p>
            </header>

            {error && (
              <div className="rounded-xl border border-red-500/60 bg-red-500/20 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-100 uppercase tracking-wide">
                  Usuario
                </label>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="tu.usuario"
                  autoComplete="username"
                  className="w-full rounded-xl border border-blue-500/30 bg-white/10 px-4 py-3 text-base text-white placeholder:text-blue-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-100 uppercase tracking-wide">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-blue-500/30 bg-white/10 px-4 py-3 text-base text-white placeholder:text-blue-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                  required
                />
              </div>

              <button type="submit" className="btn-3d w-full text-lg" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
          </div>

          <footer className="bg-white/10 px-8 py-5 text-center text-sm text-blue-100">
            ¿Sin cuenta? Solicita acceso al administrador.
          </footer>
        </div>
      </div>
    </div>
  );
}
