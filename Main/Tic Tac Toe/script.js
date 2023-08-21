const symbol1 = "X";
const symbol2 = "O";
const solution = ["123", "456", "789", "147", "258", "369", "159", "357"];
let player1;
let player2;
let toggle = true;
let moves_p1 = [];
let moves_p2 = [];
auth_form.onsubmit = (e) => {
  e.preventDefault();
  player1 = auth_form.p1.value;
  player2 = auth_form.p2.value;
  auth_form.reset();
  console.log(player1, player2);
};
[...document.getElementsByClassName("grid_cell")].forEach((cell) =>
  cell.addEventListener("click", (e) => {
    e.target.setAttribute("data-none", "");
    e.target.innerText = toggle ? symbol1 : symbol2;
    if (toggle) {
      moves_p1.push(e.target.id);
      if (moves_p1.length >= 3) {
        moves_p1.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        result = tester(moves_p1.join(""));
        if (result) turns.innerText = "player 1 wins!";
        console.log(result);
      }
    } else {
      moves_p2.push(e.target.id);
      if (moves_p2.length >= 3) {
        moves_p2.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        result = tester(moves_p2.join(""));
        if (result) turns.innerText = "player 2 wins!";
        console.log(result);
      }
    }
    toggle = !toggle;
  })
);
let co = 0;
function tester(str) {
  let match = false;
  solution.forEach((pattern) => {
    const reg1 = new RegExp(pattern);
    const reg2 = new RegExp(`[^${pattern}]`, "g");
    let newstr = str.replace(reg2, "");
    match = match ? match : reg1.test(newstr);
  });
  return match;
}

function gameEngine() {}
