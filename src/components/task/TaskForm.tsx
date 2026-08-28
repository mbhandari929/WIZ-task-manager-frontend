import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import type { TaskInput } from "../../types/task";
import type { AssigneeOption } from "../../types/user";
import TaskBasicFields from "./TaskBasicFields";
import TaskMetaFields from "./TaskMetaFields";

type TaskFormProps = {
  initialValue?: TaskInput;
  assignees: AssigneeOption[];
  isSubmitting: boolean;
  error: string;
  submitLabel: string;
  variant?: "dashboard" | "edit";
  cancelTo?: string;
  onSubmit: (input: TaskInput) => Promise<void>;
};

function createInitialValue(
  initialValue: TaskInput | undefined,
  assignees: AssigneeOption[],
): TaskInput {
  if (initialValue) {
    return { ...initialValue };
  }

  return {
    title: "",
    description: "",
    assigneeId: assignees[0]?.id ?? 0,
    priority: "Medium",
    status: "Pending",
    dueDate: null,
  };
}

function TaskForm({
  initialValue,
  assignees,
  isSubmitting,
  error,
  submitLabel,
  variant = "dashboard",
  cancelTo,
  onSubmit,
}: TaskFormProps) {
  const [value, setValue] = useState<TaskInput>(() =>
    createInitialValue(initialValue, assignees),
  );

  const effectiveAssigneeId =
    value.assigneeId || assignees[0]?.id || 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (effectiveAssigneeId === 0 || !value.title.trim()) {
      return;
    }

    void onSubmit({
      ...value,
      assigneeId: effectiveAssigneeId,
      title: value.title.trim(),
      description: value.description.trim(),
    });
  };

  const isEdit = variant === "edit";

  return (
    <form
      className={isEdit ? "edit-task-form" : undefined}
      onSubmit={handleSubmit}
    >
      <TaskBasicFields
        title={value.title}
        description={value.description}
        onTitleChange={(title) => setValue({ ...value, title })}
        onDescriptionChange={(description) =>
          setValue({ ...value, description })
        }
      />
      <TaskMetaFields
        assigneeId={effectiveAssigneeId}
        priority={value.priority}
        status={value.status}
        dueDate={value.dueDate}
        assignees={assignees}
        onAssigneeChange={(assigneeId) =>
          setValue({ ...value, assigneeId })
        }
        onPriorityChange={(priority) =>
          setValue({ ...value, priority })
        }
        onStatusChange={(status) => setValue({ ...value, status })}
        onDueDateChange={(dueDate) => setValue({ ...value, dueDate })}
      />

      {error && <p className="task-field-message">{error}</p>}

      {isEdit ? (
        <div className="edit-actions">
          <button
            className="edit-save-button"
            type="submit"
            disabled={isSubmitting || assignees.length === 0}
          >
            {isSubmitting ? "保存中..." : submitLabel}
          </button>
          {cancelTo && (
            <Link className="edit-cancel-button" to={cancelTo}>
              キャンセル
            </Link>
          )}
        </div>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting || assignees.length === 0}
        >
          {isSubmitting ? "保存中..." : submitLabel}
        </button>
      )}
    </form>
  );
}

export default TaskForm;
