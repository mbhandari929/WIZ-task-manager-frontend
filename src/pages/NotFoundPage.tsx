import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="permission-error-page">
      <div className="permission-error-card">
        <p className="permission-error-code">404</p>
        <h1>ページが見つかりません</h1>
        <p>URLを確認してください。</p>
        <Link to="/">ダッシュボードへ</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
