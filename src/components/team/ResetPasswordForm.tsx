import { useState, type FormEvent } from "react";

import type { ResetPasswordInput } from "../../types/user";
import { getErrorMessage } from "../../utils/error";

type ResetPasswordFormProps = { onSubmit: (input: ResetPasswordInput) => Promise<void> };

function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("新しいパスワードが一致しません。");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({ password, confirmPassword });
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "パスワードを再設定できませんでした。"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-users-section admin-password-reset-section">
      {error && <div className="admin-message admin-message-error">{error}</div>}
      <form className="admin-password-reset-form" onSubmit={handleSubmit}>
        <div><label htmlFor="reset-password">新しいパスワード</label><input id="reset-password" type="password" minLength={10} maxLength={128} required value={password} onChange={(event) => setPassword(event.target.value)} /></div>
        <div><label htmlFor="reset-password-confirm">新しいパスワード（確認）</label><input id="reset-password-confirm" type="password" minLength={10} maxLength={128} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div>
        <small>英大文字・英小文字・数字を含む10文字以上</small>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "再設定中..." : "再設定する"}</button>
      </form>
    </section>
  );
}

export default ResetPasswordForm;
