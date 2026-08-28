import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/error";

type RegisterFormProps = { onSuccess: () => void };

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }
    setIsSubmitting(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
      onSuccess();
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "アカウントを作成できませんでした。"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label htmlFor="register-name">名前</label>
        <input id="register-name" type="text" value={name} autoComplete="name" maxLength={100} required onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="auth-field">
        <label htmlFor="register-email">メールアドレス</label>
        <input id="register-email" type="email" value={email} autoComplete="email" maxLength={120} required onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="auth-field">
        <label htmlFor="register-password">パスワード</label>
        <input id="register-password" type="password" value={password} autoComplete="new-password" minLength={10} maxLength={128} required onChange={(event) => setPassword(event.target.value)} />
        <small>10文字以上で、英大文字・英小文字・数字を含めてください。</small>
      </div>
      <div className="auth-field">
        <label htmlFor="register-confirm-password">パスワード確認</label>
        <input id="register-confirm-password" type="password" value={confirmPassword} autoComplete="new-password" minLength={10} maxLength={128} required onChange={(event) => setConfirmPassword(event.target.value)} />
      </div>
      {error && <div className="auth-message auth-message-error">{error}</div>}
      <button type="submit" className="auth-submit-button" disabled={isSubmitting}>
        {isSubmitting ? "登録中..." : "アカウントを作成"}
      </button>
      <p className="auth-switch-link">既にアカウントをお持ちの方 <Link to="/login">ログイン</Link></p>
    </form>
  );
}

export default RegisterForm;
