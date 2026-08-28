# WIZ Task Manager Frontend

React + TypeScript + Vite で構成した、株式会社 W.I.Z 社内タスク管理システムのフロントエンドです。

## 主な機能

- Cookie Session を利用した Login / Logout
- パスワード変更
- Dashboard / Task List / Search / Filter
- Task Create / Detail / Edit / Delete
- Kanban / Calendar
- Comment Create / Delete
- Admin の社員アカウント管理
- Admin のパスワード再設定 / 監査ログ確認

## 構成

- `src/pages`: 画面単位の組み立て
- `src/components`: 表示・入力コンポーネント
- `src/hooks`: API を使う画面ロジック
- `src/api`: HTTP 通信と CSRF 処理
- `src/types`: TypeScript の共有型
- `src/utils`: 日付・エラーなどの共通処理
- `src/routes`: ルーティングと認証ガード
- `src/styles`: 機能別 CSS

`main.tsx` は React のマウントだけ、`App.tsx` はルーティングの呼び出しだけを担当します。

## 開発時の接続

Flask backend は `http://127.0.0.1:5000` で起動します。Vite の開発サーバーは `/auth` と `/api` を Flask へ proxy するため、React 側は同一オリジンの相対 URL を使用します。

```powershell
npm install
npm run dev
```

Routing には `react-router-dom` を使用します。依存関係は `package.json` で管理してください。

## 認証と CSRF

認証情報を `localStorage` に保存せず、Flask の HttpOnly Cookie Session を使用します。状態変更 API は `/api/csrf-token` から取得した CSRF token を `X-CSRFToken` header に付けて送信します。

`/auth/login` と初回 Admin 作成用 `/auth/register` の JSON request だけは backend 側で CSRF 対象外です。

## 本番環境

Cookie Session を安全かつ単純に扱うため、React と Flask は reverse proxy などで同一オリジンから提供する構成を推奨します。別ドメイン配信に変更する場合は、CORS、Cookie の `SameSite` / `Secure`、CSRF の設計をセットで見直してください。

## 確認

最終反映前に以下を実行します。

```powershell
npm run lint
npm run build
```

Backend 側は次を実行します。

```powershell
python -m pytest -q
```
