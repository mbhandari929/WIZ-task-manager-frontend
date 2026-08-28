import { Navigate, useNavigate } from "react-router-dom";

import AuthBrand from "../components/auth/AuthBrand";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../hooks/useAuth";

function RegisterPage() {
  const { status } = useAuth();
  const navigate = useNavigate();
  if (status === "authenticated") return <Navigate to="/" replace />;

  return (
    <div className="auth-page">
      <main className="auth-container">
        <section className="auth-card">
          <AuthBrand />
          <div className="auth-form-panel">
            <div className="auth-heading"><p className="auth-eyebrow">Create account</p><h1>アカウント登録</h1><p>チームのタスク管理を始めましょう。</p></div>
            <RegisterForm onSuccess={() => navigate("/", { replace: true })} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default RegisterPage;
