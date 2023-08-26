// https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json
const display = (data = []) => {
  const menu = document.querySelector(".menu-container");
  data.map((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
          <img src="${item.imgSrc}" alt="" />
          <div class="content">
            <div class="name-and-price">
              <h4>${item.name}</h4>
              <p>$ ${item.price}/-</p>
            </div>
            <div class="add-button">
              <span class="material-symbols-outlined"> add </span>
            </div>
          </div>`;
    menu.appendChild(card);
  });
};
const fetchData = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  );
  const data = await res.json();
  if (data.length) display(data);
};

fetchData();
