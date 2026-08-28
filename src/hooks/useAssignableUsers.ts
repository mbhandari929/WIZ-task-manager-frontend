import { useEffect, useState } from "react";

import { getAssignableUsers } from "../api/userApi";
import type { AssigneeOption } from "../types/user";
import { getErrorMessage } from "../utils/error";

export function useAssignableUsers() {
  const [users, setUsers] = useState<AssigneeOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const nextUsers = await getAssignableUsers(controller.signal);

        if (!controller.signal.aborted) {
          setUsers(nextUsers);
          setError("");
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            getErrorMessage(
              requestError,
              "担当者を読み込めませんでした。",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadUsers();

    return () => controller.abort();
  }, []);

  return { users, isLoading, error };
}
