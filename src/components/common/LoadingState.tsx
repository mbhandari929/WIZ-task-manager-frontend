type LoadingStateProps = {
  label?: string;
};

function LoadingState({
  label = "読み込み中...",
}: LoadingStateProps) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingState;
