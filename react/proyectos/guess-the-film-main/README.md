# 🎬 Guess the Film 🎬

An interactive emoji-based movie guessing game built with React. Test your movie knowledge by decoding emoji clues!

## 🎮 How to Play

1. You'll see 3-5 emojis representing a movie's plot
2. Type your answer in the input field and hit Enter or click Submit
3. Get instant feedback:
   - ✅ **Correct:** Auto-advances after 1.5 seconds
   - ❌ **Incorrect:** See the correct answer and click Next
4. Complete 5 questions to see your final score
5. Click "Play Again" to start a new round with different movies

## ✨ Features

- 🎲 **Random Selection:** Each game picks 5 movies from a bank of 25+ Hollywood classics
- 🔤 **Smart Matching:** Answers are validated with accent/diacritic normalization
- 📱 **Responsive UI:** Clean, minimal design that works on all devices
- ⌨️ **Keyboard Friendly:** Press Enter to submit answers quickly
- 🎨 **No Dependencies:** Pure CSS styling, no frameworks

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Lint

Check code quality:

```bash
npm run lint
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 7** (Rolldown variant) - Build tool
- **React Compiler** - Automatic optimization
- **ESLint** - Code quality

## 📁 Project Structure

```
src/
├── components/
│   └── EmojiGuess/
│       ├── EmojiGuess.jsx      # Main game container
│       ├── EmojiGuess.css
│       ├── QuestionCard.jsx    # Question display & input
│       ├── QuestionCard.css
│       ├── GameOver.jsx        # Final score screen
│       └── GameOver.css
├── data/
│   └── movies.js               # Movie bank (25+ movies)
├── utils/
│   └── textUtils.js            # Text normalization helper
├── App.jsx
├── App.css
└── main.jsx
```

## 🎯 Game Mechanics

- **Movie Bank:** 25+ popular Hollywood movies (Titanic, Star Wars, Jaws, etc.)
- **Session:** 5 random movies per game
- **Validation:** Regex-based with flexible matching (e.g., "matrix" matches "The Matrix")
- **Normalization:** Handles accented characters (é → e)
- **Scoring:** Track correct answers out of 5

## 📜 License

MIT

