import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  //Función para setear lo que introduzcamos en el input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //Función para añadir las tareas
  const handleAdd = () => {
    if(text.trim() === "") return; //Si viene vacío no hacemos nada
    onAdd(text); //pasamos el text al padre
    setText(""); //limpiamos el input
  };

  return (
    <>
      <input type="text" value={text} onChange={handleTextChange}/>
      <button onClick={handleAdd}>Nueva Tarea</button>
    </>
  );
}