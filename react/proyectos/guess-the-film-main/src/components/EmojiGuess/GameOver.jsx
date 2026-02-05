import "./GameOver.css";

function GameOver({ score, totalQuestions, onPlayAgain }) {
  return (
    <div className="game-over">
      <h1>🎬 Game Over! 🎬</h1>
      <div className="final-score">
        <p className="score-text">Your Score:</p>
        <p className="score-number">{score}/{totalQuestions}</p>
        <p className="score-label">Correct</p>
      </div>
      <button onClick={onPlayAgain} className="play-again-btn">
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
