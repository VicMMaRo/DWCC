function PantallaGanador({ ganador, resetearPartida }) {
  return (
    <div className="pantalla-ganador">
      <h2>¡{ganador.nombre} ha ganado!</h2>
      <button onClick={resetearPartida}>Jugar de nuevo</button>
    </div>
  );
}

export default PantallaGanador;
