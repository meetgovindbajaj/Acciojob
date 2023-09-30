async function getCurrentImageOfTheDay() {
  const data = await getData();
  display(data, true);
  saveSearch();
}

async function getImageOfTheDay(date, save = true) {
  const data = await getData(date);
  display(data);
  if (save) saveSearch(date);
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) ?? [];
  if (date) {
    searches = [{ date }, ...searches];
    localStorage.setItem("searches", JSON.stringify(searches));
  }
  addSearchToHistory(searches);
}

function addSearchToHistory(searches) {
  const prevSearches = document.getElementById("search-history");
  prevSearches.innerHTML = searches
    .map(
      (
        i
      ) => `<li class="prevSearch" onclick="getImageOfTheDay('${i.date}',false)">
        ${i.date}
      </li>`
    )
    .join("");
}

async function getData(paramDate) {
  const apikey = "8WhW7qyUWoYQcFa1KmnOUQmMPfLrtBO2OpmsRlh8";
  const date =
    paramDate ??
    new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apikey}`
  );
  const data = await res.json();
  return data;
}

function display(data, isCurrent = false) {
  const container = document.getElementById("current-image-container");
  container.innerHTML = `
     <div class="heading">${
       isCurrent ? "NASA Picture of the Day" : "Picture On " + data.date
     }</div>
      <img height="500" src="${data.hdurl}" alt="${
    data.copyright
  }" class="img" key="${data.hdurl}"/>
      <div class="subheading">${data.title}</div>
      <p class="para">${data.explanation}</p>
    `;
}

const form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getImageOfTheDay(e.target["search-input"].value);
});
document.body.onload = getCurrentImageOfTheDay();
