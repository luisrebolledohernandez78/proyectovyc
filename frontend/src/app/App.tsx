import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Nav from "./components/Nav";
import IndexPage from "./routes/index";
import OTDetailPage from "./routes/ot/OTDetailPage";
import OTListPage from "./routes/ot/OTListPage";
import LoginPage from "./routes/LoginPage";
import InventoryPage from "./routes/inventory/InventoryPage";
import WorkshopPage from "./routes/workshop/WorkshopPage";
import BillingPage from "./routes/billing/BillingPage";

function App() {
  const location = useLocation();
  // Hide the global Nav for the login and the workshop landing so the /taller page
  // can render an entirely blank landing while we rebuild it from scratch.
  const showNav = !["/", "/login", "/taller"].includes(location.pathname);

  const routes = (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inicio" element={<IndexPage />} />
      <Route path="/ot" element={<OTListPage />} />
      <Route path="/ot/:id" element={<OTDetailPage />} />
      <Route path="/inventario" element={<InventoryPage />} />
      <Route path="/taller" element={<WorkshopPage />} />
      <Route path="/cotizaciones" element={<BillingPage />} />
      <Route path="*" element={<Navigate to="/ot" replace />} />
    </Routes>
  );

  if (!showNav) {
    return routes;
  }

  return (
    <div className="relative flex min-h-screen text-cyan-50">
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute top-[-20%] left-[30%] h-80 w-80 rounded-full bg-cyan-400/20 blur-[140px]" />
        <div className="absolute bottom-[-30%] right-[20%] h-96 w-96 rounded-full bg-amber-300/18 blur-[180px]" />
      </div>
      <Nav />
      <main className="relative flex-1 overflow-y-auto backdrop-blur-[2px]">
        <div className="mx-auto max-w-6xl p-6">
          <div className="rounded-3xl border border-cyan-300/20 bg-white/10 p-6 shadow-[0_32px_80px_-50px_rgba(34,211,238,0.6)] backdrop-blur-xl">
            {routes}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
