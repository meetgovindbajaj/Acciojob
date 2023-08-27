let menu = [];
let popup = document.querySelector(".popup");
console.log(popup);
// fetching data from api provided by acciojob to get menu items
const getMenu = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    menu = await res.json();
    if (menu) {
      display();

      popup.setAttribute("data-display", "");
      popup.innerHTML = `
      <div>Taking Order...</div>
      `;
      TakeOrder()
        .then((ans) => {
          popup.innerHTML = `
            <div>Preparing Order...</div>
          `;
          return printer(ans, orderPrep);
        })
        .catch(() => console.log([]))
        .then((ans) => {
          popup.innerHTML = `
            <div>Paying Bill...</div>
          `;
          return printer(ans, payOrder);
        })
        .catch(() => console.log({ order_status: false, paid: false }))
        .then((ans) => {
          if (ans.paid === true) {
            popup.innerHTML = `
            <div>Thankyou for eating with us today!</div>
          `;
            setTimeout(() => popup.removeAttribute("data-display"), 5000);
            return printer(ans, thankyouFnc);
          }
        })
        .catch(() => console.log({ order_status: true, paid: false }));
    }
  } catch (error) {
    console.log(error.message);
  }
};

// displaying the menu items on the screen
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
};

// printing the results and calling next function
const printer = (ans, func = () => {}) => {
  console.log(ans);
  return func();
};

// prints taking order and returns the promise that gets resolved after 2.5 seconds and containts 3 random menu items
const TakeOrder = () => {
  console.log("taking order...");
  return new Promise(
    (resolve, reject) =>
      setTimeout(() => {
        resolve(
          Array.from({ length: 3 }).map(
            () => menu[generateRandom(0, menu?.length - 1)]
          )
        );
      }, 2500) // its taking 2500ms aka 2.5sec before returning the value
  );
};

// prints preparing order and returns the promise that gets resolved after 1.5 seconds and contains object with keys and values as follows {order_status: true, paid: false}
const orderPrep = () => {
  console.log("preparing order...");
  return new Promise(
    (resolve, reject) =>
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500) // its taking 1500ms aka 1.5sec before returning the value
  );
};

// prints paying bill and returns the promise that gets resolved after 1 second and contains object with keys and values as follows {order_status: true, paid: true}
const payOrder = () => {
  console.log("paying bill...");
  return new Promise(
    (resolve, reject) =>
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000) // its taking 1000ms aka 1sec before returning the value
  );
};

// popup alert appears on the screen with well wishes
const thankyouFnc = () => {
  setTimeout(() => alert("thankyou for eating with us today!"), 100);
};

// generates the random values between start and stop (stop is included)
const generateRandom = (start = 1, stop = 100) => {
  return Math.round(Math.random() * (stop - start) + start);
};

document.body.onload = setTimeout(() => {
  getMenu();
}, 1000);
