import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

const list = [
  { id: 1, text: "Comprar Leche" },
  { id: 2, text: "Escribir Mails Empresas" },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(list);//cargamos la lista

  //Función para añadir nueva tarea
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
    };

    //Actualizamos el estado
    setTasks([...tasks, newTask]);//Mediante el operador ...spread pasamos toda la lista y despues le añadimos el nuevo elemento al final, es decir, la nueva tarea.
  };
  return (
    <>
      <ul>
        {tasks.map((task) => (
          <TodoItem key={task.id} id={task.id} texto={task.text} />
        ))}
      </ul>
      <TodoInput onAdd={addTask} /> {/* Estamos pasando al hijo TodoInput la función addTask. Ahora podemos usarla alli para añadir tareas */}
    </>
  );
}
