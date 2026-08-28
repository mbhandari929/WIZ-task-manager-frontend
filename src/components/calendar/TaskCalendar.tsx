import { Link } from "react-router-dom";

import type { Task } from "../../types/task";

type TaskCalendarProps = {
  tasks: Task[];
};

const weekdayLabels = ["月", "火", "水", "木", "金", "土", "日"];

function buildWeeks(year: number, monthIndex: number): Array<Array<number | null>> {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const cells: Array<number | null> = [
    ...Array.from({ length: mondayOffset }, () => null),
    ...Array.from({ length: lastDay }, (_, index) => index + 1),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: Array<Array<number | null>> = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
}

function dateKey(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function TaskCalendar({ tasks }: TaskCalendarProps) {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const weeks = buildWeeks(year, monthIndex);

  const tasksByDate = new Map<string, Task[]>();
  for (const task of tasks) {
    if (!task.dueDate) {
      continue;
    }
    const existing = tasksByDate.get(task.dueDate) ?? [];
    tasksByDate.set(task.dueDate, [...existing, task]);
  }

  return (
    <section className="task-calendar">
      <header className="task-calendar-header">
        <div className="calendar-title">
          <h2>カレンダー</h2>
          <p>タスク予定を確認できます</p>
        </div>
        <div className="calendar-month">
          {year}年{monthIndex + 1}月
        </div>
      </header>

      <table className="calendar-table">
        <thead>
          <tr>
            {weekdayLabels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return <td className="empty-day" key={dayIndex} />;
                }
                const key = dateKey(year, monthIndex, day);
                const dayTasks = tasksByDate.get(key) ?? [];
                return (
                  <td key={day}>
                    <div className="calendar-day">
                      <div className="day-number">{day}</div>
                      <div className="calendar-tasks">
                        {dayTasks.map((task) => (
                          <Link
                            className="calendar-task"
                            to={`/tasks/${task.id}`}
                            key={task.id}
                          >
                            {task.title}
                            {task.commentCount > 0 && (
                              <span className="calendar-comment-count">
                                {task.commentCount}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TaskCalendar;
