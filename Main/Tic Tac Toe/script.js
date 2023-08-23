let player1, player2;
let moves_p1 = [],
  moves_p2 = [];
let result = false;
let toggle = Math.round(Math.random());
let info = JSON.parse(localStorage.getItem("info") ?? "{}");
let isAuth = Object.keys(info).length === 2;
const arr = [moves_p1, moves_p2];
const symbol1 = "X";
const symbol2 = "O";
const solution = ["123", "456", "789", "147", "258", "369", "159", "357"];
const cells = [...document.getElementsByClassName("grid_cell")];
const auth_form = document.getElementById("auth_form");
const turns = document.getElementById("turns");

// form submit action
auth_form.onsubmit = (e) => {
  e.preventDefault();
  info.player1 = auth_form.p1.value;
  info.player2 = auth_form.p2.value;
  auth_form.reset();
  turns.innerText = `${!toggle ? info.player1 : info.player2}, you're up`;
  localStorage.setItem("info", JSON.stringify(info));
  isAuth = true;
  gameEngine();
};

// handle the moves by each players
const handleClick = (e) => {
  e.target.setAttribute("data-none", "");
  e.target.innerText = toggle === 0 ? symbol1 : symbol2;
  arr[toggle].push(e.target.id);
  if (arr[toggle].length >= 3) {
    arr[toggle].sort(dynamicSort);
    checkWin(arr[toggle].join(""));
    if (result) {
      turns.innerText = `${
        !toggle ? info.player1 : info.player2
      }, congratulations you won!`;
      removeClick();
      return;
    } else if (
      (arr[0].length === 4 && arr[1].length === 5) ||
      (arr[0].length === 5 && arr[1].length === 4)
    ) {
      turns.innerText = `Its a draw!`;
      removeClick();
      return;
    }
  }
  toggle = toggle === 0 ? 1 : 0;
  turns.innerText = `${!toggle ? info.player1 : info.player2}, you're up`;
};

// removes the click event after game is finished
const removeClick = () => {
  cells.forEach((cell) => {
    cell.setAttribute("data-none", "");
    cell.removeEventListener("click", handleClick);
  });
  document.querySelector("[data-result]").setAttribute("data-result", "true");
};

// checks the winning status using regular expressions
const checkWin = (str) => {
  let arr = [...solution];
  arr.forEach((sol) => {
    if (new RegExp(sol).test(str.replace(new RegExp(`[^${sol}]`, "g"), ""))) {
      sol.split("").forEach((i) => cells[i - 1].setAttribute("data-win", ""));
      result = true;
      arr.length = 0;
    }
  });
};

// lexically sort the string array
const dynamicSort = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// main game engine
const gameEngine = () => {
  if (isAuth) {
    turns.innerText = `${!toggle ? info.player1 : info.player2}, you're up`;
    document.getElementById("auth").setAttribute("data-auth", "");
    document.getElementById("game").setAttribute("data-auth", "");
    cells.forEach((cell) => cell.addEventListener("click", handleClick));
  }
};

document.body.onload = () => gameEngine();
