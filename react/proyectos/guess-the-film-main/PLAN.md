# Emoji Movie Guess Mini-Game - Implementation Plan

## Problem Statement
Build an emoji-based movie guessing game where players see 3-5 emojis representing a movie plot and must guess the title. The game presents 5 random movies per session, validates answers with flexible regex matching (handling accents/diacritics), and shows a final score.

## Proposed Approach
- Create a modular component structure inside `src/components/EmojiGuess/`
- Store movie data (20+ popular Hollywood movies) in a separate data file
- Use React `useState` for state management (score, current question, game status)
- Implement text normalization for accent-insensitive matching
- Follow feature branch workflow with PRs for each logical area

## Project Structure
```
src/
├── components/
│   └── EmojiGuess/
│       ├── EmojiGuess.jsx          # Main container component
│       ├── EmojiGuess.css          # Main styles
│       ├── QuestionCard.jsx        # Displays emojis + input form
│       ├── QuestionCard.css
│       ├── GameOver.jsx            # Final score + play again
│       └── GameOver.css
├── data/
│   └── movies.js                   # Movie bank (20+ movies)
├── utils/
│   └── textUtils.js                # Normalization helper
├── App.jsx
└── App.css
```

---

## Workplan

### Phase 1: Repository Setup
- [x] Rename master branch to main locally and on remote
- [x] Update remote to new private repo `guess-the-film`
- [x] Update package.json name to `guess-the-film`

### Phase 2: Movie Data (`feat/movie-data`)
- [x] Create `src/data/movies.js` with 20+ movie objects
  - Each object: `id`, `emojis`, `title`, `regex`
  - Popular Hollywood movies (Titanic, Star Wars, Jaws, etc.)
- [x] Create `src/utils/textUtils.js` with normalization function
- [x] Commit, push, create PR, merge to main

### Phase 3: Game Components (`feat/game-components`)
- [x] Create folder structure `src/components/EmojiGuess/`
- [x] Implement `QuestionCard.jsx` + `QuestionCard.css`
  - Display emojis prominently
  - Text input + Submit button
  - Enter key submission support
  - Show success/failure feedback
  - "Next" button on incorrect answers
- [x] Implement `GameOver.jsx` + `GameOver.css`
  - Display final score (e.g., "3/5 Correct")
  - "Play Again" button
- [x] Commit, push, create PR, merge to main

### Phase 4: Game Logic (`feat/game-logic`)
- [x] Implement `EmojiGuess.jsx` + `EmojiGuess.css`
  - useState for: score, currentIndex, gameStatus, selectedMovies, feedback
  - On mount: select 5 random distinct movies
  - Handle answer submission with normalization + regex
  - Correct: show success, auto-advance after 1.5s
  - Incorrect: show correct title, wait for "Next" click
  - After 5 questions: show GameOver
  - "Play Again" resets state with new random selection
- [x] Integrate in `App.jsx`
- [x] Commit, push, create PR, merge to main

### Phase 5: Documentation (`docs/readme`)
- [x] Update README.md with:
  - Project description
  - How to play
  - Setup instructions
  - Available scripts
- [x] Commit, push, create PR, merge to main

---

## Technical Notes

### Movie Object Structure
```javascript
{
  id: 1,
  emojis: "🚢❄️💔",
  title: "Titanic",
  regex: /^titanic$/i
}
```

### Text Normalization
```javascript
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
```

### Git Workflow per Feature
1. `git checkout -b feat/branch-name`
2. Make changes, commit with conventional commits
3. `git push -u origin feat/branch-name`
4. Create PR on GitHub
5. Merge PR (merge strategy, not squash)
6. Delete remote branch
7. Locally: `git checkout main && git pull`

---

## Considerations
- Regex patterns should be flexible (e.g., "The Matrix" matches "matrix" or "the matrix")
- Auto-advance delay of 1.5s gives user time to see success message
- No external CSS frameworks - minimal custom CSS only
- Each component owns its CSS file
