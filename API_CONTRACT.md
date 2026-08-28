# React / Flask API Contract

React 側の endpoint 定義は `src/api` に集約しています。認証は既存 Flask の Cookie Session をそのまま利用し、Vite 開発時は `/auth` と `/api` を Flask (`http://127.0.0.1:5000`) に proxy します。

## CSRF

- `GET /api/csrf-token` → `{ "csrfToken": "..." }`
- Login / initial Register 以外の状態変更 request は `X-CSRFToken` header を送信
- `POST /auth/login` と `POST /auth/register` の JSON request のみ backend で明示的に CSRF exempt

## Authentication

- `GET /auth/me` → `AuthUser`
- `POST /auth/login` → `AuthUser`
- `POST /auth/register` → `AuthUser`（開発環境の初回 Admin 作成のみ）
- `POST /auth/logout` → `{ "message": "..." }`
- `POST /auth/change-password` → `{ "message": "..." }`

## Dashboard / Tasks

- `GET /api/dashboard` → `DashboardData`
- `GET /api/tasks?q=&priority=&status=` → `{ "tasks": Task[] }`
- `POST /api/tasks` → `{ "task": Task }`
- `GET /api/tasks/:id` → `{ "task": Task, "comments": TaskComment[] }`
- `PATCH /api/tasks/:id` → `{ "task": Task }`
- `DELETE /api/tasks/:id` → `{ "message": "..." }`

## Comments

- `POST /api/tasks/:id/comments` → `{ "comment": TaskComment }`
- `DELETE /api/comments/:id` → `{ "message": "..." }`

## Users / Admin

- `GET /api/users/assignees` → `{ "users": AssigneeOption[] }`
- `GET /api/admin/users` → `AdminUsersData`
- `POST /api/admin/users` → `{ "user": UserSummary }`
- `PATCH /api/admin/users/:id/role` → `{ "user": UserSummary }`
- `PATCH /api/admin/users/:id/status` → `{ "user": UserSummary }`
- `POST /api/admin/users/:id/reset-password` → `{ "message": "..." }`
- `GET /api/admin/audit-logs` → `{ "auditLogs": AuditLog[] }`

## Authorization rule

React は表示上の制御を行いますが、権限の最終判定は Flask backend が行います。Task / Comment の API response に含まれる `canManage` / `canDelete` も backend の既存 permission logic から生成します。
