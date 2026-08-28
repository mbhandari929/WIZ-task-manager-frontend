import { useState, type FormEvent } from "react";

import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../constants/task";
import type { TaskFilters as TaskFiltersValue, TaskPriority, TaskStatus } from "../../types/task";

type TaskFiltersProps = {
  initialValue: TaskFiltersValue;
  onSearch: (value: TaskFiltersValue) => void;
  onClear: () => void;
};

function toPriority(value: string): TaskPriority | "" {
  return value === "Low" || value === "Medium" || value === "High" ? value : "";
}

function toStatus(value: string): TaskStatus | "" {
  return value === "Pending" || value === "In Progress" || value === "Done" ? value : "";
}

function TaskFilters({ initialValue, onSearch, onClear }: TaskFiltersProps) {
  const [value, setValue] = useState<TaskFiltersValue>(initialValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ ...value, query: value.query.trim() });
  };

  const handleClear = () => {
    const empty: TaskFiltersValue = { query: "", priority: "", status: "" };
    setValue(empty);
    onClear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="q">検索</label>
        <input
          type="search"
          id="q"
          value={value.query}
          placeholder="タイトル・担当者"
          onChange={(event) => setValue({ ...value, query: event.target.value })}
        />
      </div>
      <div>
        <label htmlFor="priority">優先度</label>
        <select
          id="priority"
          value={value.priority}
          onChange={(event) => setValue({ ...value, priority: toPriority(event.target.value) })}
        >
          <option value="">すべて</option>
          {TASK_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>{PRIORITY_LABELS[priority]}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status">ステータス</label>
        <select
          id="status"
          value={value.status}
          onChange={(event) => setValue({ ...value, status: toStatus(event.target.value) })}
        >
          <option value="">すべて</option>
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>{STATUS_LABELS[status]}</option>
          ))}
        </select>
      </div>
      <button type="submit">検索</button>
      <button type="button" className="task-filter-clear" onClick={handleClear}>
        クリア
      </button>
    </form>
  );
}

export default TaskFilters;
