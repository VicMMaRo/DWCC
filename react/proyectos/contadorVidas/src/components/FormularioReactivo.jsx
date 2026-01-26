import { useState } from "react";

export function FormularioReactivo() {
    //creamos un estado por cada campo. Esto es una mala practica si hay muchos campos, pero para este ejemplo es suficiente
    const [datosForm, setDatosForm] = useState({nombre:"",email:""});

    // Maneja el envío del formulario
    /* const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Jugador agregado: ${nombre}, Email: ${email}`);
    } */

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`Campo name:${name} `);
        setDatosForm((prev) => ({...prev, [name]:value}));
        
    }

    //validación para mail
    const esMailValido = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const obtenerClasesInputs = (nombreCampo, validadora)=>{
        const claseBase = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition";

        const esValido = validadora ? validadora[nombreCampo] : datosForm.trim().length > 0;

        if (esValido) {
            return `${claseBase} border-green-500 focus:ring-green-500`;
        } else {
            return `${claseBase} border-red-500 focus:ring-red-500`;
        }
    };

    //Creamos una variable para añadir las clases de tailwindcss que se van a repetir en los input. Asi queda mas limpio el código.
    const inputCssClass = "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
    return (
            <form /* onSubmit={handleSubmit} */>

                <input type="text" name="name" id="name" placeholder="Nombre del jugador" required onChange={handleChange}/>

                <input type="email" name="email" id="email" placeholder="Email del jugador" required onChange={handleChange}/>

                <button type="submit">Agregar Jugador</button>
            </form>
        )

}