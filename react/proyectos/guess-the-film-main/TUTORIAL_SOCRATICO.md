# Tutorial: Creando un Juego de Adivinanzas de Películas con Emojis

## 📚 Introducción

En este tutorial aprenderás a crear un juego interactivo de adivinanzas de películas usando React. Pero no te voy a dar el código directamente - vamos a **pensar juntos** cada problema y construir la solución paso a paso.

**¿Qué vamos a construir?**
Un juego donde el usuario ve emojis (🚢❄️💔) y debe adivinar qué película representan.

**Metodología:**
- Primero identificaremos el problema
- Pensaremos en posibles soluciones
- Veremos ejemplos pequeños de los conceptos necesarios
- Luego tú implementarás tu versión

---

## 🎯 Estructura del Proyecto

Antes de empezar, crea esta estructura de carpetas:

```
src/
├── components/
│   └── EmojiGuess/
├── data/
├── utils/
└── (archivos existentes: App.jsx, main.jsx, etc.)
```

---

## Paso 1: Pensando en los Datos

### 🤔 Problema

Necesitamos un banco de películas. Cada película debe tener:
- Los emojis que la representan
- El título correcto
- Una forma de validar si la respuesta del usuario es correcta

### 💡 Preguntas para ti

1. ¿Qué estructura de datos usarías para almacenar 20+ películas?
2. ¿Cómo validarías si "titanic", "Titanic" y "THE TITANIC" son todas correctas?
3. ¿Y si el usuario escribe "the titanic" o solo "titanic"?

### 📖 Conceptos Pequeños: Arrays de Objetos

```javascript
// Ejemplo simple: lista de frutas
const frutas = [
  { id: 1, nombre: "Manzana", color: "roja" },
  { id: 2, nombre: "Banana", color: "amarilla" }
];

// Podemos acceder así:
console.log(frutas[0].nombre); // "Manzana"
```

### 📖 Conceptos Pequeños: Expresiones Regulares Básicas

```javascript
// Regex simple: acepta "hola" (case-insensitive)
const regex1 = /^hola$/i;
console.log(regex1.test("hola"));  // true
console.log(regex1.test("HOLA"));  // true
console.log(regex1.test("adios")); // false

// Regex con opcional: acepta "casa" o "la casa"
const regex2 = /^(la\s+)?casa$/i;
console.log(regex2.test("casa"));    // true
console.log(regex2.test("la casa")); // true

// \s+ = uno o más espacios
// ? = el grupo anterior es opcional
// ^ = inicio, $ = final, i = case-insensitive
```

### ✍️ Tu Turno

**Crea el archivo:** `src/data/movies.js`

**Piensa:**
- ¿Cómo estructurarías UN objeto de película?
- ¿Qué regex usarías para "Star Wars" que acepte también "star wars" y "the star wars"?

**Pista:** Exporta un array llamado `movies` con al menos 5 películas.

```javascript
// Estructura sugerida (completa tú):
export const movies = [
  {
    id: 1,
    emojis: "🚢❄️💔",
    title: "Titanic",
    regex: /^(???)titanic$/i,  // ← ¿Qué va en los ???
  },
  // ... tus películas aquí
];
```

---

## Paso 2: Pensando en la Normalización de Texto

### 🤔 Problema

Si una película se llama "Amélie", ¿cómo aceptamos que el usuario escriba "amelie" (sin acento)?

```
"Amélie" → debería aceptar → "amelie"
"TITANIC" → debería aceptar → "titanic"
"  Frozen  " → debería aceptar → "frozen"
```

### 💡 Pregunta para ti

¿Qué transformaciones necesitamos hacer a cualquier texto antes de compararlo?

### 📖 Conceptos Pequeños: String Methods

```javascript
// trim() - elimina espacios al inicio/fin
"  hola  ".trim();  // "hola"

// toLowerCase() - convierte a minúsculas
"HOLA".toLowerCase();  // "hola"

// Podemos encadenar métodos:
"  HOLA  ".trim().toLowerCase();  // "hola"
```

### 📖 Conceptos Pequeños: Normalización Unicode

JavaScript tiene un método mágico para lidiar con acentos:

```javascript
// normalize("NFD") descompone caracteres
"é".normalize("NFD");  // "e" + marca de acento (invisible)

// Luego eliminamos las marcas con regex:
"é".normalize("NFD").replace(/[\u0300-\u036f]/g, "");  // "e"

// Ejemplo completo:
const texto = "Amélie";
const normalizado = texto
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();
console.log(normalizado);  // "amelie"
```

### ✍️ Tu Turno

**Crea el archivo:** `src/utils/textUtils.js`

**Tu tarea:**
Crea una función `normalizeText(text)` que:
1. Elimine acentos
2. Convierta a minúsculas
3. Elimine espacios extra al inicio/final

```javascript
// Esqueleto para ayudarte:
export function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/* ¿qué va aquí? */)
    .???()  // ← método para eliminar espacios
    .???(); // ← método para minúsculas
}

// Prueba:
// normalizeText("  AMÉLIE  ") debería devolver "amelie"
```

---

## Paso 3: Pensando en el Componente de Pregunta

### 🤔 Problema

Necesitamos un componente que:
1. Muestre los emojis grandes
2. Tenga un input para que el usuario escriba
3. Tenga un botón "Enviar"
4. Después de responder, muestre si fue correcto o incorrecto

### 💡 Preguntas para ti

1. ¿Cómo guardamos lo que el usuario va escribiendo en el input?
2. ¿Cómo evitamos que el formulario recargue la página al hacer submit?
3. ¿Cómo mostramos SOLO el formulario antes de responder y SOLO el feedback después?

### 📖 Conceptos Pequeños: useState para Inputs

```javascript
import { useState } from "react";

function MiFormulario() {
  // Estado para guardar el valor del input
  const [texto, setTexto] = useState("");

  return (
    <input
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
    />
    // Ahora 'texto' siempre tiene el valor actual del input
  );
}
```

### 📖 Conceptos Pequeños: preventDefault

```javascript
function MiFormulario() {
  const handleSubmit = (e) => {
    e.preventDefault();  // ← Evita que la página se recargue
    console.log("Formulario enviado!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### 📖 Conceptos Pequeños: Renderizado Condicional

```javascript
function Mensaje({ mostrarSaludo }) {
  return (
    <div>
      {mostrarSaludo ? (
        <p>¡Hola!</p>
      ) : (
        <p>Adiós</p>
      )}
    </div>
  );
}

// <Mensaje mostrarSaludo={true} />  → muestra "¡Hola!"
// <Mensaje mostrarSaludo={false} /> → muestra "Adiós"
```

### ✍️ Tu Turno

**Crea:** `src/components/EmojiGuess/QuestionCard.jsx` y `QuestionCard.css`

**Piensa en el flujo:**
1. El componente recibe props: `movie`, `onAnswer`, `showFeedback`, `isCorrect`, `nextQuestion`
2. Tiene estado local para el input: `answer`
3. Cuando el usuario envía el formulario → llama a `onAnswer(answer)`
4. Muestra el formulario SI `showFeedback` es false
5. Muestra el feedback SI `showFeedback` es true

**Estructura base (completa tú):**

```javascript
import { useState } from "react";
import "./QuestionCard.css";

function QuestionCard({ movie, onAnswer, showFeedback, isCorrect, nextQuestion }) {
  const [answer, setAnswer] = useState(/* ¿valor inicial? */);

  const handleSubmit = (e) => {
    // ¿Qué va aquí?
    // 1. Prevenir recarga
    // 2. Si hay texto, llamar a onAnswer
    // 3. Limpiar el input
  };

  return (
    <div className="question-card">
      <div className="emojis">{movie.emojis}</div>
      
      {/* ¿Cómo hacer el condicional? */}
      {!showFeedback ? (
        <form onSubmit={handleSubmit}>
          {/* Input controlado aquí */}
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <div className="feedback">
          {/* Otro condicional: ¿correcto o incorrecto? */}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
```

**Para el CSS:** Haz que los emojis sean grandes (font-size: 4rem) y el formulario esté centrado.

---

## Paso 4: Pensando en el Componente Game Over

### 🤔 Problema

Al terminar el juego, necesitamos mostrar:
- El puntaje final (ej: "3/5")
- Un botón para jugar de nuevo

### 💡 Pregunta para ti

¿Este componente necesita estado interno o solo recibe datos de su padre?

### 📖 Conceptos Pequeños: Componentes de Presentación

```javascript
// Componente que SOLO muestra datos, no tiene lógica:
function Tarjeta({ titulo, descripcion }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
}

// Uso:
// <Tarjeta titulo="Hola" descripcion="Mundo" />
```

### ✍️ Tu Turno

**Crea:** `src/components/EmojiGuess/GameOver.jsx` y `GameOver.css`

**Props que necesita:**
- `score`: número de respuestas correctas
- `totalQuestions`: número total (5)
- `onPlayAgain`: función a llamar cuando se haga clic en "Jugar de Nuevo"

```javascript
import "./GameOver.css";

function GameOver({ score, totalQuestions, onPlayAgain }) {
  return (
    <div className="game-over">
      {/* Diseña tú la estructura */}
      {/* Recuerda: el score debe ser grande y destacado */}
      {/* El botón debe llamar a onPlayAgain cuando se haga clic */}
    </div>
  );
}
```

---

## Paso 5: Pensando en la Lógica del Juego

### 🤔 Problema

El componente principal (`EmojiGuess`) debe:
1. Seleccionar 5 películas aleatorias al inicio
2. Mostrar una pregunta a la vez
3. Validar respuestas
4. Llevar el puntaje
5. Avanzar a la siguiente pregunta
6. Mostrar Game Over al final

### 💡 Preguntas para ti

1. ¿Cuántos estados necesitamos? (puntaje, pregunta actual, películas seleccionadas...)
2. ¿Cómo seleccionamos 5 películas aleatorias?
3. ¿Cuándo auto-avanzamos (correcto) vs esperar clic (incorrecto)?
4. ¿Cómo sabemos si el juego terminó?

### 📖 Conceptos Pequeños: Múltiples useState

```javascript
function Contador() {
  const [count, setCount] = useState(0);
  const [nombre, setNombre] = useState("");
  const [activo, setActivo] = useState(true);
  
  // Puedes tener tantos estados como necesites
}
```

### 📖 Conceptos Pequeños: useEffect para Inicialización

```javascript
import { useEffect } from "react";

function MiComponente() {
  useEffect(() => {
    console.log("¡Esto se ejecuta UNA VEZ al montar!");
    // Perfecto para cargar datos iniciales
  }, []); // ← Array vacío = solo al montar

  return <div>Hola</div>;
}
```

### 📖 Conceptos Pequeños: Seleccionar Aleatorios

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Mezclar array:
const mezclados = [...numeros].sort(() => Math.random() - 0.5);

// Tomar solo 3:
const seleccionados = mezclados.slice(0, 3);

console.log(seleccionados); // Ej: [7, 2, 9]
```

### 📖 Conceptos Pequeños: setTimeout

```javascript
function saludar() {
  console.log("¡Hola!");
  
  setTimeout(() => {
    console.log("¡Esto aparece 2 segundos después!");
  }, 2000);
}
```

### ✍️ Tu Turno

**Crea:** `src/components/EmojiGuess/EmojiGuess.jsx` y `EmojiGuess.css`

**Piensa en los estados que necesitas:**

```javascript
import { useState, useEffect } from "react";
import { movies } from "../../data/movies";
import { normalizeText } from "../../utils/textUtils";
import QuestionCard from "./QuestionCard";
import GameOver from "./GameOver";

function EmojiGuess() {
  // ¿Qué estados necesitas?
  // - Las 5 películas seleccionadas: useState([])
  // - Índice de pregunta actual: useState(0)
  // - Puntaje: useState(0)
  // - Estado del juego ("playing" o "finished"): useState("playing")
  // - Mostrar feedback: useState(false)
  // - Es correcta la respuesta: useState(false)

  // Función para seleccionar 5 aleatorias
  const selectRandomMovies = () => {
    // ¿Cómo la implementas?
  };

  // useEffect para seleccionar películas al inicio
  useEffect(() => {
    // ¿Qué va aquí?
  }, []);

  // Función cuando el usuario responde
  const handleAnswer = (answer) => {
    // 1. Obtener la película actual
    // 2. Normalizar la respuesta del usuario
    // 3. Validar con regex
    // 4. Actualizar estados (isCorrect, showFeedback)
    // 5. Si es correcto: incrementar score y setTimeout para auto-avanzar
  };

  // Función para avanzar a la siguiente
  const moveToNext = () => {
    // 1. Resetear showFeedback e isCorrect
    // 2. Si hay más preguntas: incrementar índice
    // 3. Si no: cambiar gameStatus a "finished"
  };

  // Función para reiniciar
  const handlePlayAgain = () => {
    // Resetear todos los estados
  };

  // Renderizado condicional:
  if (selectedMovies.length === 0) {
    return <div>Cargando...</div>;
  }

  if (gameStatus === "finished") {
    return <GameOver /* props */ />;
  }

  return (
    <div className="emoji-guess">
      {/* Header con título y progreso */}
      <QuestionCard /* props */ />
    </div>
  );
}
```

**Pistas importantes:**
- Para validar: `currentMovie.regex.test(normalizedAnswer)`
- Para auto-avance: `setTimeout(() => moveToNext(), 1500)`
- Para avanzar manualmente: el botón "Siguiente" llama a `moveToNext`

---

## Paso 6: Integrar Todo en App

### ✍️ Tu Turno

**Modifica:** `src/App.jsx`

```javascript
import EmojiGuess from "./components/EmojiGuess/EmojiGuess";
import "./App.css";

function App() {
  return <EmojiGuess />;
}

export default App;
```

**Modifica:** `src/App.css`

Agrega un fondo con gradiente y padding:

```css
body {
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: system-ui, sans-serif;
}

#root {
  padding: 2rem 1rem;
}
```

---

## 🧪 Prueba tu Juego

```bash
npm install
npm run dev
```

### Checklist de Funcionalidad

- [ ] Se cargan 5 películas aleatorias al inicio
- [ ] Los emojis se ven grandes y claros
- [ ] Puedo escribir en el input
- [ ] Puedo enviar con Enter o con el botón
- [ ] Si acierto: veo "✅ Correcto" y avanza solo en 1.5s
- [ ] Si fallo: veo "❌ Incorrecto", la respuesta correcta, y un botón "Siguiente"
- [ ] El puntaje se actualiza correctamente
- [ ] Después de 5 preguntas: veo Game Over con mi puntaje
- [ ] "Jugar de Nuevo" funciona y carga películas diferentes

---

## 🎓 Retos Adicionales (Después de terminar)

### Reto 1: Sistema de Vidas
El juego termina si fallas 3 veces.

**Pista:** Agrega un estado `lives` y decrémentalo en cada error.

### Reto 2: Timer por Pregunta
Tienes 30 segundos para responder cada pregunta.

**Pista:** Usa `useEffect` con `setInterval` y limpia con `clearInterval`.

### Reto 3: Niveles de Dificultad
Agrega dificultad "fácil" (películas muy conocidas) y "difícil" (menos conocidas).

**Pista:** Agrega una propiedad `difficulty` a cada película y filtra antes de seleccionar.

### Reto 4: High Score en localStorage
Guarda el mejor puntaje del jugador.

**Pista:**
```javascript
// Guardar:
localStorage.setItem("highScore", score.toString());

// Leer:
const saved = localStorage.getItem("highScore");
```

---

## 🐛 Depuración: Problemas Comunes

### "Mi componente no se actualiza"
```javascript
// ❌ Nunca hagas esto:
miEstado.push(nuevoValor);

// ✅ Siempre crea un NUEVO array/objeto:
setMiEstado([...miEstado, nuevoValor]);
```

### "El formulario recarga la página"
```javascript
// Asegúrate de tener:
const handleSubmit = (e) => {
  e.preventDefault(); // ← ¡Esto es esencial!
  // ...
};
```

### "No puedo depurar"
```javascript
// Usa console.log liberalmente:
const handleAnswer = (answer) => {
  console.log("Respuesta del usuario:", answer);
  const normalizado = normalizeText(answer);
  console.log("Normalizado:", normalizado);
  const correcto = regex.test(normalizado);
  console.log("¿Es correcto?", correcto);
};
```

---

## 📚 Conceptos Clave que Aprendiste

Si terminaste el tutorial, ahora sabes:

✅ **useState** - Gestionar estado local en componentes  
✅ **useEffect** - Ejecutar código cuando el componente se monta  
✅ **Props** - Pasar datos de padres a hijos  
✅ **Callbacks** - Pasar funciones como props  
✅ **Componentes Controlados** - Inputs manejados por React  
✅ **Renderizado Condicional** - Mostrar diferentes UIs según el estado  
✅ **Inmutabilidad** - No mutar el estado directamente  
✅ **Regex** - Validación de texto flexible  
✅ **Array methods** - map, filter, slice, sort  
✅ **Normalización Unicode** - Manejar acentos  

---

## 🎉 ¡Felicidades!

No solo copiaste código - **pensaste en los problemas** y construiste las soluciones. Eso es lo que hacen los programadores reales.

### Próximos Pasos

1. **Modifica** - Cambia colores, agrega más películas, experimenta
2. **Rompe** - Elimina líneas de código y ve qué pasa (aprenderás mucho)
3. **Expande** - Implementa alguno de los retos adicionales
4. **Comparte** - Sube tu proyecto a GitHub

**Recuerda:** La mejor forma de aprender es **haciendo**, no leyendo.

---

**Versión:** 2.0 - Tutorial Socrático  
**Última actualización:** Febrero 2026
