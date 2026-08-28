import type { UserRole } from "./auth";

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Pending" | "In Progress" | "Done";

export type TaskPerson = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  assignee: TaskPerson;
  createdBy: TaskPerson | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  canManage: boolean;
};

export type TaskInput = {
  title: string;
  description: string;
  assigneeId: number;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
};

export type TaskFilters = {
  query: string;
  priority: TaskPriority | "";
  status: TaskStatus | "";
};

export type TaskSummaryData = {
  total: number;
  pending: number;
  inProgress: number;
  done: number;
  overdue: number;
};

export type DashboardData = {
  summary: TaskSummaryData;
  todayTasks: Task[];
  upcomingDeadlines: Task[];
  recentActivity: Task[];
};

export type TaskComment = {
  id: number;
  content: string;
  authorName: string;
  authorRole: UserRole | null;
  createdAt: string;
  canDelete: boolean;
};

export type TaskDetail = {
  task: Task;
  comments: TaskComment[];
};
