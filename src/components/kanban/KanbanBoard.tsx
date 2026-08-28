import { TASK_STATUSES } from "../../constants/task";
import type { Task } from "../../types/task";
import KanbanColumn from "./KanbanColumn";

type KanbanBoardProps = {
  tasks: Task[];
};

function KanbanBoard({ tasks }: KanbanBoardProps) {
  return (
    <section className="kanban-section">
      <h2>カンバンボード</h2>
      <div className="kanban-board">
        {TASK_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </section>
  );
}

export default KanbanBoard;
