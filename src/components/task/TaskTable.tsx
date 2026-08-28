import { Link } from "react-router-dom";

import { PRIORITY_LABELS, STATUS_LABELS } from "../../constants/task";
import type { Task } from "../../types/task";

type TaskTableProps = {
  tasks: Task[];
  onDelete: (taskId: number) => Promise<void>;
};

function TaskTable({ tasks, onDelete }: TaskTableProps) {
  if (tasks.length === 0) {
    return (
      <div>
        <h3>タスクはまだありません</h3>
        <p>最初のタスクを追加してください。</p>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>担当者</th>
          <th>優先度</th>
          <th>ステータス</th>
          <th>期限</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="task-title-cell">
              <Link className="task-detail-link" to={`/tasks/${task.id}`}>
                {task.title}
              </Link>
              <span className="task-comment-count">
                {task.commentCount} コメント
              </span>
            </td>
            <td>{task.assignee.name}</td>
            <td>{PRIORITY_LABELS[task.priority]}</td>
            <td>{STATUS_LABELS[task.status]}</td>
            <td>{task.dueDate ?? "-"}</td>
            <td>
              {task.canManage ? (
                <>
                  <Link to={`/tasks/${task.id}/edit`}>編集</Link>{" "}
                  <form className="task-delete-form" onSubmit={(event) => {
                    event.preventDefault();
                    void onDelete(task.id);
                  }}>
                    <button type="submit">削除</button>
                  </form>
                </>
              ) : (
                <span className="permission-read-only">閲覧のみ</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
