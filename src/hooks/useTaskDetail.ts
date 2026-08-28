import { useCallback, useEffect, useState } from "react";

import {
  addComment,
  deleteComment,
  getTaskDetail,
} from "../api/taskApi";
import type { TaskDetail } from "../types/task";
import { getErrorMessage } from "../utils/error";

export function useTaskDetail(taskId: number | null) {
  const [detail, setDetail] = useState<TaskDetail | null>(null);
  const [loadedTaskId, setLoadedTaskId] = useState<number | null>(null);
  const [isReloading, setIsReloading] = useState(false);
  const [error, setError] = useState("");
  const isLoading =
    taskId !== null && (loadedTaskId !== taskId || isReloading);

  const loadDetail = useCallback(async () => {
    if (taskId === null) {
      return;
    }

    setIsReloading(true);
    setError("");

    try {
      setDetail(await getTaskDetail(taskId));
      setLoadedTaskId(taskId);
    } catch (requestError: unknown) {
      setError(
        getErrorMessage(
          requestError,
          "タスク詳細を読み込めませんでした。",
        ),
      );
    } finally {
      setIsReloading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId === null) {
      return undefined;
    }

    const controller = new AbortController();

    const loadInitialDetail = async () => {
      try {
        const nextDetail = await getTaskDetail(taskId, controller.signal);

        if (!controller.signal.aborted) {
          setDetail(nextDetail);
          setError("");
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            getErrorMessage(
              requestError,
              "タスク詳細を読み込めませんでした。",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadedTaskId(taskId);
        }
      }
    };

    void loadInitialDetail();

    return () => controller.abort();
  }, [taskId]);

  const createComment = useCallback(
    async (content: string) => {
      if (taskId === null) {
        return;
      }

      await addComment(taskId, content);
      await loadDetail();
    },
    [taskId, loadDetail],
  );

  const removeComment = useCallback(
    async (commentId: number) => {
      await deleteComment(commentId);
      await loadDetail();
    },
    [loadDetail],
  );

  return {
    detail,
    isLoading,
    error,
    reload: loadDetail,
    createComment,
    removeComment,
  };
}
