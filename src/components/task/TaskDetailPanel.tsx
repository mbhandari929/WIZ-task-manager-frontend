import { Link } from "react-router-dom";

import { PRIORITY_LABELS, STATUS_LABELS } from "../../constants/task";
import type { Task, TaskComment } from "../../types/task";
import { formatJapaneseDateTime } from "../../utils/date";

type TaskDetailPanelProps = {
  task: Task;
  comments: TaskComment[];
};

function TaskDetailPanel({ task, comments }: TaskDetailPanelProps) {
  return (
    <>
      <header className="task-detail-header">
        <div>
          <p className="task-detail-label">TASK DETAIL</p>
          <h1>{task.title}</h1>
          <p>タスク情報とチームのコメントを確認できます。</p>
        </div>
        <div className="task-detail-actions">
          <Link className="task-detail-back" to="/">← ダッシュボード</Link>
          {task.canManage && (
            <Link className="task-detail-edit" to={`/tasks/${task.id}/edit`}>
              タスクを編集
            </Link>
          )}
        </div>
      </header>

      <section className="task-detail-card">
        <div className="task-detail-description">
          <p className="task-detail-section-label">DESCRIPTION</p>
          <h2>タスク内容</h2>
          {task.description ? (
            <p>{task.description}</p>
          ) : (
            <p className="task-detail-empty">説明は登録されていません。</p>
          )}
        </div>

        <dl className="task-detail-grid">
          <div><dt>担当者</dt><dd>{task.assignee.name}</dd></div>
          <div><dt>作成者</dt><dd>{task.createdBy?.name ?? "-"}</dd></div>
          <div><dt>優先度</dt><dd>{PRIORITY_LABELS[task.priority]}</dd></div>
          <div><dt>ステータス</dt><dd>{STATUS_LABELS[task.status]}</dd></div>
          <div><dt>期限</dt><dd>{task.dueDate ?? "-"}</dd></div>
          <div><dt>コメント</dt><dd>{comments.length} 件</dd></div>
          <div><dt>作成日時</dt><dd>{formatJapaneseDateTime(task.createdAt)}</dd></div>
          <div><dt>最終更新</dt><dd>{formatJapaneseDateTime(task.updatedAt)}</dd></div>
        </dl>
      </section>
    </>
  );
}

export default TaskDetailPanel;
