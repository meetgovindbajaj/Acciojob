function calculateMinCost() {
  let ans = 0,
    arr = document
      .getElementById("rope-lengths")
      .value.split(",")
      .map((val) => parseInt(val));
  while (arr.length > 1) {
    arr.sort((a, b) => a - b);
    arr[1] += arr[0];
    ans += arr[1];
    arr.shift();
  }
  document.getElementById("result").innerText = ans;
}
