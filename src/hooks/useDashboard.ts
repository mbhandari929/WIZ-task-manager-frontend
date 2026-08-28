import { useCallback, useEffect, useState } from "react";

import { getDashboard } from "../api/taskApi";
import type { DashboardData } from "../types/task";
import { getErrorMessage } from "../utils/error";

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setData(await getDashboard());
    } catch (requestError: unknown) {
      setError(
        getErrorMessage(
          requestError,
          "ダッシュボードを読み込めませんでした。",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadInitialDashboard = async () => {
      try {
        const nextData = await getDashboard(controller.signal);

        if (!controller.signal.aborted) {
          setData(nextData);
          setError("");
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            getErrorMessage(
              requestError,
              "ダッシュボードを読み込めませんでした。",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialDashboard();

    return () => controller.abort();
  }, []);

  return {
    data,
    isLoading,
    error,
    reload: loadDashboard,
  };
}
