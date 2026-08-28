import { useNavigate } from "react-router-dom";

import ChangePasswordForm from "../components/auth/ChangePasswordForm";

function ChangePasswordPage() {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <main className="auth-container auth-container-compact">
        <section className="auth-card auth-card-single">
          <div className="auth-form-panel">
            <div className="auth-heading"><p className="auth-eyebrow">Account security</p><h1>パスワード変更</h1><p>現在のパスワードを確認して、新しいパスワードを設定します。</p></div>
            <ChangePasswordForm onSuccess={() => navigate("/", { replace: true })} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default ChangePasswordPage;
