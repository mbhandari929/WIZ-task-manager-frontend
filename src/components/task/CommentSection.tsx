import { useState, type FormEvent } from "react";

import type { TaskComment } from "../../types/task";
import { formatJapaneseDateTime } from "../../utils/date";
import { getErrorMessage } from "../../utils/error";

type CommentSectionProps = {
  comments: TaskComment[];
  onCreate: (content: string) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
};

function CommentSection({ comments, onCreate, onDelete }: CommentSectionProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) {
      setError("コメントを入力してください。");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await onCreate(trimmed);
      setContent("");
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "コメントを追加できませんでした。"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    setError("");
    try {
      await onDelete(commentId);
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "コメントを削除できませんでした。"));
    }
  };

  return (
    <section className="comment-section">
      <header className="comment-section-header">
        <h2>コメント</h2>
        <span className="comment-total">{comments.length} 件</span>
      </header>

      {error && (
        <div className="comment-messages">
          <div className="comment-message comment-message-error">{error}</div>
        </div>
      )}

      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="comment-empty">
            <strong>コメントはまだありません。</strong>
            <span>タスクについてチームで共有できます。</span>
          </div>
        ) : (
          comments.map((comment) => (
            <article className="comment-item" id={`comment-${comment.id}`} key={comment.id}>
              <header className="comment-item-header">
                <div className="comment-author">
                  <span className="comment-avatar">
                    {comment.authorName.slice(0, 1).toUpperCase() || "-"}
                  </span>
                  <div>
                    <strong>{comment.authorName}</strong>
                    {comment.authorRole && (
                      <span className={`comment-role comment-role-${comment.authorRole.toLowerCase()}`}>
                        {comment.authorRole}
                      </span>
                    )}
                  </div>
                </div>
                <time dateTime={comment.createdAt}>
                  {formatJapaneseDateTime(comment.createdAt)}
                </time>
              </header>
              <p className="comment-content">{comment.content}</p>
              {comment.canDelete && (
                <form className="comment-delete-form" onSubmit={(event) => {
                  event.preventDefault();
                  void handleDelete(comment.id);
                }}>
                  <button type="submit">コメントを削除</button>
                </form>
              )}
            </article>
          ))
        )}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="comment-content">コメントを追加</label>
        <textarea
          id="comment-content"
          value={content}
          maxLength={1000}
          required
          onChange={(event) => setContent(event.target.value)}
        />
        <div className="comment-form-footer">
          <span>{content.length} / 1000</span>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "コメントを追加"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CommentSection;
