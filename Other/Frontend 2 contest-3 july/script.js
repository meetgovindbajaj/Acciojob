const api =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

let apiData = [];
let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
document.body.onload = fetchData;

function toggleTheme() {
  const btn = document.getElementById("darkmode");
  const body = document.getElementById("root");
  if (btn.checked) body.setAttribute("data-darkmode", "true");
  else body.setAttribute("data-darkmode", "false");
}

function handleTabSwitch(id) {
  const mainTab = document.getElementById("main_tabs");
  const main_container = document.getElementById("main_data");
  const tab1 = document.getElementById("tab1");
  const tab2 = document.getElementById("tab2");
  if (id === "tab1") {
    mainTab.setAttribute("data-tab", "grid");
    tab1.setAttribute("data-active", "true");
    tab2.setAttribute("data-active", "false");
    const main_list = document.getElementById("main_list");
    const main_grid = append("grid");
    if (main_list) main_container.replaceChild(main_grid, main_list);
  } else {
    mainTab.setAttribute("data-tab", "list");
    tab2.setAttribute("data-active", "true");
    tab1.setAttribute("data-active", "false");
    const main_list = append("list");
    const main_grid = document.getElementById("main_grid");
    if (main_grid) main_container.replaceChild(main_list, main_grid);
  }
}

async function fetchData() {
  const main_container = document.getElementById("main_data");
  try {
    const res = await fetch(api);
    apiData = await res.json();
    if (apiData.length > 0) {
      const grid = append("grid");
      main_container.appendChild(grid);
    }
  } catch (error) {
    const err = document.getElementById("error");
    err.style.display = "block";
  } finally {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
  }
}

function append(type) {
  const main = document.createElement("div");
  main.className = "main_" + type;
  main.id = "main_" + type;
  apiData.forEach((item) => {
    const main_item = document.createElement("div");
    main_item.className = `${"main_" + type + "_item"} main_card`;

    const main_item_head = document.createElement("div");
    main_item_head.className = "main_item_head";
    const main_item_body = document.createElement("div");
    main_item_body.className = "main_" + type + "_item_body";
    main_item_body.setAttribute(
      "data-state",
      (item?.price_change_percentage_24h >= 0 ? "high" : "low") ?? "high"
    );

    const item_head_left = document.createElement("div");
    item_head_left.className = "item_head_left";
    const item_head_img = document.createElement("img");
    item_head_img.src = item?.image ?? "https://source.unsplash.com/random";
    item_head_img.alt = item?.symbol ?? "Coin";
    item_head_img.height = "48";
    item_head_img.width = "48";
    item_head_img.className = "rounded-circle";
    item_head_left.appendChild(item_head_img);
    main_item_head.appendChild(item_head_left);

    const item_head_right = document.createElement("div");
    item_head_right.className = "item_head_right";
    const item_head_symbol = document.createElement("div");
    item_head_symbol.className = "item_head_symbol";
    item_head_symbol.innerText = item?.symbol ?? "Coin";
    const item_head_name = document.createElement("div");
    item_head_name.className = "item_head_name";
    item_head_name.innerText = item?.name ?? "Coin";
    item_head_right.appendChild(item_head_symbol);
    item_head_right.appendChild(item_head_name);
    main_item_head.appendChild(item_head_right);

    main_item.appendChild(main_item_head);

    const price_change_per = document.createElement("div");
    price_change_per.className = "price_change_per";
    price_change_per.innerText =
      (item?.price_change_percentage_24h.toFixed(3) ?? 0) + " %";
    const current_price = document.createElement("div");
    current_price.className = "current_price";
    current_price.innerText = USDollar.format(item?.current_price ?? 0);
    const main_item_foot1 = document.createElement("div");
    main_item_foot1.className = "main_item_foot";
    main_item_foot1.innerText = `Total Volume: ${item?.total_volume ?? 0}`;
    const main_item_foot2 = document.createElement("div");
    main_item_foot2.className = "main_item_foot";
    main_item_foot2.innerText = `Market Cap: ${USDollar.format(
      item?.market_cap ?? 0
    )}`;
    main_item_body.appendChild(price_change_per);
    main_item_body.appendChild(current_price);
    main_item_body.appendChild(main_item_foot1);
    main_item_body.appendChild(main_item_foot2);

    main_item.appendChild(main_item_body);
    main.appendChild(main_item);
  });
  return main;
}
