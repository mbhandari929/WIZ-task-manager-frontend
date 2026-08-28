import type { TaskPriority, TaskStatus } from "../types/task";

export const TASK_PRIORITIES: TaskPriority[] = ["Low", "Medium", "High"];

export const TASK_STATUSES: TaskStatus[] = [
  "Pending",
  "In Progress",
  "Done",
];

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  Low: "低",
  Medium: "中",
  High: "高",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  Pending: "未着手",
  "In Progress": "進行中",
  Done: "完了",
};
