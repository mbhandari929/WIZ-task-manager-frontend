import { apiRequest } from "./apiClient";
import type { ApiMessage } from "../types/api";
import type { UserRole } from "../types/auth";
import type {
  AdminUsersData,
  AuditLog,
  CreateUserInput,
  ResetPasswordInput,
  UserSummary,
} from "../types/user";

type UserResponse = {
  user: UserSummary;
};

type AuditLogResponse = {
  auditLogs: AuditLog[];
};

export function getAdminUsers(
  signal?: AbortSignal,
): Promise<AdminUsersData> {
  return apiRequest<AdminUsersData>("/api/admin/users", { signal });
}

export async function createAdminUser(
  input: CreateUserInput,
): Promise<UserSummary> {
  const response = await apiRequest<UserResponse>(
    "/api/admin/users",
    {
      method: "POST",
      body: input,
    },
  );

  return response.user;
}

export async function updateAdminUserRole(
  userId: number,
  role: UserRole,
): Promise<UserSummary> {
  const response = await apiRequest<UserResponse>(
    `/api/admin/users/${userId}/role`,
    {
      method: "PATCH",
      body: { role },
    },
  );

  return response.user;
}

export async function updateAdminUserStatus(
  userId: number,
  isActive: boolean,
): Promise<UserSummary> {
  const response = await apiRequest<UserResponse>(
    `/api/admin/users/${userId}/status`,
    {
      method: "PATCH",
      body: { isActive },
    },
  );

  return response.user;
}

export function resetAdminUserPassword(
  userId: number,
  input: ResetPasswordInput,
): Promise<ApiMessage> {
  return apiRequest<ApiMessage>(
    `/api/admin/users/${userId}/reset-password`,
    {
      method: "POST",
      body: input,
    },
  );
}

export async function getAuditLogs(
  signal?: AbortSignal,
): Promise<AuditLog[]> {
  const response = await apiRequest<AuditLogResponse>(
    "/api/admin/audit-logs",
    { signal },
  );

  return response.auditLogs;
}
