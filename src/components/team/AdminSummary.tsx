import type { AdminUserSummary } from "../../types/user";

type AdminSummaryProps = { summary: AdminUserSummary };

function AdminSummary({ summary }: AdminSummaryProps) {
  return (
    <section className="admin-summary">
      <article className="admin-summary-card">
        <span>全ユーザー</span><strong>{summary.total}</strong>
      </article>
      <article className="admin-summary-card admin-summary-admin">
        <span>Admin</span><strong>{summary.admins}</strong>
      </article>
      <article className="admin-summary-card admin-summary-member">
        <span>Member</span><strong>{summary.members}</strong>
      </article>
      <article className="admin-summary-card admin-summary-active">
        <span>有効アカウント</span><strong>{summary.active}</strong>
      </article>
    </section>
  );
}

export default AdminSummary;
