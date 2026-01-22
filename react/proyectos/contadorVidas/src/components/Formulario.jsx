export function Formulario() {

    // Maneja el envío del formulario, con el evento preventDefault para evitar recargar la página si hay error de validación
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData  = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        console.log(formData);
        console.log("-------------------------------------------");
        console.log(data);
        alert(`Jugador agregado: ${data.name}, Email: ${data.email}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" placeholder="Nombre del jugador" required />
            <input type="email" name="email" id="email" placeholder="Email del jugador" required/>
            <button type="submit">Agregar Jugador</button>
        </form>
    );
}