const results = document.getElementById("results");
const loader = document.getElementById("loader");
const searchForm = document.getElementById("searchForm");
let apikey;
let searchQuery = null;
let errorMessage;
// handle the search on button click
const handleSearch = async () => {
  apikey = searchForm.apikey.value;
  searchQuery = searchForm.searchQuery.value ?? null;
  if (searchQuery) {
    loader.style.display = "inline";
    try {
      let result = await fetch(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apikey}`
      );
      result = await result.json();
      errorMessage = result?.Error;
      display(result.Search, result.Response === "False");
      searchForm.searchQuery.value = "";
      searchForm.searchQuery.blur();
    } catch (error) {
      display([], true);
    }
    loader.style.display = "none";
  }
};

// handle the search the hit enter
addEventListener("keypress", (e) => e.key === "Enter" && handleSearch());

// handle display
const display = (array, error) => {
  console.log(error, errorMessage);
  results.innerHTML = error
    ? errorMessage
    : array
        ?.map(
          (card, index) =>
            `<div class="card">
        <span class="cardNumber">${index + 1}</span>
        <img src=${card.Poster} alt=${
              card.Title
            } class="cardImg" height="300" width="200" />
        <span class="cardTitle">${card.Title}</span>
      </div>`
        )
        .join("");
};
