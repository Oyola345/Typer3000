/* Lea Oyola */
var randomWord = document.querySelector("#randomWord");
var inputText = document.querySelector("#text");
var timeSpan = document.querySelector("#timeSpan");
var score = document.querySelector("#score");
var divMain = document.querySelector(".main");
var endGameContainer = document.querySelector("#end-game-container");
var error = document.querySelector(".error")

document.addEventListener("DOMContentLoaded", function () {
  randomWord.innerHTML = randomWords();
  actualizarTiempo();
});

const words = [
  "californication",
  "plataforma5",
  "black",
  "summer",
  "flea",
  "aeroplane",
  "peppers",
  "unlimited",
  "arcadium",
  "love",
  "getaway",
  "stadium",
  "quixoticelixer",
  "quarter",
  "snow",
  "dylan",
  "zephyr",
  "funky",
  "chili",
];

var time = 10;
var points = 0;

  inputText.addEventListener("keyup", function (keyUp) {
    console.log(keyUp.key);
    if (keyUp.key == "Enter") {
      var palabraIngresada = inputText.value;
      comparation(palabraIngresada);
    }
  });

function comparation(palabraIngresada){
  console.log(palabraIngresada);
  console.log(randomWord.innerHTML);
  if(palabraIngresada == randomWord.innerHTML) {
    time += 3;
    inputText.value = "";
    addToDOM();
    updateScore();
    //esto oculta al h1 que dice que lo que ingresaste es incorrecto
    error.classList.add("error")
  } else { //esto hace visible al h1 que dice que lo que ingresaste es incorrecto
    inputText.value = "";
    error.classList.remove("error")
  }
}

function addToDOM() {
  randomWord.innerHTML = randomWords();
}

function randomWords() {
  var returnWord = words[Math.floor(Math.random() * words.length)];
  return returnWord;
}

function actualizarTiempo() {
  let timer = setInterval(function () {
    time -= 1;
    timeSpan.innerHTML = time + "s";

    if (time === 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function updateScore() {
  points += 1;
  score.innerHTML = points;
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