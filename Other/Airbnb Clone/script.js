// https://www.figma.com/file/QOCWgizbc2sBwnC7onGAQO/Airbnb---Home%2C-Search%2C-and-Listing-Pages-(Community)?type=design&node-id=0-1&mode=design

const searchByLocation = async () => {
  // main: location, checkin, checkout, adults
  // optional: children, infants, pets, page, currency
  const url =
    "https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e7c7bdc671msh7595190ca49bb1ap152162jsn92e4a22874ff",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
const calender = async () => {
  // main: room_id
  // optional: currency, year, month ,count
  const url =
    "https://airbnb13.p.rapidapi.com/calendar?room_id=18951965&currency=USD&year=2023&month=12&count=1";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e7c7bdc671msh7595190ca49bb1ap152162jsn92e4a22874ff",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const autoComplete = async () => {
  // main: query
  const url = "https://airbnb13.p.rapidapi.com/autocomplete?query=paris";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e7c7bdc671msh7595190ca49bb1ap152162jsn92e4a22874ff",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
const searchByGeoCoordinates = async () => {
  // main: ne_lat, ne_lng, sw_lat, sw_lng, checkin, checkout, adults
  // optional: children, infants, pets, page, currency
  const url =
    "https://airbnb13.p.rapidapi.com/search-geo?ne_lat=52.51&ne_lng=13.41&sw_lat=52.41&sw_lng=13.31&checkin=2023-09-15&checkout=2023-09-16&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e7c7bdc671msh7595190ca49bb1ap152162jsn92e4a22874ff",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
