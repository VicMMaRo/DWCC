import { useState } from "react";
import TodoItem from "./TodoItem";

const lista_tareas = [
  { id: 1, texto: "Comprar Leche" },
  { id: 2, texto: "Escribir Mails Empresas" },
];

export default function TodoList() {
  const [tareas, setTareas] = useState(lista_tareas);
  
  return (
    <ul>
      {tareas.map((tarea) => (
        <TodoItem key={tarea.id} id={tarea.id} texto={tarea.texto} />
      ))}
    </ul>
  );
}
