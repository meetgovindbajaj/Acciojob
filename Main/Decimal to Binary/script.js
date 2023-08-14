function decimalToBinary(num) {
  const mode = num ? 1 : 2;
  num = num ?? Number(document.getElementById("number").value);
  const binary = (num >>> 0).toString(2);
  return mode === 1
    ? binary
    : (document.getElementById("result").innerText = binary);
}

window.decimalToBinary = decimalToBinary;
