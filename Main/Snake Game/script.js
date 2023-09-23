// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  {
    x: Math.round(2 + (16 - 2) * Math.random()),
    y: Math.round(2 + (16 - 2) * Math.random()),
  },
];

let food = {
  x: Math.round(2 + (16 - 2) * Math.random()),
  y: Math.round(2 + (16 - 2) * Math.random()),
};
let hiscoreval = 0;
// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    alert("Game Over. Press any key to play again!");
    inputDir = { x: 0, y: 0 };
    food = {
      x: Math.round(2 + (16 - 2) * Math.random()),
      y: Math.round(2 + (16 - 2) * Math.random()),
    };
    snakeArr = [
      {
        x: Math.round(2 + (16 - 2) * Math.random()),
        y: Math.round(2 + (16 - 2) * Math.random()),
      },
    ];
    // musicSound.play();
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // if (inputDir.x === 0 && inputDir.y === 0) inputDir = { x: 0, y: 1 }; // Start the game

  switch (e.key) {
    case "ArrowUp":
    case "W":
    case "w":
      if (inputDir.x !== 0) {
        moveSound.play();
        inputDir.x = 0;
        inputDir.y = -1;
      } else {
        checkStart(0, -1);
      }
      break;

    case "ArrowDown":
    case "S":
    case "s":
      if (inputDir.x !== 0) {
        moveSound.play();
        inputDir.x = 0;
        inputDir.y = 1;
      } else {
        checkStart(0, 1);
      }
      break;

    case "ArrowLeft":
    case "A":
    case "a":
      if (inputDir.y !== 0) {
        moveSound.play();
        inputDir.x = -1;
        inputDir.y = 0;
      } else {
        checkStart(-1, 0);
      }
      break;

    case "ArrowRight":
    case "D":
    case "d":
      if (inputDir.y !== 0) {
        moveSound.play();
        inputDir.x = 1;
        inputDir.y = 0;
      } else {
        checkStart(1, 0);
      }
      break;
    default:
      break;
  }
});

const checkStart = (x, y) => {
  if (inputDir.x === 0 && inputDir.y === 0) {
    inputDir.x = x;
    inputDir.y = y;
  }
};
