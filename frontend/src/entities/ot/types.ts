import { z } from "zod";

export const OTListItem = z.object({
  id: z.number(),
  number: z.string(),
  status: z.string(),
  status_display: z.string(),
  opened_at: z.string(),
  closed_at: z.string().nullable(),
  client_id: z.number(),
  client_name: z.string(),
  vehicle_id: z.number(),
  vehicle_plate: z.string(),
  total_labor_fmt: z.string(),
  total_parts_fmt: z.string(),
  grand_total_fmt: z.string(),
});

export type TOTListItem = z.infer<typeof OTListItem>;

export const PaginatedOT = z.object({
  count: z.number().optional(),
  next: z.string().nullable().optional(),
  previous: z.string().nullable().optional(),
  results: z.array(OTListItem).optional(),
});
export type TPaginatedOT = z.infer<typeof PaginatedOT>;

const OTClient = z.object({
  id: z.number(),
  name: z.string(),
  rut: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
});

const OTVehicle = z.object({
  id: z.number(),
  plate: z.string(),
  brand: z.string().nullable(),
  model: z.string().nullable(),
  year: z.number().nullable(),
  vin: z.string().nullable(),
});

const OTTecnician = z
  .object({
    id: z.number(),
    full_name: z.string(),
    specialty: z.string().nullable(),
  })
  .nullable();

const numberCoerce = z.coerce.number();

const OTRepair = z.object({
  id: z.number(),
  description: z.string(),
  technician: z.number().nullable(),
  technician_name: z.string().nullable(),
  hours: numberCoerce,
  labor_rate: numberCoerce,
  labor_cost: numberCoerce,
  labor_cost_fmt: z.string(),
  created_at: z.string(),
});

const OTPart = z.object({
  id: z.number(),
  item: z.number(),
  item_name: z.string(),
  sku: z.string(),
  quantity: z.number(),
  unit_price: numberCoerce,
  unit_price_fmt: z.string(),
  total: numberCoerce,
  total_fmt: z.string(),
});

const OTQuote = z
  .object({
    id: z.number(),
    status: z.string(),
    status_display: z.string(),
    created_at: z.string(),
    notes: z.string().nullable(),
    total_labor_fmt: z.string(),
    total_parts_fmt: z.string(),
    grand_total_fmt: z.string(),
  })
  .nullable();

export const OTDetail = z.object({
  id: z.number(),
  number: z.string(),
  status: z.string(),
  status_display: z.string(),
  description: z.string().nullable(),
  opened_at: z.string(),
  closed_at: z.string().nullable(),
  client: OTClient,
  vehicle: OTVehicle,
  responsible_technician: OTTecnician,
  repairs: z.array(OTRepair),
  parts: z.array(OTPart),
  quote: OTQuote,
  total_labor: z.number(),
  total_parts: z.number(),
  grand_total: z.number(),
  total_labor_fmt: z.string(),
  total_parts_fmt: z.string(),
  grand_total_fmt: z.string(),
});

export type TOTDetail = z.infer<typeof OTDetail>;
