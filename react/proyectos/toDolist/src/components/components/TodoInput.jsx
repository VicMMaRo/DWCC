import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <input type="text" onChange={handleTextChange}>
        {text}
      </input>
      <button onClick={onAdd}>Nueva Tarea</button>
    </>
  );
}
