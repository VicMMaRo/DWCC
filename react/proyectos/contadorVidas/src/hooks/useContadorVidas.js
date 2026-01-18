//vamos a sacar la lógica del componente ContadorVidas para tenerlo más limpio y ordenado
import { useState } from "react";
import { JUGADORES, VIDA_INICIAL } from "../constantes";

export function useContadorVidas() {
  const [jugadores, setJugadores] = useState(JUGADORES);

  // Filtrar supervivientes que tienen vida
  const supervivientes = jugadores.filter((j) => j.vidas > 0);
  const esFinpartida = supervivientes.length === 1;//si solo queda uno es el fin de la partida
  const ganador = esFinpartida ? supervivientes[0] : null;//si es fin de partida, el ganador es el unico superviviente, el que único que queda en la posición [0]

  //función para actualizar vidas                       
    const actualizarVidas = (idJugador, cantidad) => {
      setJugadores((prev) =>
        prev.map((j) =>
          j.id === idJugador ? { ...j, vidas: j.vidas + cantidad } : j
        )
      );
    };

  //función para resetear vidas
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

  return {
    jugadores,
    esFinpartida,
    ganador,
    actualizarVidas,
    resetearVidas,
    resetearPartida
  };
}
export default useContadorVidas;