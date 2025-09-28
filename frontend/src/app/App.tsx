import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import IndexPage from "./routes/index";
import OTListPage from "./routes/ot/OTListPage";
import OTDetailPage from "./routes/ot/OTDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Nav />
      <main className="mx-auto max-w-6xl p-6">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/ot" element={<OTListPage />} />
          <Route path="/ot/:id" element={<OTDetailPage />} />  {/* 👈 ESTA RUTA */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

