import { Link } from "react-router-dom";

import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import AuditLogTable from "../components/team/AuditLogTable";
import { useAuditLogs } from "../hooks/useAuditLogs";

function AuditLogPage() {
  const { logs, isLoading, error } = useAuditLogs();
  return (
    <div className="admin-page">
      <header className="admin-header">
        <div><p className="admin-header-label">Audit trail</p><h1>監査ログ</h1><p>重要な更新操作を最新200件まで確認できます。</p></div>
        <Link to="/" className="admin-back-link">← ダッシュボードへ</Link>
      </header>
      <ErrorMessage message={error} />
      {isLoading ? <LoadingState /> : <AuditLogTable logs={logs} />}
    </div>
  );
}

export default AuditLogPage;
