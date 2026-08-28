import { Link } from "react-router-dom";

import { PRIORITY_LABELS } from "../../constants/task";
import type { Task } from "../../types/task";

type UpcomingDeadlinesProps = { tasks: Task[] };

function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
  return (
    <section className="upcoming-deadlines">
      <header><h2>期限間近</h2></header>
      {tasks.length === 0 ? (
        <p>7日以内に期限を迎えるタスクはありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong><Link className="task-detail-link" to={`/tasks/${task.id}`}>{task.title}</Link></strong>
              <span>担当者: {task.assignee.name}</span>
              <span>期限: {task.dueDate ?? "-"}</span>
              <span>優先度: {PRIORITY_LABELS[task.priority]}</span>
              {task.canManage && <Link to={`/tasks/${task.id}/edit`}>編集</Link>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UpcomingDeadlines;
