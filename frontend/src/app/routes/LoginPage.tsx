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
      } else {
        navigate("/inicio", { replace: true });
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
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#001b4e] via-[#001133] to-[#04091f] text-cyan-50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen" />
        <div className="absolute left-[-20%] top-[-10%] h-80 w-80 rounded-full bg-cyan-400/25 blur-[140px]" />
        <div className="absolute bottom-[-25%] right-[-10%] h-96 w-96 rounded-full bg-amber-300/20 blur-[200px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
          <section className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-cyan-100/90">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                Proyecto VyC
              </div>
              <h1 className="text-4xl font-bold text-cyan-100 md:text-5xl">
                Unifica el control de tus operaciones
              </h1>
              <p className="max-w-xl text-base text-cyan-100/90 md:text-lg">
                Gestiona órdenes, inventario y procesos de taller desde un panel con trazabilidad,
                indicadores clave y accesos seguros para tu equipo.
              </p>
            </div>

            <dl className="grid gap-6 sm:grid-cols-2">
              <div
                className="rounded-2xl p-6 backdrop-blur"
                style={{
                  border: "1px solid rgba(103, 232, 249, 0.32)",
                  background:
                    "linear-gradient(140deg, rgba(34,211,238,0.16) 0%, rgba(20,31,68,0.65) 55%, rgba(47,91,164,0.14) 100%)",
                  boxShadow: "0 28px 60px -45px rgba(13,148,136,0.65)",
                }}
              >
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
                  Panel inteligente
                </dt>
                <dd className="mt-3 text-sm text-cyan-50/85">
                  Visualiza indicadores críticos y accede a módulos clave en segundos.
                </dd>
              </div>
              <div
                className="rounded-2xl p-6 backdrop-blur"
                style={{
                  border: "1px solid rgba(103, 232, 249, 0.32)",
                  background:
                    "linear-gradient(140deg, rgba(34,211,238,0.16) 0%, rgba(20,31,68,0.65) 55%, rgba(47,91,164,0.14) 100%)",
                  boxShadow: "0 28px 60px -45px rgba(13,148,136,0.65)",
                }}
              >
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
                  Accesos seguros
                </dt>
                <dd className="mt-3 text-sm text-cyan-50/85">
                  Backoffice y auditoría integrados para mantener la operación bajo control.
                </dd>
              </div>
            </dl>
          </section>

          <section
            className="rounded-3xl backdrop-blur-xl"
            style={{
              border: "1px solid rgba(103, 232, 249, 0.28)",
              background:
                "linear-gradient(155deg, rgba(17,24,39,0.9) 0%, rgba(13,148,136,0.12) 52%, rgba(59,130,246,0.35) 100%)",
              boxShadow: "0 45px 95px -60px rgba(6,182,212,0.65)",
            }}
          >
            <div className="border-b border-white/10 px-10 py-8 text-center">
              <h2 className="text-2xl font-semibold text-cyan-100">Inicia sesión</h2>
              <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
              <p className="mt-3 text-sm text-cyan-100/80">
                Usa tus credenciales corporativas para ingresar al Centro de Control.
              </p>
            </div>
            <div className="px-10 py-9">
              {error && (
                <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-3 text-sm text-red-100 shadow-inner">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100/90">
                    Usuario
                  </label>
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="tu.usuario"
                    autoComplete="username"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-blue-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100/90">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-blue-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                </div>

                <button type="submit" className="btn-3d w-full text-sm" disabled={loading}>
                  {loading ? "Ingresando..." : "Ingresar"}
                </button>
              </form>
            </div>
            <footer className="border-t border-white/10 px-10 py-6 text-center text-sm text-cyan-100/80">
              ¿Sin cuenta? Solicítala al administrador.
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
