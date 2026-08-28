import { Link } from "react-router-dom";

import { STATUS_LABELS } from "../../constants/task";
import type { Task } from "../../types/task";

type TodayTasksProps = { tasks: Task[] };

function TodayTasks({ tasks }: TodayTasksProps) {
  return (
    <section className="today-tasks">
      <header><h2>今日のタスク</h2></header>
      {tasks.length === 0 ? (
        <p>今日が期限のタスクはありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong><Link className="task-detail-link" to={`/tasks/${task.id}`}>{task.title}</Link></strong>
              <span>担当者: {task.assignee.name}</span>
              <span>{STATUS_LABELS[task.status]}</span>
              {task.canManage && <Link to={`/tasks/${task.id}/edit`}>編集</Link>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TodayTasks;
