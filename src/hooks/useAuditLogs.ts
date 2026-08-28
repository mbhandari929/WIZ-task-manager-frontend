import { useEffect, useState } from "react";

import { getAuditLogs } from "../api/adminApi";
import type { AuditLog } from "../types/user";
import { getErrorMessage } from "../utils/error";

export function useAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const nextLogs = await getAuditLogs(controller.signal);

        if (!controller.signal.aborted) {
          setLogs(nextLogs);
          setError("");
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            getErrorMessage(
              requestError,
              "監査ログを読み込めませんでした。",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => controller.abort();
  }, []);

  return { logs, isLoading, error };
}
