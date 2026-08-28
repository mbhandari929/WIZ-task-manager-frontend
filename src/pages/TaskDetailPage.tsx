import { useParams } from "react-router-dom";

import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import CommentSection from "../components/task/CommentSection";
import TaskDetailPanel from "../components/task/TaskDetailPanel";
import { useTaskDetail } from "../hooks/useTaskDetail";
import { parseRouteId } from "../utils/route";

function TaskDetailPage() {
  const { taskId: taskIdParam } = useParams();
  const taskId = parseRouteId(taskIdParam);
  const { detail, isLoading, error, createComment, removeComment } =
    useTaskDetail(taskId);

  if (taskId === null) {
    return <ErrorMessage message="タスクIDが正しくありません。" />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!detail) {
    return (
      <ErrorMessage
        message={error || "タスクが見つかりません。"}
      />
    );
  }

  return (
    <div className="task-detail-page">
      <ErrorMessage message={error} />
      <TaskDetailPanel
        task={detail.task}
        comments={detail.comments}
      />
      <CommentSection
        comments={detail.comments}
        onCreate={createComment}
        onDelete={removeComment}
      />
    </div>
  );
}

export default TaskDetailPage;
