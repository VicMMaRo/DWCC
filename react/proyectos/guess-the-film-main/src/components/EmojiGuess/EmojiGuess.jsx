import { useState, useEffect } from "react";
import { movies } from "../../data/movies";
import { normalizeText } from "../../utils/textUtils";
import QuestionCard from "./QuestionCard";
import GameOver from "./GameOver";
import "./EmojiGuess.css";

function EmojiGuess() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const selectRandomMovies = () => {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  useEffect(() => {
    setSelectedMovies(selectRandomMovies());
  }, []);

  const handleAnswer = (answer) => {
    const currentMovie = selectedMovies[currentIndex];
    const normalizedAnswer = normalizeText(answer);
    const correct = currentMovie.regex.test(normalizedAnswer);

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        moveToNext();
      }, 1500);
    }
  };

  const moveToNext = () => {
    setShowFeedback(false);
    setIsCorrect(false);

    if (currentIndex + 1 < selectedMovies.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameStatus("finished");
    }
  };

  const handlePlayAgain = () => {
    setSelectedMovies(selectRandomMovies());
    setCurrentIndex(0);
    setScore(0);
    setGameStatus("playing");
    setShowFeedback(false);
    setIsCorrect(false);
  };

  if (selectedMovies.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (gameStatus === "finished") {
    return <GameOver score={score} totalQuestions={5} onPlayAgain={handlePlayAgain} />;
  }

  return (
    <div className="emoji-guess">
      <div className="header">
        <h1>🎬 Guess the Movie! 🎬</h1>
        <div className="progress">
          Question {currentIndex + 1} of {selectedMovies.length} | Score: {score}
        </div>
      </div>
      <QuestionCard
        movie={selectedMovies[currentIndex]}
        onAnswer={handleAnswer}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        nextQuestion={moveToNext}
      />
    </div>
  );
}

export default EmojiGuess;
