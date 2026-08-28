import type { TaskSummaryData } from "../../types/task";

type TaskSummaryProps = {
  summary: TaskSummaryData;
};

function TaskSummary({ summary }: TaskSummaryProps) {
  return (
    <section className="task-summary">
      <h2>タスク状況</h2>
      <div>
        <p>全タスク: {summary.total}</p>
        <p>未着手: {summary.pending}</p>
        <p>進行中: {summary.inProgress}</p>
        <p>完了: {summary.done}</p>
        <p>期限超過: {summary.overdue}</p>
      </div>
    </section>
  );
}

export default TaskSummary;
