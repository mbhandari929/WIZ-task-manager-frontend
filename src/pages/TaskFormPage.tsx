import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { updateTask } from "../api/taskApi";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import TaskForm from "../components/task/TaskForm";
import { useAssignableUsers } from "../hooks/useAssignableUsers";
import { useTaskDetail } from "../hooks/useTaskDetail";
import type { TaskInput } from "../types/task";
import { getErrorMessage } from "../utils/error";
import { parseRouteId } from "../utils/route";

function TaskFormPage() {
  const { taskId: taskIdParam } = useParams();
  const taskId = parseRouteId(taskIdParam);
  const navigate = useNavigate();
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
  } = useAssignableUsers();
  const {
    detail,
    isLoading: taskLoading,
    error: taskError,
  } = useTaskDetail(taskId);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValue = useMemo<TaskInput | undefined>(() => {
    if (!detail) {
      return undefined;
    }

    return {
      title: detail.task.title,
      description: detail.task.description ?? "",
      assigneeId: detail.task.assignee.id,
      priority: detail.task.priority,
      status: detail.task.status,
      dueDate: detail.task.dueDate,
    };
  }, [detail]);

  if (taskId === null) {
    return (
      <div className="edit-page-body">
        <ErrorMessage message="タスクIDが正しくありません。" />
      </div>
    );
  }

  if (usersLoading || taskLoading) {
    return (
      <div className="edit-page-body">
        <LoadingState />
      </div>
    );
  }

  if (!detail || !detail.task.canManage) {
    return (
      <div className="permission-error-page">
        <div className="permission-error-card">
          <p className="permission-error-code">403</p>
          <h1>編集できません</h1>
          <p>
            {taskError ||
              "このタスクを編集する権限がありません。"}
          </p>
          <a href="/">ダッシュボードへ</a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (input: TaskInput) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const task = await updateTask(taskId, input);
      navigate(`/tasks/${task.id}`, { replace: true });
    } catch (requestError: unknown) {
      setSubmitError(
        getErrorMessage(
          requestError,
          "タスクを更新できませんでした。",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-page-body">
      <main className="edit-page">
        <section className="edit-card">
          <div className="edit-card-header">
            <p className="edit-card-label">TASK EDIT</p>
            <h1>タスク編集</h1>
            <p>タスクの担当者、期限、進捗を更新できます。</p>
          </div>
          <ErrorMessage message={usersError || taskError} />
          <TaskForm
            initialValue={initialValue}
            assignees={users}
            isSubmitting={isSubmitting}
            error={submitError}
            submitLabel="更新する"
            variant="edit"
            cancelTo={`/tasks/${taskId}`}
            onSubmit={handleSubmit}
          />
        </section>
      </main>
    </div>
  );
}

export default TaskFormPage;
