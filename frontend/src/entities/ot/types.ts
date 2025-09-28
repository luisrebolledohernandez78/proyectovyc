import { z } from "zod";

export const OT = z.object({
  id: z.number(),
  number: z.string(),                 // ← "OT-000007"
  client: z.number(),                 // por ahora ID (podemos resolver nombre luego)
  vehicle: z.number(),                // ID
  responsible_technician: z.number(), // ID
  status: z.string(),                 // "OPEN", "CLOSED", etc.
  opened_at: z.string(),              // ISO string
  closed_at: z.string().nullable(),
  description: z.string().optional(),
  total_labor_fmt: z.string().optional(),
  total_parts_fmt: z.string().optional(),
  grand_total_fmt: z.string().optional(),
});

export type TOT = z.infer<typeof OT>;

// Si tu endpoint devuelve página DRF usa esto; si devuelve array, lo manejamos igual en la página.
export const PaginatedOT = z.object({
  count: z.number().optional(),
  next: z.string().nullable().optional(),
  previous: z.string().nullable().optional(),
  results: z.array(OT).optional(),
});
export type TPaginatedOT = z.infer<typeof PaginatedOT>;
