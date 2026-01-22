import Jugador from "./Jugador";
import PantallaGanador from "./PantallaGanador";
import  useContadorVidas  from "../hooks/useContadorVidas";
import "./contadorVidas.css";

function ContadorVidas() {
  const { jugadores, esFinpartida, ganador, actualizarVidas, resetearVidas, resetearPartida } = useContadorVidas();
  /* sacamos toda esta lógica y la ponemos en el hook useContadorVidas.js. Mirarlo para ver como queda.
  // Filtrar supervivientes
  const supervivientes = jugadores.filter((j) => j.vidas > 0);
  const esFinpartida = supervivientes.length === 1;
  const ganador = esFinpartida ? supervivientes[0] : null;

  //función para actualizar vidas
  const actualizarVidas = (idJugador, cantidad) => {
    setJugadores((prev) =>
      prev.map((j) =>
        j.id === idJugador ? { ...j, vidas: j.vidas + cantidad } : j
      )
    );
  };

COntado  //función para resetear vidas
  const resetearVidas = (idJugador) => {
    setJugadores(prev =>
      prev.map((j) =>
        j.id === idJugador ? { ...j, vidas: VIDA_INICIAL } : j
      )
    );
    };
    //resetear partida
    const resetearPartida = () => {
      setJugadores(JUGADORES);
    }
 */

  return (
    <div className="contenedor-principal">
      {/* Usamos un ternario para pintar la pantallaGanador o los jugadores si es finPartida o no */}
      {esFinpartida ? (<PantallaGanador ganador={ganador} resetearPartida={resetearPartida}/>)
      :
      (jugadores.map((j) => (
                      <Jugador
                        key={j.id}
                        id={j.id}
                        nombre={j.nombre}
                        vidas={j.vidas}
                        actualizarVidas={actualizarVidas}
                        resetearVidas={resetearVidas}
                        esFinpartida={esFinpartida}
                      />
                      )
                    )
      )}
    </div>
  );
}

export default ContadorVidas;
