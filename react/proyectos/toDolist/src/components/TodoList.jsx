import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

const initialList = [
  { id: 1, text: "Comprar Leche", completed: false },
  { id: 2, text: "Escribir Mails Empresas", completed: false },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(initialList);//iniciamos el estado con la nueva lista, cuando esta cambie el componente vuelve a renderizar.

  //función para añadir nueva tarea
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask]);//creamos nuevo array con el array task más la nueva tarea y lo seteamos
  };

  //función para actualizar tarea
  //recibimos el id de la tarea y le cambiamos el nuevo texto
  const updateTask = (id, newText) => {
    setTasks(tasks.map(
                        task => task.id === id ? {...task, text:newText} : task
                      )
            );
  }

  //función para actualizar estado completed de la tarea
  //recibimos id y estado de completed(true/false) de la tarea 
  const toggleTask = (id, completed) => {
    setTasks(prev =>
        prev.map(task => task.id === id ? { ...task, completed } : task
      )
    );
  };

  //función para borrar tarea
  //recibimos id y borramos la tarea filtrando y quitando la que recibimos por id
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };


  return (
    <>
      <ul>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onUpdate={updateTask} onCompleted={toggleTask} onDelete={deleteTask}/>
        ))}
      </ul>
      <TodoInput onAdd={addTask} />
    </>
  );
}
