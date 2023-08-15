const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tryAgainButton = document.querySelector("#reset");
const easyDifficultyButton = document.querySelector("#easy-difficulty");
const hardDifficultyButton = document.querySelector("#hard-difficulty");

const disableTryAgainButton = () => {
  tryAgainButton.disabled = true;
};

const enableTryAgainButton = () => {
  tryAgainButton.disabled = false;
};

let score = 0;
let dx = 10;
let dy = 0;
let gameInterval = 100;

easyDifficultyButton.textContent = "Easy Difficulty (Activated)";

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
};

setInterval(draw, gameInterval); //100

//58 instead of 60 to prevent the food from spawning at the extreme edges, mostly it is done to reduce difficulty in timing.
let food = {
  x: Math.floor(Math.random() * 58) * 10,
  y: Math.floor(Math.random() * 58) * 10,
};

const drawFood = () => {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "black";
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeRect(food.x, food.y, 10, 10);
};

const updateScore = () => {
  score++;
  document.querySelector("#score").textContent = score;
};

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyW" && dy === 0) {
    dx = 0;
    dy = -10;
  } else if (e.code === "KeyA" && dx === 0) {
    dx = -10;
    dy = 0;
  } else if (e.code === "KeyS" && dy === 0) {
    dx = 0;
    dy = 10;
  } else if (e.code === "KeyD" && dx === 0) {
    dx = 10;
    dy = 0;
  }

  if (e.code === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -10;
  } else if (e.code === "ArrowLeft" && dx === 0) {
    dx = -10;
    dy = 0;
  } else if (e.code === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 10;
  } else if (e.code === "ArrowRight" && dx === 0) {
    dx = 10;
    dy = 0;
  }
});

const update = () => {
  let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (newHead.x < 0 || newHead.x > 590 || newHead.y < 0 || newHead.y > 590) {
    clearInterval(game);
    alert("Game Over!");
    document.removeEventListener("keydown", handleKeydown);
    enableTryAgainButton();
    return;
  }

  if (newHead.x === food.x && newHead.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 58) * 10,
      y: Math.floor(Math.random() * 58) * 10,
    };
    updateScore();
  } else {
    snake.pop();
  }

  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      clearInterval(game);
      alert("Game Over!");
      document.removeEventListener("keydown", handleKeydown);
      enableTryAgainButton();
      return;
    }
  }

  snake.unshift(newHead);
  drawFood();
};

disableTryAgainButton();

let game = setInterval(update, gameInterval);

const handleKeydown = (e) => {
  e.preventDefault();
};

document.addEventListener("keydown", handleKeydown);

document.querySelector("#reset").addEventListener("click", () => {
  dx = 10;
  dy = 0;
  score = 0;
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  disableTryAgainButton();
  document.querySelector("#score").textContent = score;
  game = setInterval(update, gameInterval);
  document.addEventListener("keydown", handleKeydown);
});

hardDifficultyButton.addEventListener("click", () => {
  // Clear the current interval
  clearInterval(game);

  // Reset the game
  dx = 10;
  dy = 0;
  score = 0;
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  disableTryAgainButton();
  document.querySelector("#score").textContent = score;

  // Set the new interval to 50
  gameInterval = 50;
  game = setInterval(update, gameInterval);

  // Update the button text
  hardDifficultyButton.textContent = "Hard Difficulty (Activated)";
  easyDifficultyButton.textContent = "Easy Difficulty";
});

easyDifficultyButton.addEventListener("click", () => {
  // Clear the current interval
  clearInterval(game);

  // Reset the game
  dx = 10;
  dy = 0;
  score = 0;
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  disableTryAgainButton();
  document.querySelector("#score").textContent = score;

  // Set the new interval to 100
  gameInterval = 100;
  game = setInterval(update, gameInterval);

  // Update the button text
  easyDifficultyButton.textContent = "Easy Difficulty (Activated)";
  hardDifficultyButton.textContent = "Hard Difficulty";
});
