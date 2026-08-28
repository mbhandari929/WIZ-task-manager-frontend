import type { AuditLog } from "../../types/user";
import { formatJapaneseDateTime } from "../../utils/date";

type AuditLogTableProps = { logs: AuditLog[] };

function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <section className="admin-users-section">
      <div className="admin-table-wrapper">
        <table className="admin-user-table admin-audit-table">
          <thead>
            <tr><th>日時（JST）</th><th>ユーザー</th><th>操作</th><th>Method</th><th>Path</th><th>Status</th><th>IP</th></tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr><td colSpan={7}>監査ログはまだありません。</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{formatJapaneseDateTime(log.createdAt)}</td>
                  <td>{log.userName ?? "-"}</td>
                  <td><strong>{log.action}</strong></td>
                  <td>{log.method}</td>
                  <td><code>{log.path}</code></td>
                  <td>{log.statusCode}</td>
                  <td>{log.ipAddress ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AuditLogTable;
