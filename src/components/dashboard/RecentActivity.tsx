import { Link } from "react-router-dom";

import { STATUS_LABELS } from "../../constants/task";
import type { Task } from "../../types/task";
import { formatJapaneseDateTime } from "../../utils/date";

type RecentActivityProps = { tasks: Task[] };

function RecentActivity({ tasks }: RecentActivityProps) {
  return (
    <section className="recent-activity">
      <header><h2>最近の更新</h2></header>
      {tasks.length === 0 ? (
        <p>最近の更新はありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong><Link className="task-detail-link" to={`/tasks/${task.id}`}>{task.title}</Link></strong>
              <span>担当者: {task.assignee.name}</span>
              <span>{STATUS_LABELS[task.status]}</span>
              <span>更新: {formatJapaneseDateTime(task.updatedAt)}</span>
              {task.canManage && <Link to={`/tasks/${task.id}/edit`}>編集</Link>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentActivity;
