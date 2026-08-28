import { apiRequest } from "./apiClient";
import type { ApiMessage } from "../types/api";
import type {
  DashboardData,
  Task,
  TaskComment,
  TaskDetail,
  TaskFilters,
  TaskInput,
} from "../types/task";

type TaskListResponse = {
  tasks: Task[];
};

type TaskResponse = {
  task: Task;
};

type CommentResponse = {
  comment: TaskComment;
};

function buildTaskQuery(filters: TaskFilters): string {
  const params = new URLSearchParams();

  if (filters.query.trim()) {
    params.set("q", filters.query.trim());
  }

  if (filters.priority) {
    params.set("priority", filters.priority);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  const query = params.toString();

  return query ? `?${query}` : "";
}

export async function getTasks(
  filters: TaskFilters,
  signal?: AbortSignal,
): Promise<Task[]> {
  const response = await apiRequest<TaskListResponse>(
    `/api/tasks${buildTaskQuery(filters)}`,
    { signal },
  );

  return response.tasks;
}

export function getDashboard(
  signal?: AbortSignal,
): Promise<DashboardData> {
  return apiRequest<DashboardData>("/api/dashboard", { signal });
}

export async function createTask(input: TaskInput): Promise<Task> {
  const response = await apiRequest<TaskResponse>("/api/tasks", {
    method: "POST",
    body: input,
  });

  return response.task;
}

export async function updateTask(
  taskId: number,
  input: TaskInput,
): Promise<Task> {
  const response = await apiRequest<TaskResponse>(
    `/api/tasks/${taskId}`,
    {
      method: "PATCH",
      body: input,
    },
  );

  return response.task;
}

export function deleteTask(taskId: number): Promise<ApiMessage> {
  return apiRequest<ApiMessage>(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export function getTaskDetail(
  taskId: number,
  signal?: AbortSignal,
): Promise<TaskDetail> {
  return apiRequest<TaskDetail>(`/api/tasks/${taskId}`, { signal });
}

export async function addComment(
  taskId: number,
  content: string,
): Promise<TaskComment> {
  const response = await apiRequest<CommentResponse>(
    `/api/tasks/${taskId}/comments`,
    {
      method: "POST",
      body: { content },
    },
  );

  return response.comment;
}

export function deleteComment(commentId: number): Promise<ApiMessage> {
  return apiRequest<ApiMessage>(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
}
