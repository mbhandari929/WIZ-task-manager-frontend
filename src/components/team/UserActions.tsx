import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import type { UserRole } from "../../types/auth";
import type { UserSummary } from "../../types/user";

type UserActionsProps = {
  user: UserSummary;
  isCurrentUser: boolean;
  onRoleChange: (userId: number, role: UserRole) => Promise<void>;
  onStatusChange: (userId: number, isActive: boolean) => Promise<void>;
};

function UserActions({
  user,
  isCurrentUser,
  onRoleChange,
  onStatusChange,
}: UserActionsProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);

  const submitRole = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onRoleChange(user.id, selectedRole);
  };

  const submitStatus = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onStatusChange(user.id, !user.isActive);
  };

  return (
    <div className="admin-user-actions">
      {isCurrentUser ? (
        <span className="admin-current-user">現在のユーザー</span>
      ) : (
        <>
          <form className="admin-role-form" onSubmit={submitRole}>
            <label className="sr-only" htmlFor={`role-${user.id}`}>
              ロール
            </label>
            <select
              id={`role-${user.id}`}
              value={selectedRole}
              onChange={(event) =>
                setSelectedRole(
                  event.target.value === "Admin" ? "Admin" : "Member",
                )
              }
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <button type="submit">変更</button>
          </form>

          <form className="admin-status-form" onSubmit={submitStatus}>
            <button
              type="submit"
              className={user.isActive ? "is-danger" : "is-success"}
            >
              {user.isActive ? "無効化" : "有効化"}
            </button>
          </form>
        </>
      )}

      <Link
        className="admin-reset-link"
        to={`/admin/users/${user.id}/reset-password`}
      >
        パスワード再設定
      </Link>
    </div>
  );
}

export default UserActions;
