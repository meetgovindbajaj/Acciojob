const lookup = {
  A: "N",
  B: "O",
  C: "P",
  D: "Q",
  E: "R",
  F: "S",
  G: "T",
  H: "U",
  I: "V",
  J: "W",
  K: "X",
  L: "Y",
  M: "Z",
  N: "A",
  O: "B",
  P: "C",
  Q: "D",
  R: "E",
  S: "F",
  T: "G",
  U: "H",
  V: "I",
  W: "J",
  X: "K",
  Y: "L",
  Z: "M",
  "?": "?",
  ",": ",",
  ".": ".",
  ">": ">",
  "<": "<",
  "/": "/",
  "\\": "\\",
  "|": "|",
  "-": "-",
  _: "_",
  "+": "+",
  "=": "=",
  "!": "!",
  "@": "@",
  "#": "#",
  $: "$",
  "%": "%",
  "^": "^",
  "&": "&",
  "*": "*",
  "(": "(",
  ")": ")",
  "{": "{",
  "}": "}",
  "[": "[",
  "]": "]",
  "\t": "\t",
  "\n": "\n",
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  " ": " ",
  '"': '"',
  "'": "'",
  ":": ":",
  ";": ";",
  "`": "`",
};

function rot13(encodedStr) {
  const mode = encodedStr ? 1 : 2;
  encodedStr = encodedStr ?? document.getElementById("code").value;
  const message = encodedStr
    .toUpperCase()
    .split("")
    .map((char) => lookup[char])
    .join("");

  return mode === 1
    ? message
    : (document.getElementById("result").innerText = message);
}

window.rot13 = rot13;
