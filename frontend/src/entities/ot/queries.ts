import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "../../shared/api/client";
import {
  OTDetail,
  OTListItem,
  PaginatedOT,
  TOTDetail,
  TOTListItem,
  TPaginatedOT,
} from "./types";

export type OTListParams = { page?: number; search?: string; number?: string };

const ListResponseSchema = z.union([PaginatedOT, z.array(OTListItem)]);

export function useOTs(params: OTListParams) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.search) searchParams.set("search", params.search);
  if (params.number) searchParams.set("number", params.number);

  const path = "/workorders/";
  const url = searchParams.toString() ? `${path}?${searchParams.toString()}` : path;

  return useQuery({
    queryKey: ["ots", params],
    queryFn: async () => {
      const { data } = await api.get(url);
      const parsed = ListResponseSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error("Respuesta de OTs con formato inesperado");
      }
      return parsed.data;
    },
  });
}

export function useOT(identifier: number | string) {
  return useQuery({
    queryKey: ["ot", identifier],
    queryFn: async () => {
      const { data } = await api.get(`/workorders/${identifier}/`);
      const parsed = OTDetail.safeParse(data);
      if (!parsed.success) {
        throw new Error("Respuesta de detalle OT con formato inesperado");
      }
      return parsed.data;
    },
    enabled: !!identifier,
    retry: false,
  });
}

export function unwrapList(data: TPaginatedOT | TOTListItem[]): TOTListItem[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
}
