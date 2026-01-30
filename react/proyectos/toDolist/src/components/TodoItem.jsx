import { useState, memo } from "react";

function TodoItem({ task, onUpdate, onCompleted, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditText = (e) => {
    setEditText(e.target.value);
  };

  const handleSave = () => {
     onUpdate(task.id, editText);
    setIsEditing(false);
  };

  //función para controlar si la tarea esta hecha o no
  const handleToggle = (e) => {
    onCompleted(task.id, e.target.checked);
  };

  //función para borrar tarea
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <li id={task.id}>
      {isEditing ? (
        <>
          <input value={editText} onChange={handleEditText}></input>
          <button onClick={handleSave}>💾</button>       
        </>
      ) : (
        <>
          {/* En el span añadimos o quitamos la clase completed con un ternario para tachar la tarea terminada */}
          <span className={task.completed ? "completed" : ""}>{task.text}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={handleDelete}>🪦</button>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
          />          
        </>
      )}
    </li>
  );
}
export default  memo(TodoItem);