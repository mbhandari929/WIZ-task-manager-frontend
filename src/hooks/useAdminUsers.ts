import { useCallback, useEffect, useState } from "react";

import {
  createAdminUser,
  getAdminUsers,
  updateAdminUserRole,
  updateAdminUserStatus,
} from "../api/adminApi";
import type { UserRole } from "../types/auth";
import type {
  AdminUsersData,
  CreateUserInput,
} from "../types/user";
import { getErrorMessage } from "../utils/error";

export function useAdminUsers() {
  const [data, setData] = useState<AdminUsersData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setData(await getAdminUsers());
    } catch (requestError: unknown) {
      setError(
        getErrorMessage(
          requestError,
          "ユーザー一覧を読み込めませんでした。",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadInitialUsers = async () => {
      try {
        const nextData = await getAdminUsers(controller.signal);

        if (!controller.signal.aborted) {
          setData(nextData);
          setError("");
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            getErrorMessage(
              requestError,
              "ユーザー一覧を読み込めませんでした。",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialUsers();

    return () => controller.abort();
  }, []);

  const createUser = useCallback(
    async (input: CreateUserInput) => {
      await createAdminUser(input);
      await loadUsers();
    },
    [loadUsers],
  );

  const changeRole = useCallback(
    async (userId: number, role: UserRole) => {
      await updateAdminUserRole(userId, role);
      await loadUsers();
    },
    [loadUsers],
  );

  const changeStatus = useCallback(
    async (userId: number, isActive: boolean) => {
      await updateAdminUserStatus(userId, isActive);
      await loadUsers();
    },
    [loadUsers],
  );

  return {
    data,
    isLoading,
    error,
    createUser,
    changeRole,
    changeStatus,
    reload: loadUsers,
  };
}
