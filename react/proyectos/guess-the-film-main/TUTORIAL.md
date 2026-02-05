# Tutorial: Creando un Juego de Adivinanzas de Películas con Emojis

## 📚 Introducción

En este tutorial aprenderás a crear un juego interactivo de adivinanzas de películas usando React. El juego muestra emojis que representan la trama de una película, y el jugador debe adivinar el título.

**Conceptos que aprenderás:**
- Gestión de estado con `useState`
- Efectos secundarios con `useEffect`
- Validación de formularios
- Normalización de texto
- Componentización en React
- Generación de selecciones aleatorias
- Expresiones regulares (regex)

**Tecnologías utilizadas:**
- React 19
- Vite 7
- JavaScript ES6+
- CSS puro

---

## 🎯 Estructura del Proyecto

```
src/
├── components/
│   └── EmojiGuess/
│       ├── EmojiGuess.jsx          # Componente contenedor principal
│       ├── EmojiGuess.css          # Estilos del contenedor
│       ├── QuestionCard.jsx        # Tarjeta de pregunta con input
│       ├── QuestionCard.css        # Estilos de la tarjeta
│       ├── GameOver.jsx            # Pantalla de fin de juego
│       └── GameOver.css            # Estilos de fin de juego
├── data/
│   └── movies.js                   # Banco de películas
├── utils/
│   └── textUtils.js                # Utilidad de normalización
├── App.jsx                         # Componente raíz
├── App.css                         # Estilos globales
└── main.jsx                        # Punto de entrada
```

---

## Paso 1: Crear el Banco de Datos de Películas

### 📝 Concepto: Estructura de Datos

Primero, necesitamos definir nuestras películas. Cada película debe tener:
- **id**: Identificador único
- **emojis**: String con 3-5 emojis representando la trama
- **title**: Nombre de la película
- **regex**: Expresión regular para validar respuestas flexibles

### 💻 Código: `src/data/movies.js`

```javascript
export const movies = [
  {
    id: 1,
    emojis: "🚢❄️💔",
    title: "Titanic",
    regex: /^(the\s+)?titanic$/i,
  },
  {
    id: 2,
    emojis: "🦁👑🌍",
    title: "The Lion King",
    regex: /^(the\s+)?lion\s+king$/i,
  },
  {
    id: 3,
    emojis: "⚡️👓🧙‍♂️",
    title: "Harry Potter",
    regex: /^harry\s+potter(\s+.*)?$/i,
  },
  {
    id: 4,
    emojis: "🦈🏖️😱",
    title: "Jaws",
    regex: /^jaws$/i,
  },
  {
    id: 5,
    emojis: "🌌⭐️🚀",
    title: "Star Wars",
    regex: /^star\s+wars(\s+.*)?$/i,
  },
  // ... más películas (mínimo 20+)
];
```

### 🔍 Explicación de las Regex

Las expresiones regulares permiten flexibilidad en las respuestas:

- `/^titanic$/i` → acepta "titanic", "TITANIC", "Titanic"
- `/^(the\s+)?titanic$/i` → acepta "titanic" o "the titanic"
- `/^harry\s+potter(\s+.*)?$/i` → acepta "harry potter" o "harry potter y..."
- La bandera `i` hace la búsqueda case-insensitive (ignora mayúsculas/minúsculas)

**Componentes de regex:**
- `^` → inicio de la cadena
- `$` → fin de la cadena
- `\s+` → uno o más espacios en blanco
- `?` → el grupo anterior es opcional
- `.*` → cualquier carácter, cero o más veces
- `()` → grupo de captura

---

## Paso 2: Crear la Utilidad de Normalización de Texto

### 📝 Concepto: Normalización Unicode

Los usuarios pueden escribir con acentos (é, ñ, ü). Necesitamos normalizar el texto para que "Amélie" sea aceptado como "Amelie".

### 💻 Código: `src/utils/textUtils.js`

```javascript
/**
 * Normaliza texto removiendo acentos/diacríticos y espacios extra
 * @param {string} text - El texto a normalizar
 * @returns {string} - Texto normalizado
 */
export function normalizeText(text) {
  return text
    .normalize("NFD")           // Descompone caracteres (é → e + ´)
    .replace(/[\u0300-\u036f]/g, "")  // Elimina diacríticos
    .trim()                     // Elimina espacios al inicio/fin
    .toLowerCase();             // Convierte a minúsculas
}
```

### 🔍 Explicación del Proceso

1. **`normalize("NFD")`**: Descomposición canónica Unicode
   - "é" se convierte en "e" + marca de acento combinada
   - "ñ" se convierte en "n" + tilde

2. **`replace(/[\u0300-\u036f]/g, "")`**: Elimina marcas diacríticas
   - Rango Unicode U+0300 a U+036F contiene marcas combinadas
   - La bandera `g` (global) elimina todas las ocurrencias

3. **`trim()`**: Elimina espacios en blanco al inicio y final

4. **`toLowerCase()`**: Convierte todo a minúsculas

**Ejemplo de transformación:**
```
"  Amélie  " → "amelie"
"TITANIC" → "titanic"
"The Matrix" → "the matrix"
```

---

## Paso 3: Crear el Componente QuestionCard

### 📝 Concepto: Componente Controlado con Formulario

Este componente maneja la entrada del usuario y muestra feedback visual.

### 💻 Código: `src/components/EmojiGuess/QuestionCard.jsx`

```javascript
import { useState } from "react";
import "./QuestionCard.css";

function QuestionCard({ movie, onAnswer, showFeedback, isCorrect, nextQuestion }) {
  // Estado local para el input
  const [answer, setAnswer] = useState("");

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Previene recarga de página
    if (answer.trim()) {
      onAnswer(answer);  // Envía respuesta al padre
      setAnswer("");     // Limpia el input
    }
  };

  return (
    <div className="question-card">
      {/* Muestra los emojis prominentemente */}
      <div className="emojis">{movie.emojis}</div>
      
      {/* Condicional: muestra formulario O feedback */}
      {!showFeedback ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Ingresa el título de la película..."
            className="answer-input"
            autoFocus
          />
          <button type="submit" className="submit-btn">
            Enviar
          </button>
        </form>
      ) : (
        <div className="feedback">
          {isCorrect ? (
            <div className="success">
              <p>✅ ¡Correcto!</p>
            </div>
          ) : (
            <div className="failure">
              <p>❌ Incorrecto</p>
              <p className="correct-answer">
                La respuesta era: <strong>{movie.title}</strong>
              </p>
              <button onClick={nextQuestion} className="next-btn">
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
```

### 🔍 Explicación de Conceptos Clave

#### 1. **Componente Controlado**
```javascript
const [answer, setAnswer] = useState("");

<input
  value={answer}
  onChange={(e) => setAnswer(e.target.value)}
/>
```
- El valor del input está controlado por el estado de React
- Cada cambio actualiza el estado
- React es la "única fuente de verdad"

#### 2. **Prevención de Comportamiento por Defecto**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();  // Evita que el formulario recargue la página
  // ...
}
```

#### 3. **Renderizado Condicional**
```javascript
{!showFeedback ? (
  <form>...</form>
) : (
  <div className="feedback">...</div>
)}
```
- Muestra el formulario SOLO si no hay feedback
- Muestra feedback SOLO después de responder

#### 4. **Props (Propiedades)**
```javascript
function QuestionCard({ movie, onAnswer, showFeedback, isCorrect, nextQuestion }) {
  // movie: objeto con emojis y título
  // onAnswer: función callback para enviar respuesta
  // showFeedback: booleano para mostrar/ocultar feedback
  // isCorrect: booleano indicando si la respuesta fue correcta
  // nextQuestion: función para avanzar a la siguiente pregunta
}
```

---

## Paso 4: Estilar el Componente QuestionCard

### 💻 Código: `src/components/EmojiGuess/QuestionCard.css`

```css
.question-card {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.emojis {
  font-size: 4rem;        /* Emojis grandes y prominentes */
  margin-bottom: 2rem;
  line-height: 1.2;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.answer-input:focus {
  border-color: #4a90e2;  /* Borde azul al enfocarse */
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #357abd;    /* Oscurece al hacer hover */
}

/* Estilos para feedback exitoso */
.success p {
  font-size: 1.5rem;
  color: #28a745;
  font-weight: 600;
}

/* Estilos para feedback de error */
.failure p:first-child {
  color: #dc3545;
  font-weight: 600;
}

.correct-answer strong {
  color: #4a90e2;
}

.next-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #6c757d;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.next-btn:hover {
  background: #5a6268;
}
```

### 🎨 Conceptos de CSS Utilizados

- **Flexbox**: `display: flex` para organizar elementos
- **Box Shadow**: Sombra sutil para dar profundidad
- **Transitions**: Animaciones suaves en hover
- **Pseudo-clases**: `:hover`, `:focus`
- **Pseudo-selectores**: `:first-child`

---

## Paso 5: Crear el Componente GameOver

### 📝 Concepto: Componente de Presentación

Este componente solo muestra información, no maneja estado interno.

### 💻 Código: `src/components/EmojiGuess/GameOver.jsx`

```javascript
import "./GameOver.css";

function GameOver({ score, totalQuestions, onPlayAgain }) {
  return (
    <div className="game-over">
      <h1>🎬 ¡Juego Terminado! 🎬</h1>
      <div className="final-score">
        <p className="score-text">Tu Puntuación:</p>
        <p className="score-number">{score}/{totalQuestions}</p>
        <p className="score-label">Correctas</p>
      </div>
      <button onClick={onPlayAgain} className="play-again-btn">
        Jugar de Nuevo
      </button>
    </div>
  );
}

export default GameOver;
```

### 💻 Código: `src/components/EmojiGuess/GameOver.css`

```css
.game-over {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.game-over h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.final-score {
  margin: 2rem 0;
}

.score-number {
  font-size: 4rem;         /* Número grande y destacado */
  font-weight: 700;
  color: #4a90e2;
  margin: 0.5rem 0;
}

.play-again-btn {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  background: #28a745;     /* Verde para acción positiva */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.play-again-btn:hover {
  background: #218838;
}
```

---

## Paso 6: Crear el Componente Principal EmojiGuess

### 📝 Concepto: Gestión de Estado y Lógica del Juego

Este es el componente más complejo. Maneja toda la lógica del juego.

### 💻 Código: `src/components/EmojiGuess/EmojiGuess.jsx`

```javascript
import { useState, useEffect } from "react";
import { movies } from "../../data/movies";
import { normalizeText } from "../../utils/textUtils";
import QuestionCard from "./QuestionCard";
import GameOver from "./GameOver";
import "./EmojiGuess.css";

function EmojiGuess() {
  // ============= ESTADO DEL JUEGO =============
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // ============= FUNCIÓN: SELECCIÓN ALEATORIA =============
  const selectRandomMovies = () => {
    // Copia del array original
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    // Toma las primeras 5
    return shuffled.slice(0, 5);
  };

  // ============= EFECTO: INICIALIZACIÓN =============
  useEffect(() => {
    setSelectedMovies(selectRandomMovies());
  }, []); // Array vacío = ejecuta solo al montar

  // ============= MANEJADOR: VALIDAR RESPUESTA =============
  const handleAnswer = (answer) => {
    const currentMovie = selectedMovies[currentIndex];
    const normalizedAnswer = normalizeText(answer);
    const correct = currentMovie.regex.test(normalizedAnswer);

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      // Auto-avance después de 1.5 segundos
      setTimeout(() => {
        moveToNext();
      }, 1500);
    }
  };

  // ============= FUNCIÓN: AVANZAR A LA SIGUIENTE =============
  const moveToNext = () => {
    setShowFeedback(false);
    setIsCorrect(false);

    if (currentIndex + 1 < selectedMovies.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameStatus("finished");
    }
  };

  // ============= MANEJADOR: REINICIAR JUEGO =============
  const handlePlayAgain = () => {
    setSelectedMovies(selectRandomMovies());
    setCurrentIndex(0);
    setScore(0);
    setGameStatus("playing");
    setShowFeedback(false);
    setIsCorrect(false);
  };

  // ============= RENDERIZADO CONDICIONAL =============
  
  // Estado de carga
  if (selectedMovies.length === 0) {
    return <div className="loading">Cargando...</div>;
  }

  // Juego terminado
  if (gameStatus === "finished") {
    return (
      <GameOver
        score={score}
        totalQuestions={5}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  // Jugando
  return (
    <div className="emoji-guess">
      <div className="header">
        <h1>🎬 ¡Adivina la Película! 🎬</h1>
        <div className="progress">
          Pregunta {currentIndex + 1} de {selectedMovies.length} | Puntuación: {score}
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
```

### 🔍 Explicación Detallada de Conceptos

#### 1. **useState - Gestión de Estado**

```javascript
const [selectedMovies, setSelectedMovies] = useState([]);
```
- `selectedMovies`: valor actual del estado
- `setSelectedMovies`: función para actualizar el estado
- `[]`: valor inicial (array vacío)

**Estados que manejamos:**
- `selectedMovies`: Las 5 películas de la ronda actual
- `currentIndex`: Índice de la pregunta actual (0-4)
- `score`: Número de respuestas correctas
- `gameStatus`: "playing" o "finished"
- `showFeedback`: true cuando se muestra feedback
- `isCorrect`: true si la última respuesta fue correcta

#### 2. **useEffect - Efectos Secundarios**

```javascript
useEffect(() => {
  setSelectedMovies(selectRandomMovies());
}, []);
```
- Se ejecuta después del primer renderizado
- El array vacío `[]` significa "ejecutar solo una vez"
- Útil para inicialización, llamadas API, suscripciones

#### 3. **Algoritmo de Fisher-Yates (Shuffle)**

```javascript
const shuffled = [...movies].sort(() => Math.random() - 0.5);
```
- `[...movies]`: Crea una copia del array (no muta el original)
- `Math.random() - 0.5`: Genera números aleatorios entre -0.5 y 0.5
- `sort()` con función comparadora aleatoria mezcla el array

**Nota**: Para producción, Fisher-Yates real es más robusto, pero esto funciona bien para nuestro caso.

#### 4. **setTimeout - Temporizador**

```javascript
setTimeout(() => {
  moveToNext();
}, 1500);
```
- Ejecuta `moveToNext()` después de 1500ms (1.5 segundos)
- Permite al usuario ver el mensaje de éxito antes de avanzar

#### 5. **Validación con Regex**

```javascript
const normalizedAnswer = normalizeText(answer);
const correct = currentMovie.regex.test(normalizedAnswer);
```
- Primero normalizamos la respuesta
- `regex.test(string)` devuelve `true` si coincide, `false` si no

#### 6. **Renderizado Condicional con Múltiples Retornos**

```javascript
if (selectedMovies.length === 0) {
  return <div>Cargando...</div>;
}

if (gameStatus === "finished") {
  return <GameOver ... />;
}

return <div>Juego principal...</div>;
```
- Cada condición puede retornar un JSX diferente
- El primer `return` que se ejecute termina la función

---

## Paso 7: Estilar el Componente Principal

### 💻 Código: `src/components/EmojiGuess/EmojiGuess.css`

```css
.emoji-guess {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.progress {
  font-size: 1.125rem;
  color: #666;
  font-weight: 500;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
}
```

---

## Paso 8: Integrar en App.jsx

### 💻 Código: `src/App.jsx`

```javascript
import EmojiGuess from "./components/EmojiGuess/EmojiGuess";
import "./App.css";

function App() {
  return <EmojiGuess />;
}

export default App;
```

### 💻 Código: `src/App.css`

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#root {
  padding: 2rem 1rem;
}
```

### 🎨 Explicación del Gradiente

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- `135deg`: Ángulo diagonal (de esquina superior izquierda a inferior derecha)
- `#667eea`: Color inicial (azul-violeta)
- `#764ba2`: Color final (violeta-púrpura)
- Crea un fondo atractivo y moderno

---

## 📊 Flujo de Datos del Juego

```
INICIO
  ↓
useEffect: Selecciona 5 películas aleatorias
  ↓
Muestra pregunta 1 (emojis + input)
  ↓
Usuario ingresa respuesta → handleAnswer()
  ↓
Normaliza texto → Valida con regex
  ↓
¿Correcto?
  ├─ SÍ → Incrementa score → Auto-avanza en 1.5s
  └─ NO → Muestra respuesta correcta → Espera clic en "Siguiente"
  ↓
moveToNext()
  ↓
¿Hay más preguntas?
  ├─ SÍ → Muestra siguiente pregunta
  └─ NO → gameStatus = "finished"
  ↓
Muestra GameOver con score final
  ↓
Clic en "Jugar de Nuevo" → handlePlayAgain()
  ↓
Reinicia todo el estado → Vuelve a INICIO
```

---

## 🧪 Cómo Probar el Juego

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

### 3. Abrir en el Navegador
Visita la URL mostrada (generalmente `http://localhost:5173`)

### 4. Casos de Prueba

**Prueba respuestas correctas:**
- Para 🚢❄️💔 → escribe "titanic" o "Titanic" o "THE TITANIC"

**Prueba acentos:**
- Si agregas una película como "Amélie"
- Escribe "amelie" (sin acento) → debe ser aceptada

**Prueba respuestas incorrectas:**
- Escribe una respuesta equivocada
- Verifica que aparece el botón "Siguiente"

**Prueba el flujo completo:**
- Responde las 5 preguntas
- Verifica que aparece la pantalla de Game Over
- Haz clic en "Jugar de Nuevo"
- Verifica que las películas son diferentes

---

## 🎓 Conceptos Avanzados Aplicados

### 1. **Inmutabilidad**
```javascript
// ❌ INCORRECTO - Muta el estado directamente
selectedMovies.push(newMovie);

// ✅ CORRECTO - Crea un nuevo array
setSelectedMovies([...selectedMovies, newMovie]);
```

### 2. **Lifting State Up (Elevar el Estado)**
- El estado está en `EmojiGuess` (padre)
- Los componentes hijos (`QuestionCard`, `GameOver`) reciben props
- Los hijos comunican cambios vía callbacks (`onAnswer`, `onPlayAgain`)

### 3. **Componentes Controlados vs No Controlados**
```javascript
// Controlado: React controla el valor
<input value={answer} onChange={e => setAnswer(e.target.value)} />

// No controlado: DOM controla el valor (evitar en React)
<input ref={inputRef} />
```

### 4. **Event Pooling (hasta React 16)**
En React 17+, `e.preventDefault()` funciona de forma síncrona sin problemas.

### 5. **Closure en Callbacks**
```javascript
setTimeout(() => {
  moveToNext(); // Tiene acceso a moveToNext por closure
}, 1500);
```

---

## 🚀 Mejoras Posibles (Ejercicios)

### 1. **Sistema de Vidas**
```javascript
const [lives, setLives] = useState(3);

// En handleAnswer:
if (!correct) {
  setLives(lives - 1);
  if (lives - 1 === 0) {
    setGameStatus("gameover");
  }
}
```

### 2. **Niveles de Dificultad**
```javascript
const difficulties = {
  easy: movies.filter(m => m.difficulty === "easy"),
  hard: movies.filter(m => m.difficulty === "hard"),
};

const [difficulty, setDifficulty] = useState("easy");
```

### 3. **Timer por Pregunta**
```javascript
const [timeLeft, setTimeLeft] = useState(30);

useEffect(() => {
  if (timeLeft === 0) {
    handleAnswer(""); // Respuesta incorrecta automática
  }
  const timer = setInterval(() => {
    setTimeLeft(t => t - 1);
  }, 1000);
  return () => clearInterval(timer); // Limpieza
}, [timeLeft]);
```

### 4. **Almacenamiento de High Score**
```javascript
// Guardar en localStorage
const saveHighScore = (score) => {
  localStorage.setItem("highScore", score.toString());
};

// Leer en useEffect
useEffect(() => {
  const saved = localStorage.getItem("highScore");
  setHighScore(saved ? parseInt(saved) : 0);
}, []);
```

### 5. **Animaciones con CSS**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.question-card {
  animation: fadeIn 0.3s ease-out;
}
```

---

## 🐛 Solución de Problemas Comunes

### Problema 1: Las películas no cambian al reiniciar
```javascript
// Asegúrate de crear un NUEVO array
const selectRandomMovies = () => {
  const shuffled = [...movies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};
```

### Problema 2: El input no se limpia después de responder
```javascript
// En handleAnswer (en QuestionCard):
onAnswer(answer);
setAnswer("");  // ← No olvides esto
```

### Problema 3: Auto-avance no funciona
```javascript
// Verifica que setTimeout está dentro del if (correct)
if (correct) {
  setScore(score + 1);
  setTimeout(() => {
    moveToNext();
  }, 1500);
}
```

### Problema 4: Regex no acepta la respuesta correcta
```javascript
// Prueba tu regex en la consola:
const regex = /^titanic$/i;
console.log(regex.test("titanic"));     // true
console.log(regex.test("the titanic")); // false

// Agrega el grupo opcional:
const regex = /^(the\s+)?titanic$/i;
console.log(regex.test("the titanic")); // true
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [React Docs](https://react.dev)
- [JavaScript MDN](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Regex Tutorial](https://regexr.com/)

### Herramientas
- [Emoji Picker](https://emojipedia.org/)
- [Regex Tester](https://regex101.com/)
- [CSS Gradient Generator](https://cssgradient.io/)

### Conceptos para Seguir Aprendiendo
- Context API (para evitar prop drilling)
- Custom Hooks (extraer lógica reutilizable)
- React Router (navegación entre páginas)
- TypeScript (tipado estático)
- Testing con Jest y React Testing Library

---

## ✅ Checklist de Finalización

- [ ] El juego carga 5 películas aleatorias
- [ ] Los emojis se muestran claramente
- [ ] El input acepta texto y se puede enviar con Enter
- [ ] Las respuestas se validan correctamente (case-insensitive)
- [ ] Los acentos se normalizan correctamente
- [ ] Las respuestas correctas auto-avanzan en 1.5s
- [ ] Las respuestas incorrectas muestran la solución
- [ ] El botón "Siguiente" avanza manualmente
- [ ] Después de 5 preguntas aparece Game Over
- [ ] La puntuación final se muestra correctamente
- [ ] "Jugar de Nuevo" reinicia con películas diferentes
- [ ] El diseño es responsivo y se ve bien en móvil
- [ ] No hay errores en la consola del navegador

---

## 🎉 ¡Felicidades!

Has creado un juego completo de React con:
- ✅ Gestión de estado con hooks
- ✅ Componentes reutilizables
- ✅ Validación de formularios
- ✅ Manipulación de arrays
- ✅ Expresiones regulares
- ✅ Normalización de texto
- ✅ CSS moderno
- ✅ Buenas prácticas de React

**Próximos pasos sugeridos:**
1. Agrega más películas al banco de datos
2. Implementa alguna de las mejoras propuestas
3. Despliega tu juego en Vercel o Netlify
4. Comparte tu proyecto en GitHub

---

## 📝 Notas del Autor

Este tutorial fue diseñado para ser didáctico y progresivo. Cada concepto se explica en detalle antes de aplicarse. Si tienes dudas:

1. Revisa la sección de "Explicación de Conceptos"
2. Consulta la documentación oficial de React
3. Experimenta modificando el código
4. Usa `console.log()` para depurar

**Recuerda**: La mejor forma de aprender es practicando. ¡No tengas miedo de romper cosas y experimentar!

---

**Versión del tutorial:** 1.0  
**Última actualización:** Febrero 2026  
**Autor:** Tutorial Emoji Movie Guess Game
