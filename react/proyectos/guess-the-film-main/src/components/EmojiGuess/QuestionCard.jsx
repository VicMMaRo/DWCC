import { useState } from "react";
import "./QuestionCard.css";

function QuestionCard({ movie, onAnswer, showFeedback, isCorrect, nextQuestion }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onAnswer(answer);
      setAnswer("");
    }
  };

  return (
    <div className="question-card">
      <div className="emojis">{movie.emojis}</div>
      
      {!showFeedback ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter movie title..."
            className="answer-input"
            autoFocus
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      ) : (
        <div className="feedback">
          {isCorrect ? (
            <div className="success">
              <p>✅ Correct!</p>
            </div>
          ) : (
            <div className="failure">
              <p>❌ Incorrect</p>
              <p className="correct-answer">The answer was: <strong>{movie.title}</strong></p>
              <button onClick={nextQuestion} className="next-btn">
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
