import { Link } from "react-router-dom";

import { PRIORITY_LABELS, STATUS_LABELS } from "../../constants/task";
import type { Task, TaskStatus } from "../../types/task";

type KanbanColumnProps = {
  status: TaskStatus;
  tasks: Task[];
};

function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  return (
    <section className="kanban-column">
      <header className="kanban-column-header">
        <h3>{STATUS_LABELS[status]}</h3>
        <span>{tasks.length}</span>
      </header>
      <div className="kanban-task-list">
        {tasks.length === 0 ? (
          <p>タスクはありません。</p>
        ) : (
          tasks.map((task) => (
            <article className="kanban-card" key={task.id}>
              <h4>
                <Link className="task-detail-link" to={`/tasks/${task.id}`}>
                  {task.title}
                </Link>
              </h4>
              <p>担当者: {task.assignee.name}</p>
              <p>優先度: {PRIORITY_LABELS[task.priority]}</p>
              <p>期限: {task.dueDate ?? "-"}</p>
              {task.canManage && (
                <Link to={`/tasks/${task.id}/edit`}>編集</Link>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default KanbanColumn;
