import { useQuery } from "@tanstack/react-query";
import { api } from "../../shared/api/client";
import { PaginatedOT } from "./types"; // (ok si aún no lo usas)

export type OTListParams = { page?: number; search?: string };

export function useOTs(params: OTListParams) {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.search) search.set("search", params.search);

  const path = `/workorders/`; // tu endpoint real
  const url = search.toString() ? `${path}?${search.toString()}` : path;

  return useQuery({
    queryKey: ["ots", params],
    queryFn: async () => {
      const { data } = await api.get(url);
      return data as any;
    },
  });
}

// Detalle de una OT — intenta /id/, /id; si no hay endpoint de detalle,
// busca en la lista el item que coincida EXACTO por id o number.
export function useOT(idOrNumber: number | string) {
  return useQuery({
    queryKey: ["ot", idOrNumber],
    queryFn: async () => {
      const idStr = String(idOrNumber);

      // 1) Endpoints de detalle (si existen)
      for (const p of [`/workorders/${idStr}/`, `/workorders/${idStr}`]) {
        try {
          const { data } = await api.get(p);
          // Verificación defensiva por si algún endpoint devuelve otro item
          if (data && (String(data.id) === idStr || data.number === idStr)) {
            return data as any;
          }
        } catch {
          /* sigue intentando */
        }
      }

      // 2) Búsqueda por number exacto (si parece "OT-xxxxx")
      if (idStr.startsWith("OT-")) {
        try {
          const { data } = await api.get(`/workorders/?number=${encodeURIComponent(idStr)}`);
          const list = Array.isArray(data) ? data : (data?.results ?? []);
          const found = list.find((x: any) => x?.number === idStr);
          if (found) return found;
        } catch {
          /* sigue intentando */
        }
      }

      // 3) Fallback: traer lista y FILTRAR por id/number exactos
      // (Si tu API no soporta page_size, igual funcionará sin él)
      try {
        const { data } = await api.get(`/workorders/?page_size=1000`);
        const list = Array.isArray(data) ? data : (data?.results ?? []);
        const found =
          list.find((x: any) => String(x?.id) === idStr) ??
          list.find((x: any) => x?.number === idStr);
        if (found) return found;
      } catch {
        /* ignoramos, lanzamos error genérico abajo */
      }

      throw new Error(`No se encontró la OT ${idStr}`);
    },
    enabled: !!idOrNumber,
    retry: false,
  });
}

/* ----------------- Helpers de normalización ----------------- */
function normalizeArray(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

function normalizeRepairs(items: any[]) {
  return items.map((a) => ({
    id: a.id,
    description: a.description ?? a.detail ?? a.name ?? "-",
    qty: a.hours ?? a.quantity ?? a.qty ?? a.cantidad ?? null,
    total_fmt:
      a.total_fmt ??
      a.amount_fmt ??
      a.subtotal_fmt ??
      (typeof a.total === "number" ? `$${a.total}` : a.total) ??
      "-",
  }));
}

function normalizeParts(items: any[]) {
  return items.map((p) => ({
    id: p.id,
    part_name: p.part_name ?? p.part ?? p.name ?? "-",
    quantity: p.quantity ?? p.qty ?? p.cantidad ?? null,
    total_fmt:
      p.total_fmt ??
      p.amount_fmt ??
      p.subtotal_fmt ??
      (typeof p.total === "number" ? `$${p.total}` : p.total) ??
      "-",
  }));
}

/* ----------------- Listas dependientes de OT ----------------- */

// Actividades por OT: prueba varios nombres de query (?workorder, ?workorder_id, ?ot)
export function useOTRepairs(otId: number | string) {
  return useQuery({
    queryKey: ["ot-repairs", otId],
    queryFn: async () => {
      const candidates = [
        `/repairs/?workorder=${otId}`,
        `/repairs/?workorder_id=${otId}`,
        `/repairs/?ot=${otId}`,
      ];
      let lastErr: any = null;
      for (const url of candidates) {
        try {
          const { data } = await api.get(url);
          return normalizeRepairs(normalizeArray(data));
        } catch (e) {
          lastErr = e;
        }
      }
      throw lastErr ?? new Error("No se pudieron cargar las actividades");
    },
    enabled: !!otId,
    retry: false,
  });
}

// Repuestos por OT: prueba varios nombres de query (?workorder, ?workorder_id, ?ot)
export function useOTParts(otId: number | string) {
  return useQuery({
    queryKey: ["ot-parts", otId],
    queryFn: async () => {
      const candidates = [
        `/parts/?workorder=${otId}`,
        `/parts/?workorder_id=${otId}`,
        `/parts/?ot=${otId}`,
      ];
      let lastErr: any = null;
      for (const url of candidates) {
        try {
          const { data } = await api.get(url);
          return normalizeParts(normalizeArray(data));
        } catch (e) {
          lastErr = e;
        }
      }
      throw lastErr ?? new Error("No se pudieron cargar los repuestos");
    },
    enabled: !!otId,
    retry: false,
  });
}
