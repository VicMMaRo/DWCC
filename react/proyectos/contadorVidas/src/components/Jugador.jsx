import { BOTONES_DANIO, BOTONES_CURACION } from "../constantes";
import "./jugador.css";
import {memo} from "react";//abajo en el export envolvemos el componente con memo

function Jugador({ id, nombre, vidas, actualizarVidas, resetearVidas, esFinpartida=false }) {
  return (
    <div className="jugador">
      <div className="nombre">{nombre}</div>
      <div className="vidas">{vidas}</div>
      <div className="controles">
        <button className="btn reset" disabled={esFinpartida} onClick={() => resetearVidas(id)}>RESET</button>
        <div className="contenedor-botones">
          {BOTONES_DANIO.map((btn) => (
            <button
              key={btn.value}
              className="btn daño"
              onClick={() => actualizarVidas(id, btn.value)}
              disabled={esFinpartida}
            >
              {btn.label}   
            </button>
          ))}
        </div>

        <div className="contenedor-botones">
          {BOTONES_CURACION.map((btn) => (
            <button
              key={btn.value}
              className="btn cura"
              onClick={() => actualizarVidas(id, btn.value)}
              disabled={esFinpartida}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Jugador);
