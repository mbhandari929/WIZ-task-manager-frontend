import type { UserRole } from "./auth";

export type UserSummary = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdTaskCount: number;
  assignedTaskCount: number;
  createdAt: string;
};

export type AssigneeOption = {
  id: number;
  name: string;
};

export type AdminUserSummary = {
  total: number;
  active: number;
  admins: number;
  members: number;
};

export type AdminUsersData = {
  users: UserSummary[];
  summary: AdminUserSummary;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type ResetPasswordInput = {
  password: string;
  confirmPassword: string;
};

export type AuditLog = {
  id: number;
  userName: string | null;
  action: string;
  method: string;
  path: string;
  statusCode: number;
  ipAddress: string | null;
  createdAt: string;
};
