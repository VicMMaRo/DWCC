import { useState } from "react";

export default function FormularioReactivoFernando() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    email: "",
  });
  
  const manejaCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const esMailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const obtenerClasesInputs = (nombreCampo, validadora) => {
    const claseBase =
      "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition";

    const esValido = validadora
      ? validadora(datosFormulario[nombreCampo])
      : datosFormulario[nombreCampo].trim().length > 0;

    if (esValido) {
      return `${claseBase} border-green-500 focus:ring-green-500`;
    } else {
      return `${claseBase} border-red-500 focus:ring-red-500`;
    }
  };

  return (
    <form noValidate>
      <input
        type="text"
        name="nombre"
        id="nombre"
        required
        className={obtenerClasesInputs("nombre")}
        value={datosFormulario.nombre}
        onChange={manejaCambio}
        placeholder="Escriba aquí su nombre"
      />
      <input
        type="email"
        name="email"
        id="email"
        required
        className={obtenerClasesInputs("email", esMailValido)}
        value={datosFormulario.email}
        onChange={manejaCambio}
        placeholder="tu@email.com"
      />
      <button type="submit">ENVIAR</button>
    </form>
  );
}
