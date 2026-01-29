import { useState } from "react";

export default function FormularioErrores() {
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

//OJO!!! Mirar formulario errores de fernando para ver como mejorar esta parte, no funciona como deberia.
const manejaEnvio = (e) => {
    e.preventDefault();

    const nuevosErrores = {
        nombre: esNombreValido(datosFormulario.nombre),//le pasamos a cada propiedad la función correspondiente para validar
        email: esMailValido(datosFormulario.email)
    };

    //seteamos los errores si los hay o se queda en null. Despues lo comprobamos en el html con un if(&&) para pintar los errores
    setErrores(nuevosErrores);
    alert("Formulario Enviado");//cuando se manda el formulario
};

const [errores, setErrores] = useState({
    nombre: null,
    email: null,
});


  const esNombreValido = (nombre) => {
    if(!nombre.trim()) return "El nombre no puede estar vacío";

    return (nombre.length < 3) ? "El nombre debe de tener mas de 3 caracteres" : null;
  };

  const esMailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email) ? null : "Error al validar el email";
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
    <form noValidate onSubmit={manejaEnvio}>
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
      {errores.nombre && <p className="errores">{errores.nombre}</p>}

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
      {errores.email && <p className="errores">{errores.email}</p>}
      <button type="submit">ENVIAR</button>
    </form>
  );
}
