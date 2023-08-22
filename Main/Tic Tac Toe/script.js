const symbol1 = "X";
const symbol2 = "O";
const solution = ["123", "456", "789", "147", "258", "369", "159", "357"];
let player1, player2;
let toggle = Math.round(Math.random());
let moves_p1 = [];
let moves_p2 = [];
let result = false;
const arr = [moves_p1, moves_p2];
auth_form.onsubmit = (e) => {
  e.preventDefault();
  player1 = auth_form.p1.value;
  player2 = auth_form.p2.value;
  auth_form.reset();
  console.log(player1, player2);
};
const cells = [...document.getElementsByClassName("grid_cell")];
const handleEvents = (e) => {
  e.target.setAttribute("data-none", "");
  e.target.innerText = toggle === 0 ? symbol1 : symbol2;
  arr[toggle].push(e.target.id);
  if (arr[toggle].length >= 3) {
    arr[toggle].sort(dynamicSort);
    tester(arr[toggle].join(""));
    if (result) {
      turns.innerText = `player ${toggle + 1} wins!`;
      removeClick();
    } else if (
      (arr[0].length === 4 && arr[1].length === 5) ||
      (arr[0].length === 5 && arr[1].length === 4)
    ) {
      turns.innerText = `no one wins!`;
      removeClick();
    }
  }
  toggle = toggle === 0 ? 1 : 0;
};
cells.forEach((cell) => cell.addEventListener("click", handleEvents));
const removeClick = () =>
  cells.forEach((cell) => {
    cell.setAttribute("data-none", "");
    cell.removeEventListener("click", handleEvents);
  });

const dynamicSort = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
function tester(str) {
  let solCopy = [...solution];
  solCopy.forEach((pattern) => {
    if (
      new RegExp(pattern).test(
        str.replace(new RegExp(`[^${pattern}]`, "g"), "")
      )
    ) {
      pattern
        .split("")
        .forEach((i) => cells[i - 1].setAttribute("data-win", ""));
      result = true;
      solCopy.length = 0;
    }
  });
}

function gameEngine() {}
