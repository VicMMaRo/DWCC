import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import useTodo from "../hooks/useTodo";



export default function TodoList() {
  //desestructuramos useTodo. OJO, usand {} ya que recibimos el return de un objeto.
  const {tasks, addTask, updateTask, toggleTask, deleteTask} = useTodo();

  return (
  /*  <>
      <ul>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onUpdate={updateTask} onCompleted={toggleTask} onDelete={deleteTask}/>
        ))}
      </ul>
      <TodoInput onAdd={addTask} />
    </> */

  <div className="min-h-screen bg-lnear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
      
      {/* 1. Header */}
      <header className="bg-indigo-600 p-6">
        <h1 className="text-2xl font-bold text-white text-center">Mi Lista de Tareas</h1>
        <p className="text-indigo-100 text-sm text-center mt-1">
          Tienes {tasks.length} tareas pendientes
        </p>
      </header>

      {/* 2. Body (Lista) */}
      <main className="p-4 max-h-400 overflow-y-auto">
        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <TodoItem 
                key={task.id} 
                task={task} 
                onUpdate={updateTask} 
                onCompleted={toggleTask} 
                onDelete={deleteTask}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 py-10">No hay tareas. ¡Descansa!</p>
        )}
      </main>

      {/* 3. Footer para el input y el botón */}
      <footer className="p-4 bg-gray-50 border-t border-gray-100">
        <TodoInput onAdd={addTask} />
      </footer>

    </div>
  </div>
);

}
