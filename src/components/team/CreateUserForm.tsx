import { useState, type FormEvent } from "react";

import type { UserRole } from "../../types/auth";
import type { CreateUserInput } from "../../types/user";
import { getErrorMessage } from "../../utils/error";

type CreateUserFormProps = {
  onCreate: (input: CreateUserInput) => Promise<void>;
};

function CreateUserForm({ onCreate }: CreateUserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Member");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await onCreate({ name: name.trim(), email: email.trim(), password, role });
      setName("");
      setEmail("");
      setPassword("");
      setRole("Member");
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "アカウントを作成できませんでした。"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-users-section">
      <div className="admin-section-heading">
        <p>CREATE USER</p>
        <h2>社員アカウント作成</h2>
      </div>
      {error && <div className="admin-message admin-message-error">{error}</div>}
      <form className="admin-create-user-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="admin-user-name">名前</label>
          <input id="admin-user-name" type="text" maxLength={100} required value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="admin-user-email">メールアドレス</label>
          <input id="admin-user-email" type="email" maxLength={120} required value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label htmlFor="admin-user-password">初期パスワード</label>
          <input id="admin-user-password" type="password" minLength={10} maxLength={128} required value={password} onChange={(event) => setPassword(event.target.value)} />
          <small>英大文字・英小文字・数字を含む10文字以上</small>
        </div>
        <div>
          <label htmlFor="admin-user-role">ロール</label>
          <select id="admin-user-role" value={role} onChange={(event) => setRole(event.target.value === "Admin" ? "Admin" : "Member")}>
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "作成中..." : "アカウントを作成"}
        </button>
      </form>
    </section>
  );
}

export default CreateUserForm;
