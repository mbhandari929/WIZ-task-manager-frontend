import { Link, useNavigate, useParams } from "react-router-dom";

import { resetAdminUserPassword } from "../api/adminApi";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import ResetPasswordForm from "../components/team/ResetPasswordForm";
import { useAdminUsers } from "../hooks/useAdminUsers";
import type { ResetPasswordInput } from "../types/user";

function parseUserId(value: string | undefined): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function ResetUserPasswordPage() {
  const { userId: userIdParam } = useParams();
  const userId = parseUserId(userIdParam);
  const navigate = useNavigate();
  const { data, isLoading, error } = useAdminUsers();

  if (userId === null) return <ErrorMessage message="ユーザーIDが正しくありません。" />;
  if (isLoading) return <LoadingState />;

  const targetUser = data?.users.find((user) => user.id === userId);
  if (!targetUser) return <ErrorMessage message={error || "ユーザーが見つかりません。"} />;

  const handleSubmit = async (input: ResetPasswordInput) => {
    await resetAdminUserPassword(userId, input);
    navigate("/admin/users", { replace: true });
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div><p className="admin-header-label">Account security</p><h1>パスワード再設定</h1><p>{targetUser.name}（{targetUser.email}）</p></div>
        <Link to="/admin/users" className="admin-back-link">← ユーザー管理へ</Link>
      </header>
      <ResetPasswordForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ResetUserPasswordPage;
