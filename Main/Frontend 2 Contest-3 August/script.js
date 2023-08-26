// https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json
let menu = [];
const display = () => {
  const menuContainer = document.querySelector(".menu-container");
  menu.map((item) => {
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
    menuContainer.appendChild(card);
  });
  takeOrder()
    .then((ans) => printer(ans, orderPrep))
    .then((ans) => printer(ans, payOrder))
    .then((ans) => {
      console.log(ans);
      if (ans.paid === true) {
        thankyouFnc();
      }
    });
};
const printer = (ans, func = () => {}) => {
  console.log(ans);
  return func();
};
const fetchData = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  );
  menu = await res.json();
  if (menu.length) {
    display();
  }
};

fetchData();

const takeOrder = async () => {
  console.log("taking order...");
  return await new Promise((res, rej) =>
    setTimeout(() => {
      res(
        Array.from({ length: 3 }).map(
          () => menu[generateRandom(0, menu?.length - 1)]
        )
      );
      rej([]);
    }, 2500)
  );
};
const orderPrep = async () => {
  console.log("preparing order...");
  return await new Promise((res, rej) =>
    setTimeout(() => {
      res({ order_status: true, paid: false });
      rej({ order_status: false, paid: false });
    }, 1500)
  );
};
const payOrder = async () => {
  console.log("paying bill...");
  return await new Promise((res, rej) =>
    setTimeout(() => {
      res({ order_status: true, paid: true });
      rej({ order_status: true, paid: false });
    }, 1000)
  );
};

const thankyouFnc = () => {
  alert("thankyou for eating with us today!");
};
const generateRandom = (start = 1, stop = 100) => {
  return Math.round(Math.random() * (stop - start) + start);
};
