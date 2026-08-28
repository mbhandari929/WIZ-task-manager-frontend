export type UserRole = "Member" | "Admin";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type AuthStatus =
  | "checking"
  | "authenticated"
  | "anonymous";
