const container = document.getElementById("timer");
let lTime = 0;

function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lTime) / 1000 < 1) return;
  lTime = cTime;
  const date = new Date();
  container.innerText = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
}

window.requestAnimationFrame(main);
