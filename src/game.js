const player = document.getElementById("player");
const gameboard = document.getElementById("gameboard");
const scoreboard = document.getElementById("scoreboard");

const gameboardRect = gameboard.getBoundingClientRect();
let playerLeft = gameboardRect.width / 2 - 25;
let playerTop = gameboardRect.height / 2 - 25;

let score = 0;

player.style.left = playerLeft + "px";
player.style.top = playerTop + "px";

// Player movement function
function playerMovement() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      playerLeft -= 10;
      if (playerLeft < 0) {
        playerLeft = 0;
      }
    }
    if (event.key === "ArrowRight") {
      playerLeft += 10;
      if (playerLeft + 50 > gameboardRect.width) {
        playerLeft = gameboardRect.width - 50;
      }
    }
    if (event.key === "ArrowUp") {
      playerTop -= 10;
      if (playerTop < 0) {
        playerTop = 0;
      }
    }
    if (event.key === "ArrowDown") {
      playerTop += 10;
      if (playerTop + 50 > gameboardRect.height) {
        playerTop = gameboardRect.height - 50;
      }
    }

    player.style.left = playerLeft + "px";
    player.style.top = playerTop + "px";
  });
}

// Collision detection function
function handleCollision() {
  const playerRect = {
    left: playerLeft,
    right: playerLeft + 80,
    top: playerTop,
    bottom: playerTop + 80
  };

  const objects = Array.from(document.querySelectorAll(".object"));
  objects.forEach((object) => {
    const objRect = object.getBoundingClientRect();

    const isColliding = (
      playerRect.left < objRect.right &&
      playerRect.right > objRect.left &&
      playerRect.top < objRect.bottom &&
      playerRect.bottom > objRect.top
    );

    if (isColliding) {
      object.remove();
      score += 1;
      scoreboard.innerHTML = `score: ${score}`;
    }
  });
  // Grow player function. 1 point = 1px.
  const size = score + 50;
  player.style.height = `${size}px`;
  player.style.width = `${size}px`;
}
setInterval(handleCollision, 100);


// Create objects function.
function createObject() {
  // Random color for object. Number generated from 1 to 5.
  const BackgroundColorsPicker = Math.floor(Math.random() * (5 - 0 + 1) + 0);

  // Styling objects.
  const object = document.createElement("div");
  object.classList.add("object");
  object.style.position = "absolute";
  object.style.height = "10px";
  object.style.width = "10px";

  // Array with all the colors from 0 to 5.
  let colors = ["red", "blue", "green", "yellow", "orange"];
  object.style.backgroundColor = colors[BackgroundColorsPicker];

  // Generate random position for object.
  const { clientWidth: width, clientHeight: height } = gameboard;
  const randomPositionX = Math.round(Math.random() * (width - 50));
  const randomPositionY = Math.round(Math.random() * (height - 50));

  object.style.left = `${randomPositionX}px`;
  object.style.top = `${randomPositionY}px`;

  gameboard.appendChild(object);
}
playerMovement();

// Set player name.
function setPlayerName() {
  const playerName = document.getElementById("name").value;
  const player = document.getElementById("player");
  player.innerHTML = playerName;
  player.style.color = "white";
  player.style.fontSize = "20px";
}
function startGame() {
  const startGame = document.querySelector(".containerStart");
  if (startGame.style.display === "none") {
    startGame.style.display = "block";
  } else {
    startGame.style.display = "none";
  }
  setPlayerName();
  setInterval(createObject, 3000);
}
