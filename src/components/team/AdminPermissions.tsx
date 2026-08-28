function AdminPermissions() {
  return (
    <section className="admin-permissions">
      <div className="admin-section-heading">
        <p>ADMIN PERMISSIONS</p>
        <h2>管理者ができること</h2>
      </div>
      <div className="admin-permission-grid">
        <article><strong>ユーザー確認</strong><span>登録ユーザーと現在のロールを確認できます。</span></article>
        <article><strong>ロール変更</strong><span>MemberとAdminを安全に切り替えられます。</span></article>
        <article><strong>全タスク管理</strong><span>すべてのタスクを編集・削除できます。</span></article>
        <article><strong>権限制御</strong><span>Memberは他のユーザーのタスクを閲覧のみ利用できます。</span></article>
      </div>
    </section>
  );
}

export default AdminPermissions;
