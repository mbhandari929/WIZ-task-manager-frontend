import { Link } from "react-router-dom";

import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import AdminPermissions from "../components/team/AdminPermissions";
import AdminSummary from "../components/team/AdminSummary";
import CreateUserForm from "../components/team/CreateUserForm";
import UserTable from "../components/team/UserTable";
import { useAdminUsers } from "../hooks/useAdminUsers";

function TeamPage() {
  const { data, isLoading, error, createUser, changeRole, changeStatus } = useAdminUsers();

  if (isLoading) return <LoadingState />;
  if (!data) return <ErrorMessage message={error || "ユーザー一覧を読み込めませんでした。"} />;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div><p className="admin-header-label">Administration</p><h1>ユーザー管理</h1><p>社員アカウント、ロール、利用状態を管理します。</p></div>
        <Link to="/" className="admin-back-link">← ダッシュボードへ</Link>
      </header>
      <ErrorMessage message={error} />
      <AdminSummary summary={data.summary} />
      <AdminPermissions />
      <CreateUserForm onCreate={createUser} />
      <UserTable users={data.users} onRoleChange={changeRole} onStatusChange={changeStatus} />
    </div>
  );
}

export default TeamPage;
