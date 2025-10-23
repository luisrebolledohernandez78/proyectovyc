import React, { useState } from "react";
import Hero from "./components/Hero";
import StepsRow from "./components/StepsRow";
import InfoCard from "./components/InfoCard";
import AppointmentsCalendar from "./AppointmentsCalendar";
import Sidebar from "./components/Sidebar";

export default function WorkshopPage() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="min-h-screen relative">
      {/* soft decorative blobs similar to backend intranet */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute -top-32 right-[25%] h-80 w-80 rounded-full bg-cyan-400/25 blur-[180px]" />
        <div className="absolute bottom-[-25%] left-[18%] h-96 w-96 rounded-full bg-amber-300/18 blur-[220px]" />
      </div>

      <section className="vyc-container grid grid-cols-[320px_1fr] gap-6">
        <Sidebar />

        <main className="py-8">
          <Hero />
          {/* steps row with interactive selection */}
          {/* Track the currently selected step (1..6) */}
          <StepsRow activeStep={activeStep} onSelect={setActiveStep} />

          {/* Step content area: when Paso 1 is active show the appointments calendar */}
          {activeStep === 1 && (
            <div className="mt-6 vyc-card">
              <h3 className="text-lg font-semibold text-cyan-100 mb-3">Calendario de Agendamiento</h3>
              <AppointmentsCalendar />
            </div>
          )}

          <InfoCard />

        </main>
      </section>
    </div>
  );
}
