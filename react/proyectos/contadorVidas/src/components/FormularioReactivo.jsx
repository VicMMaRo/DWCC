import { useState } from "react";

export function FormularioReactivo() {
    //creamos un estado por cada campo. Esto es una mala practica si hay muchos campos, pero para este ejemplo es suficiente
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Maneja el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Jugador agregado: ${name}, Email: ${email}`);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target);
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
    }

    return (
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" placeholder="Nombre del jugador" required onChange={handleChange}/>
                <input type="email" name="email" id="email" placeholder="Email del jugador" required onChange={handleChange}/>
                <button type="submit">Agregar Jugador</button>
            </form>
        )

}