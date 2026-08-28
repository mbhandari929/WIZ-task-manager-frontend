import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../constants/task";
import type { TaskPriority, TaskStatus } from "../../types/task";
import type { AssigneeOption } from "../../types/user";

type TaskMetaFieldsProps = {
  assigneeId: number;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  assignees: AssigneeOption[];
  onAssigneeChange: (value: number) => void;
  onPriorityChange: (value: TaskPriority) => void;
  onStatusChange: (value: TaskStatus) => void;
  onDueDateChange: (value: string | null) => void;
};

function isTaskPriority(value: string): value is TaskPriority {
  return TASK_PRIORITIES.some((item) => item === value);
}

function isTaskStatus(value: string): value is TaskStatus {
  return TASK_STATUSES.some((item) => item === value);
}

function TaskMetaFields({
  assigneeId,
  priority,
  status,
  dueDate,
  assignees,
  onAssigneeChange,
  onPriorityChange,
  onStatusChange,
  onDueDateChange,
}: TaskMetaFieldsProps) {
  return (
    <>
      <div className="task-field">
        <label htmlFor="task-assignee">担当者</label>
        <select
          id="task-assignee"
          value={assigneeId || ""}
          required
          onChange={(event) =>
            onAssigneeChange(Number(event.target.value) || 0)
          }
        >
          <option value="">担当者を選択してください</option>
          {assignees.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="task-field">
        <label htmlFor="task-priority">優先度</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(event) => {
            if (isTaskPriority(event.target.value)) {
              onPriorityChange(event.target.value);
            }
          }}
        >
          {TASK_PRIORITIES.map((item) => (
            <option key={item} value={item}>
              {PRIORITY_LABELS[item]}
            </option>
          ))}
        </select>
      </div>

      <div className="task-field">
        <label htmlFor="task-status">ステータス</label>
        <select
          id="task-status"
          value={status}
          onChange={(event) => {
            if (isTaskStatus(event.target.value)) {
              onStatusChange(event.target.value);
            }
          }}
        >
          {TASK_STATUSES.map((item) => (
            <option key={item} value={item}>
              {STATUS_LABELS[item]}
            </option>
          ))}
        </select>
      </div>

      <div className="task-field">
        <label htmlFor="task-due-date">期限</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate ?? ""}
          onChange={(event) =>
            onDueDateChange(event.target.value || null)
          }
        />
      </div>
    </>
  );
}

export default TaskMetaFields;
