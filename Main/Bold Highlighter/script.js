const ele = document.querySelectorAll("strong");
function highlight() {
  ele.forEach((item) => (item.style.color = "green"));
}

function return_normal() {
  ele.forEach((item) => (item.style.color = "black"));
}
