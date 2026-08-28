import { useCallback, useEffect, useState } from "react";

import { deleteTask, getTasks } from "../api/taskApi";
import type { Task, TaskFilters } from "../types/task";
import { getErrorMessage } from "../utils/error";

export function useTasks(filters: TaskFilters) {
  const { query, priority, status } = filters;
  const filterKey = `${query}\u0000${priority}\u0000${status}`;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadedFilterKey, setLoadedFilterKey] = useState<string | null>(null);
  const [isReloading, setIsReloading] = useState(false);
  const [error, setError] = useState("");
  const isLoading = loadedFilterKey !== filterKey || isReloading;

  const loadTasks = useCallback(async () => {
    setIsReloading(true);
    setError("");

    try {
      const nextTasks = await getTasks({
        query,
        priority,
        status,
      });
      setTasks(nextTasks);
      setLoadedFilterKey(filterKey);
    } catch (requestError: unknown) {
      setError(
        getErrorMessage(
          requestError,
          "タスクを読み込めませんでした。",
        ),
      );
    } finally {
      setIsReloading(false);
    }
  }, [filterKey, priority, query, status]);

  useEffect(() => {
    const controller = new AbortController();

    const loadFilteredTasks = async () => {
      try {
        const nextTasks = await getTasks(
          { query, priority, status },
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setTasks(nextTasks);
          setError("");
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            getErrorMessage(
              requestError,
              "タスクを読み込めませんでした。",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadedFilterKey(filterKey);
        }
      }
    };

    void loadFilteredTasks();

    return () => controller.abort();
  }, [filterKey, priority, query, status]);

  const removeTask = useCallback(
    async (taskId: number) => {
      await deleteTask(taskId);
      await loadTasks();
    },
    [loadTasks],
  );

  return {
    tasks,
    isLoading,
    error,
    reload: loadTasks,
    removeTask,
  };
}
