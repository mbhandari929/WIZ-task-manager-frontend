function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-label">Dashboard</p>
        <h1>タスク管理</h1>
        <p className="topbar-description">
          チームのタスクを管理・確認できます。
        </p>
      </div>
      <a href="#add-task" className="topbar-add-button">
        ＋ 新規タスク
      </a>
    </header>
  );
}

export default Topbar;
