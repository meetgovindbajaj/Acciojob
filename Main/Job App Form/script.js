const form = document.getElementById("form");
form.onsubmit = (e) => {
  e.preventDefault();
  const data = new FormData(form);
  data.forEach((v, k) => console.log(k, v));
};
