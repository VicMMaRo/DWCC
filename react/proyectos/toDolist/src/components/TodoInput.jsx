import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
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
