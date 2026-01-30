import { useState } from "react";

//recibimos onAdd del padre para guardar la tarea
export default function TodoInput({ onAdd }) {
  //estado para guardar y actualizar el texto introducido en el input
  const [text, setText] = useState("");

  //función para cambiar estado de text
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //función para guardar la tarea
  const handleSubmit = () => {
    if (text.trim() === "") return;//si el input esta vacio no hace nada
    onAdd(text);
    setText("");//borramos text seteantolo a un string vacío
  };

  return (
    <>
      <input
        type="text"
        onChange={handleTextChange}
        value={text}
        placeholder="Escribe una tarea..."
      />
      <button onClick={handleSubmit}>Nueva Tarea</button>
    </>
  );
}
