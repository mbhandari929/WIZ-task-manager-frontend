import { useState } from "react";

import { createTask } from "../api/taskApi";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import TaskCalendar from "../components/calendar/TaskCalendar";
import RecentActivity from "../components/dashboard/RecentActivity";
import TodayTasks from "../components/dashboard/TodayTasks";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import KanbanBoard from "../components/kanban/KanbanBoard";
import Topbar from "../components/layout/Topbar";
import TaskFilters from "../components/task/TaskFilters";
import TaskForm from "../components/task/TaskForm";
import TaskSummary from "../components/task/TaskSummary";
import TaskTable from "../components/task/TaskTable";
import { useAssignableUsers } from "../hooks/useAssignableUsers";
import { useDashboard } from "../hooks/useDashboard";
import { useTasks } from "../hooks/useTasks";
import type { TaskFilters as TaskFiltersValue, TaskInput } from "../types/task";
import { getErrorMessage } from "../utils/error";

const emptyFilters: TaskFiltersValue = { query: "", priority: "", status: "" };

function DashboardPage() {
  const { data, isLoading, error, reload: reloadDashboard } = useDashboard();
  const { users, isLoading: usersLoading, error: usersError } = useAssignableUsers();
  const [filters, setFilters] = useState<TaskFiltersValue>(emptyFilters);
  const { tasks, isLoading: tasksLoading, error: tasksError, reload: reloadTasks, removeTask } = useTasks(filters);
  const [taskActionError, setTaskActionError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  if (isLoading || usersLoading) {
    return <LoadingState />;
  }

  if (!data) {
    return <ErrorMessage message={error || usersError || "ダッシュボードを読み込めませんでした。"} />;
  }

  const handleCreate = async (input: TaskInput) => {
    setTaskActionError("");
    setIsCreating(true);
    try {
      await createTask(input);
      await Promise.all([reloadDashboard(), reloadTasks()]);
      setFormVersion((value) => value + 1);
    } catch (requestError: unknown) {
      setTaskActionError(getErrorMessage(requestError, "タスクを作成できませんでした。"));
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    setTaskActionError("");
    try {
      await removeTask(taskId);
      await reloadDashboard();
    } catch (requestError: unknown) {
      setTaskActionError(getErrorMessage(requestError, "タスクを削除できませんでした。"));
    }
  };

  return (
    <div id="dashboard">
      <Topbar />
      <ErrorMessage message={error || usersError || tasksError || taskActionError} />
      <TaskSummary summary={data.summary} />

      <div id="kanban">
        {tasksLoading ? <LoadingState label="タスクを読み込んでいます..." /> : <KanbanBoard tasks={tasks} />}
      </div>

      <div id="calendar">
        {tasksLoading ? <LoadingState label="カレンダーを読み込んでいます..." /> : <TaskCalendar tasks={tasks} />}
      </div>

      <TodayTasks tasks={data.todayTasks} />
      <UpcomingDeadlines tasks={data.upcomingDeadlines} />
      <RecentActivity tasks={data.recentActivity} />

      <section id="add-task">
        <h2>タスク追加</h2>
        <TaskForm
          key={formVersion}
          assignees={users}
          isSubmitting={isCreating}
          error={taskActionError}
          submitLabel="タスクを追加"
          onSubmit={handleCreate}
        />
      </section>

      <section id="task-list">
        <h2>タスク一覧</h2>
        <TaskFilters
          key={`${filters.query}-${filters.priority}-${filters.status}`}
          initialValue={filters}
          onSearch={setFilters}
          onClear={() => setFilters(emptyFilters)}
        />
        {tasksLoading ? (
          <LoadingState label="タスクを読み込んでいます..." />
        ) : (
          <TaskTable tasks={tasks} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
