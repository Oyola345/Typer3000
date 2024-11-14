var randomWord = document.querySelector("#randomWord");
var inputText = document.querySelector("#text");
var timeSpan = document.querySelector("#timeSpan");
var score = document.querySelector("#score");
var divMain = document.querySelector(".main");
var endGameContainer = document.querySelector("#end-game-container");
var error = document.querySelector(".error");
var bonusMessage = document.querySelector("#bonusMessage");
var bonusCountdown = document.querySelector("#bonusCountdown");

document.addEventListener("DOMContentLoaded", function () {
  randomWord.innerHTML =
    easyWords[Math.floor(Math.random() * easyWords.length)];
  actualizarTiempo();
});

// Lista de palabras
const easyWords = [
  "plata",
  "negro",
  "verano",
  "avion",
  "amor",
  "nieve",
  "vibes",
  "flex",
  "salir",
  "snack",
  "luz",
  "sol",
  "mar",
  "cielo",
  "paz",
  "casa",
  "juego",
  "fruta",
  "lago",
  "rio",
  "piedra",
];

const moderateWords = [
  "ilimitado",
  "escapada",
  "estadio",
  "programar",
  "desarrollar",
  "aplicacion",
  "algoritmo",
  "software",
  "hardware",
  "servidor",
  "frontend",
  "backend",
  "hackear",
  "comunicacion",
  "interactivo",
  "optimizacion",
  "desempeño",
  "reconocimiento",
  "interoperable",
];

const difficultWords = [
  "microservicio",
  "descentralizado",
  "transformacion",
  "virtualizacion",
  "reconocimiento",
  "interactividad",
  "desempeñamiento",
  "comunicacion",
  "optimizacion",
  "interoperabilidad",
  "desarrollo",
  "programacion",
  "digitalizacion",
];

var time = 10;
var points = 0;
var lastWord = "";
var lastLevel = "";
var hasError = false;
var isBonusActive = false;
var bonusTime = 10;

inputText.addEventListener("keyup", function (keyUp) {
  if (keyUp.key == "Enter") {
    var palabraIngresada = inputText.value;
    comparation(palabraIngresada);
  }
});

function comparation(palabraIngresada) {
  if (palabraIngresada == randomWord.innerHTML) {
    if (lastLevel === "") {
      lastLevel = "easy";
    }

    addPoints();
    resetError();
    error.classList.add("error");
    if (!isBonusActive) {
      time += getTimeBonus();
    }
    inputText.value = "";
    addToDOM();
  } else {
    if (!isBonusActive) {
      penalizeTime();
    }
    inputText.value = "";
    hasError = true;
    error.classList.remove("error");

    setTimeout(() => {
      error.classList.add("error");
    }, 2000);
  }
}

function addPoints() {
  points += 1; // Siempre suma 1 en cualquier nivel

  if (points >= 80 && points % 20 === 0) {
    activateBonusTime();
  }

  score.innerHTML = points;
  lastLevel = determineLevel(); // Actualiza el nivel antes de mostrar la dificultad
  updateDifficultyDisplay(); 
}

function activateBonusTime() {
  isBonusActive = true;
  bonusMessage.style.display = "block";
  bonusCountdown.innerHTML = bonusTime;

  let countdownTimer = setInterval(function () {
    bonusTime -= 1;
    bonusCountdown.innerHTML = bonusTime;

    if (bonusTime <= 0) {
      clearInterval(countdownTimer);
      isBonusActive = false;
      bonusMessage.style.display = "none";
      bonusTime = 10;
    }
  }, 1000);
}

function penalizeTime() {
  time -= 1; // Resta 1 segundo en cualquier nivel
}

function getTimeBonus() {
  return 3; // Siempre suma 3 segundos
}

function resetError() {
  hasError = false;
}

function addToDOM() {
  lastLevel = determineLevel();
  randomWord.innerHTML = randomWords();
}

function updateDifficultyDisplay() {
  const difficultyDisplay = document.querySelector("#difficultyLevel");

  difficultyDisplay.classList.remove(
    "dificultad-facil",
    "dificultad-moderada",
    "dificultad-dificil"
  );

  if (lastLevel === "easy") {
    difficultyDisplay.innerHTML = "Dificultad: Fácil";
    difficultyDisplay.classList.add("dificultad-facil");
  } else if (lastLevel === "moderate") {
    difficultyDisplay.innerHTML = "Dificultad: Moderada";
    difficultyDisplay.classList.add("dificultad-moderada");
  } else if (lastLevel === "difficult") {
    difficultyDisplay.innerHTML = "Dificultad: Difícil";
    difficultyDisplay.classList.add("dificultad-dificil");
  }
}

function determineLevel() {
  if (points > 50) {
    return "difficult";
  } else if (points > 20) {
    return "moderate";
  } else {
    return "easy";
  }
}

function randomWords() {
  let wordList = [];
  if (lastLevel === "easy") {
    wordList = easyWords;
  } else if (lastLevel === "moderate") {
    wordList = moderateWords;
  } else {
    wordList = difficultWords;
  }

  let returnWord;
  do {
    returnWord = wordList[Math.floor(Math.random() * wordList.length)];
  } while (returnWord === lastWord);

  lastWord = returnWord;
  return returnWord;
}

function actualizarTiempo() {
  let timer = setInterval(function () {
    if (!isBonusActive) {
      time -= 1;
      timeSpan.innerHTML = time + "s";
    }

    if (time <= 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  endGameContainer.style.padding = "50px";
  var title = document.createElement("h1");
  title.textContent = "¡Se acabó el tiempo!";

  var scoreParagraph = document.createElement("p");
  scoreParagraph.textContent = "Puntaje final: " + points;

  var button = document.createElement("button");
  button.onclick = function () {
    location.reload();
  };
  button.textContent = "Volver a empezar";

  endGameContainer.appendChild(title);
  endGameContainer.appendChild(scoreParagraph);
  endGameContainer.appendChild(button);
  divMain.remove();
}
