import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

const list = [
  { id: 1, text: "Comprar Leche" },
  { id: 2, text: "Escribir Mails Empresas" },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(list);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
    };

    setTasks([...tasks, newTask]);
  };
  return (
    <>
      <ul>
        {tareas.map((task) => (
          <TodoItem key={task.id} id={task.id} texto={task.texto} />
        ))}
      </ul>
      <TodoInput onAdd={addTask} />
    </>
  );
}
