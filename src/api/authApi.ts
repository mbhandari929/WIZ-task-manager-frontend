import { apiRequest } from "./apiClient";
import type { ApiMessage } from "../types/api";
import type {
  AuthUser,
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
} from "../types/auth";

export function getCurrentUser(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me");
}

export function login(input: LoginInput): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/login", {
    method: "POST",
    body: input,
  });
}

export function register(
  input: RegisterInput,
): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/register", {
    method: "POST",
    body: input,
  });
}

export function logout(): Promise<ApiMessage> {
  return apiRequest<ApiMessage>("/auth/logout", {
    method: "POST",
  });
}

export function changePassword(
  input: ChangePasswordInput,
): Promise<ApiMessage> {
  return apiRequest<ApiMessage>("/auth/change-password", {
    method: "POST",
    body: input,
  });
}
