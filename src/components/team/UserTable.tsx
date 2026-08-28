import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/auth";
import type { UserSummary } from "../../types/user";
import { formatJapaneseDate } from "../../utils/date";
import { getErrorMessage } from "../../utils/error";
import UserActions from "./UserActions";

type UserTableProps = {
  users: UserSummary[];
  onRoleChange: (userId: number, role: UserRole) => Promise<void>;
  onStatusChange: (userId: number, isActive: boolean) => Promise<void>;
};

function UserTable({ users, onRoleChange, onStatusChange }: UserTableProps) {
  const { user: currentUser } = useAuth();
  const [error, setError] = useState("");

  const changeRole = async (userId: number, role: UserRole) => {
    setError("");

    try {
      await onRoleChange(userId, role);
    } catch (requestError: unknown) {
      setError(
        getErrorMessage(
          requestError,
          "ユーザーのロールを更新できませんでした。",
        ),
      );
    }
  };

  const changeStatus = async (userId: number, isActive: boolean) => {
    setError("");

    try {
      await onStatusChange(userId, isActive);
    } catch (requestError: unknown) {
      setError(
        getErrorMessage(
          requestError,
          "ユーザーの状態を更新できませんでした。",
        ),
      );
    }
  };

  return (
    <section className="admin-users-section">
      <div className="admin-section-heading">
        <p>USER LIST</p>
        <h2>登録ユーザー</h2>
      </div>

      {error && (
        <div className="admin-message admin-message-error">{error}</div>
      )}

      {users.length === 0 ? (
        <p>登録ユーザーはいません。</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-user-table">
            <thead>
              <tr>
                <th>ユーザー</th>
                <th>メールアドレス</th>
                <th>ロール</th>
                <th>状態</th>
                <th>作成タスク</th>
                <th>担当タスク</th>
                <th>登録日</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-user-identity">
                      <span className="admin-user-avatar">
                        {user.name.slice(0, 1).toUpperCase()}
                      </span>
                      <strong>{user.name}</strong>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`admin-role-badge admin-role-${user.role.toLowerCase()}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`admin-status-badge admin-status-${
                        user.isActive ? "active" : "inactive"
                      }`}
                    >
                      {user.isActive ? "有効" : "無効"}
                    </span>
                  </td>
                  <td>{user.createdTaskCount}</td>
                  <td>{user.assignedTaskCount}</td>
                  <td>{formatJapaneseDate(user.createdAt)}</td>
                  <td>
                    <UserActions
                      key={`${user.id}-${user.role}`}
                      user={user}
                      isCurrentUser={currentUser?.id === user.id}
                      onRoleChange={changeRole}
                      onStatusChange={changeStatus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UserTable;
