import { Navigate, useNavigate } from "react-router-dom";

import AuthBrand from "../components/auth/AuthBrand";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const { status } = useAuth();
  const navigate = useNavigate();
  if (status === "authenticated") return <Navigate to="/" replace />;

  return (
    <div className="auth-page">
      <main className="auth-container">
        <section className="auth-card">
          <AuthBrand />
          <div className="auth-form-panel">
            <div className="auth-heading"><p className="auth-eyebrow">Welcome back</p><h1>ログイン</h1><p>アカウント情報を入力してください。</p></div>
            <LoginForm onSuccess={() => navigate("/", { replace: true })} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
