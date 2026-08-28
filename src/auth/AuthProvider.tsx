import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AUTH_UNAUTHORIZED_EVENT } from "../api/apiClient";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from "../api/authApi";
import type {
  AuthStatus,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "../types/auth";
import {
  AuthContext,
  type AuthContextValue,
} from "./authContext";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    let active = true;

    const handleUnauthorized = () => {
      setUser(null);
      setStatus("anonymous");
    };

    window.addEventListener(
      AUTH_UNAUTHORIZED_EVENT,
      handleUnauthorized,
    );

    const restoreSession = async () => {
      try {
        const response = await getCurrentUser();

        if (active) {
          setUser(response);
          setStatus("authenticated");
        }
      } catch {
        if (active) {
          setUser(null);
          setStatus("anonymous");
        }
      }
    };

    void restoreSession();

    return () => {
      active = false;
      window.removeEventListener(
        AUTH_UNAUTHORIZED_EVENT,
        handleUnauthorized,
      );
    };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const response = await loginRequest(input);
    setUser(response);
    setStatus("authenticated");
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const response = await registerRequest(input);
    setUser(response);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      setStatus("anonymous");
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      login,
      register,
      logout,
    }),
    [user, status, login, register, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
