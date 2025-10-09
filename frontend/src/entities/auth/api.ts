import { api } from "../../shared/api/client";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  is_superuser: boolean;
  is_staff: boolean;
};

const BACKOFFICE_URL =
  import.meta.env.VITE_BACKOFFICE_URL ?? "http://127.0.0.1:8000/usuarios/";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<LoginResponse>("/auth/login/", payload, {
    headers: { "Content-Type": "application/json" },
  });

  if (data.is_superuser) {
    window.location.href = BACKOFFICE_URL;
    return data;
  }

  return data;
}

export async function logout() {
  await api.post(
    "/auth/logout/",
    {},
    { headers: { "Content-Type": "application/json" } },
  );
}
