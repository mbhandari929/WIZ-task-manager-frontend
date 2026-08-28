import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { changePassword } from "../../api/authApi";
import { getErrorMessage } from "../../utils/error";

type ChangePasswordFormProps = { onSuccess: () => void };

function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("新しいパスワードが一致しません。");
      return;
    }
    setIsSubmitting(true);
    try {
      await changePassword({ currentPassword, newPassword, confirmPassword });
      onSuccess();
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "パスワードを変更できませんでした。"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label htmlFor="current-password">現在のパスワード</label>
        <input id="current-password" type="password" autoComplete="current-password" maxLength={128} required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
      </div>
      <div className="auth-field">
        <label htmlFor="new-password">新しいパスワード</label>
        <input id="new-password" type="password" autoComplete="new-password" minLength={10} maxLength={128} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        <small>英大文字・英小文字・数字を含む10文字以上</small>
      </div>
      <div className="auth-field">
        <label htmlFor="confirm-password">新しいパスワード（確認）</label>
        <input id="confirm-password" type="password" autoComplete="new-password" minLength={10} maxLength={128} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      </div>
      {error && <div className="auth-message auth-message-error">{error}</div>}
      <button type="submit" className="auth-submit-button" disabled={isSubmitting}>
        {isSubmitting ? "変更中..." : "変更する"}
      </button>
      <Link className="auth-cancel-link" to="/">キャンセル</Link>
    </form>
  );
}

export default ChangePasswordForm;
