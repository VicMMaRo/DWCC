import { useState, useCallback} from "react";

//Lista incial de tareas
const initialList = [
    { id: 1, text: "Comprar Leche", completed: false },
    { id: 2, text: "Escribir Mails Empresas", completed: false },
];

function useTodo() {
    const [tasks, setTasks] = useState(initialList);//iniciamos el estado con la nueva lista, cuando esta cambie el componente vuelve a renderizar.

    //función para añadir nueva tarea
    //Usamos el hook useCallback(función, [dependencia]) para envolver a addTask y evitar renderizados imnecesarios. 
    const addTask = useCallback( (text) => {
                                        const newTask = {
                                            id: Date.now(),
                                            text: text,
                                            completed: false
                                        };
                                        setTasks(prev => [...prev, newTask]);//creamos nuevo array con el estado anterior(prev) más la nueva tarea y lo seteamos
                                    }, []//Como usamos prev, la función no depende del valor actual de tasks para trabajar, por lo que podemos dejar la dependencia vacía y la función será siempre la misma.
                                );

  //función para actualizar tarea
  //recibimos el id de la tarea y le cambiamos el nuevo texto
    const updateTask = useCallback(
        (id, newText) => {
        setTasks(   
                    tasks.map(task => task.id === id ? {...task, text:newText} : task)
                );
    }, [tasks]//como aqui no estamos usando el estado previo en elñ set, si no tasks directamente si que tenemos que añadir aqui la dependencia
    ); 

    //función para actualizar estado completed de la tarea
    //recibimos id y estado de completed(true/false) de la tarea 
    const toggleTask = useCallback(
        (id, completed) => {
            setTasks(
                prev => prev.map(task => task.id === id ? { ...task, completed } : task)
            );
        }, []
    ); 

    //función para borrar tarea
    //recibimos id y borramos la tarea filtrando y quitando la que recibimos por id
    const deleteTask = useCallback(
        (id) => {
            setTasks(prev => prev.filter(task => task.id !== id));
        }, []
    ); 

    //retornamos todas las funciones para usarlas en nuestros componentes y la lista de tareas tasks
    return {tasks, addTask, updateTask, toggleTask, deleteTask};
}
export default useTodo;