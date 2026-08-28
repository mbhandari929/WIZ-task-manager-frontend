import { useState, type FormEvent } from "react";

import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/error";

type LoginFormProps = { onSuccess: () => void };

function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      onSuccess();
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "メールアドレスまたはパスワードを確認してください。"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label htmlFor="login-email">メールアドレス</label>
        <input id="login-email" type="email" autoComplete="email" maxLength={120} value={email} required onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="auth-field">
        <label htmlFor="login-password">パスワード</label>
        <input id="login-password" type="password" autoComplete="current-password" maxLength={128} value={password} required onChange={(event) => setPassword(event.target.value)} />
      </div>
      {error && <div className="auth-message auth-message-error">{error}</div>}
      <button type="submit" className="auth-submit-button" disabled={isSubmitting}>
        {isSubmitting ? "ログイン中..." : "ログイン"}
      </button>
      <p className="auth-switch-link">アカウントが必要な場合は管理者に依頼してください。</p>
    </form>
  );
}

export default LoginForm;
