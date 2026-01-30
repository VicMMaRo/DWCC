import { useState, memo } from "react";

//recibimos del padre las funciones que vamos a usar
function TodoItem({ task, onUpdate, onCompleted, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);//iniciamos el estado en falso para que no salte el editar en el ternario del return
  const [editText, setEditText] = useState(task.text);

  //función para editar texto
  const handleEditText = (e) => {
    setEditText(e.target.value);
  };

  //función para guardar el texto editado y poner isEditing a false
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
export default memo(TodoItem);