function PantallaGanador({ ganador, resetearPartida }) {
    return (
        <div className="pantalla-ganador">
            <h2>¡Partida Finalizada!</h2>
            <p>El ganador es: {ganador.nombre}</p>
            <button onClick={resetearPartida}>Jugar de nuevo</button>
        </div>
    );
}

export default PantallaGanador;
