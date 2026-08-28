type TaskBasicFieldsProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

function TaskBasicFields({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: TaskBasicFieldsProps) {
  return (
    <>
      <div className="task-field">
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          type="text"
          value={title}
          maxLength={200}
          required
          onChange={(event) => onTitleChange(event.target.value)}
        />
      </div>

      <div className="task-field">
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
      </div>
    </>
  );
}

export default TaskBasicFields;
