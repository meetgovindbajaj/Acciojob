const ipaddress = document.getElementById("ipaddress");
const lat = document.getElementById("lat");
const long = document.getElementById("long");
const city = document.getElementById("city");
const region = document.getElementById("region");
const org = document.getElementById("org");
const host = document.getElementById("host");
const tzone = document.getElementById("tzone");
const datetime = document.getElementById("datetime");
const pincode = document.getElementById("pincode");
const msg = document.getElementById("msg");
const maps = document.getElementById("maps");
const cardContainer = document.getElementById("cardContainer");
const searchForm = document.getElementById("searchForm");
let postOffices = [];
/**
 * Block
BranchType
Circle
Country
DeliveryStatus
Description
District
Division
Name
Pincode
Region
State
 */
document.body.onload = () => {
  fetch("https://api.ipify.org/?format=json")
    .then((res) => res.json())
    .then((res) =>
      fetch(`https://ipinfo.io/${res.ip}/json?token=d80f6121c8ea5d`)
    )
    .then((res) => res.json())
    .then((res) => {
      ipaddress.innerText = res?.ip;
      city.innerText = res?.city;
      pincode.innerText = res?.postal;
      org.innerText = res?.org;
      host.innerText = res?.hostname;
      region.innerText = res?.region;
      tzone.innerText = res?.timezone;
      maps.src = `https://maps.google.com/maps?q=${res?.loc}&z=15&output=embed`;
      datetime.innerText = new Date().toLocaleString();
      lat.innerText = res?.loc.split(",")[0];
      long.innerText = res?.loc.split(",")[1];
      return fetch(`https://api.postalpincode.in/pincode/${res?.postal}`);
    })
    .then((res) => res.json())
    .then((res) => {
      msg.innerText = res[0]?.Message;
      postOffices = res[0]?.PostOffice;
      display();
    })
    .catch((err) => console.log(err));
};

const display = (arr = postOffices) => {
  cardContainer.innerHTML = arr
    .map(
      (card) => `
    <div class="card">
          <div class="textContainer">Name <span>${card.Name}</span></div>
          <div class="textContainer">Branch Type <span>${card.BranchType}</span></div>
          <div class="textContainer">Delivery Status <span>${card.DeliveryStatus}</span></div>
          <div class="textContainer">District <span>${card.District}</span></div>
          <div class="textContainer">Division <span>${card.Division}</span></div>
        </div>
  `
    )
    .join("");
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = searchForm.search.value.toLowerCase();
  if (searchText !== "") {
    let newArr = postOffices.filter((item) =>
      item.Name.toLowerCase().includes(searchText)
    );
    display(newArr);
  } else {
    display();
  }
});
