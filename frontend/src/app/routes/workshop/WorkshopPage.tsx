import OperationsSidebar from "./OperationsSidebar";

export default function WorkshopPage() {
  return (
    <section className="grid grid-cols-[280px_1fr] gap-6">
      <OperationsSidebar current={1} />

      <main>
        {/* Landing scaffold - clean start (empty content). */}
        <div className="min-h-[60vh] flex items-center justify-center">
          <h2 className="text-2xl text-cyan-100/80">Taller — landing vacío (empezar desde 0)</h2>
        </div>
      </main>
    </section>
  );
}
