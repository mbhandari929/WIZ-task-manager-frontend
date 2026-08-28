import WizLogo from "../brand/WizLogo";

function AuthBrand() {
  return (
    <div className="auth-brand-panel">
      <WizLogo theme="dark" />
      <p className="auth-brand-kicker">INTERNAL TASK MANAGEMENT</p>
      <h2>社内タスク管理</h2>
      <p className="auth-brand-description">
        チームの進捗、期限、優先度を一つの画面で管理できます。
      </p>
    </div>
  );
}

export default AuthBrand;
