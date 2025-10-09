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
  const showNav = !["/", "/login"].includes(location.pathname);

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
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <Nav />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-6">{routes}</div>
      </main>
    </div>
  );
}

export default App;
