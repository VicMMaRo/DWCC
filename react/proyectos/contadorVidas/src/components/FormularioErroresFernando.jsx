import { useState } from "react";

const validarEmail = (valor) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!valor) return "El email es obligatorio";
  if (!regex.test(valor)) return "Email no válido";
  return null;
};

const validarNombre = (valor) => {
  if (!valor.trim()) return "El nombre es obligatorio";
  if (valor.length < 3) return "El nombre debe tener mínimo 3 caracteres";
  return null;
};

export default function FormularioFinal() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    email: "",
  });

  const [errores, setErrores] = useState({
    nombre: null,
    email: null,
  });

  const manejaCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejaEnvio = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      nombre: validarNombre(datosFormulario.nombre),
      email: validarEmail(datosFormulario.email),
    };

    const erroresFiltrados = Object.fromEntries(
      Object.entries(nuevosErrores).filter((el) => el !== null),
    );

    if (Object.keys(erroresFiltrados).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    alert("Formulario Enviado");
  };

  return (
    <form onSubmit={manejaEnvio} noValidate>
      <input
        name="nombre"
        id="nombre"
        value={datosFormulario.nombre}
        onChange={manejaCambio}
        placeholder="Tu nombre"
      />
      {errores.nombre && <p className="errores">{errores.nombre}</p>}
      <input
        name="email"
        id="nombre"
        type="email"
        value={datosFormulario.email}
        onChange={manejaCambio}
        placeholder="tu@email.com"
      />
      {errores.email && <p className="errores">{errores.email}</p>}
      <button type="submit">ENVIAR</button>
    </form>
  );
}
