import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import WizLogo from "../brand/WizLogo";

const dashboardLinks = [
  { href: "/#dashboard", label: "ダッシュボード", icon: "⌂" },
  { href: "/#kanban", label: "カンバン", icon: "▦" },
  { href: "/#calendar", label: "カレンダー", icon: "▣" },
  { href: "/#task-list", label: "タスク一覧", icon: "☷" },
  { href: "/#add-task", label: "タスク追加", icon: "＋" },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <WizLogo theme="light" showName={false} compact />
        <div className="brand-text">
          <strong>株式会社WIZ</strong>
          <span>社内タスク管理システム</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="メインメニュー">
        {dashboardLinks.map((link) => (
          <a className="sidebar-link" href={link.href} key={link.href}>
            <span className="sidebar-icon" aria-hidden="true">
              {link.icon}
            </span>
            <span>{link.label}</span>
          </a>
        ))}

        {user?.role === "Admin" && (
          <>
            <NavLink
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
              to="/admin/users"
            >
              <span className="sidebar-icon" aria-hidden="true">◎</span>
              <span>ユーザー管理</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
              to="/admin/audit-logs"
            >
              <span className="sidebar-icon" aria-hidden="true">◷</span>
              <span>監査ログ</span>
            </NavLink>
          </>
        )}
      </nav>

      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-avatar" aria-hidden="true">
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="sidebar-user-details">
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
          <button
            type="button"
            className="sidebar-logout-button"
            onClick={() => void handleLogout()}
          >
            ログアウト
          </button>
          <NavLink className="sidebar-password-link" to="/change-password">
            パスワード変更
          </NavLink>
        </div>
      )}

      <div className="sidebar-footer">
        <WizLogo theme="light" showName={false} compact />
        <div>
          <strong>株式会社WIZ</strong>
          <span>Internal Task System</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
