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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Formulario</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     type="text" name="name" id="name" placeholder="Nombre del jugador" required />
                    <input className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     type="email" name="email" id="email" placeholder="Email del jugador" required/>
                    <button className="w-full
                                    rounded-md
                                    bg-blue-600
                                    px-4
                                    py-2
                                    text-white
                                    font-semibold
                                    hover:bg-blue-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:ring-offset-2
                                    transition
                                    duration-200" 
                        type="submit">Agregar Jugador
                    </button>
                </form>
            </div>
            
        </div>
        
    );
}