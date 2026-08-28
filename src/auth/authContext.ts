import { createContext } from "react";

import type {
  AuthStatus,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "../types/auth";

export type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
