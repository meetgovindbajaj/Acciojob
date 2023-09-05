document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementsByClassName("toggle-btn")[0];
  let ct = true;
  btn.addEventListener("click", drop);

  function drop() {
    if (ct) {
      let side_bar = document.getElementsByClassName("side-bar")[0];
      side_bar.style.width = "110px";
      let hr = document.getElementsByTagName("hr")[0];
      let links = document.getElementsByClassName("links");
      hr.style.width = "110px";
      let filters = document.getElementsByClassName("filters")[0];
      filters.style.left = "110px";
      let video_container =
        document.getElementsByClassName("video-container")[0];
      video_container.style.marginLeft = "110px";
      video_container.style.width = "calc(100% - 110px)";
      // Convert the collection to an array using Array.from() or the spread operator
      for (let i = 0; i < links.length; i++) {
        if (i >= 3) {
          links[i].style.visibility = "hidden";
        } else {
          links[i].style.fontSize = "15px";
          links[i].style.flexDirection = "column";
          links[i].style.marginLeft = "10px";
          links[i].style.width = "110px";

          const divElement = links[i].querySelector("div");
          if (divElement) {
            divElement.style.width = "25px";
            divElement.style.height = "35px";
          }
        }
        ct = false;
      }
    } else {
      let side_bar = document.getElementsByClassName("side-bar")[0];
      side_bar.style.width = "250px";
      let hr = document.getElementsByTagName("hr")[0];

      hr.style.width = "250px";
      let filters = document.getElementsByClassName("filters")[0];
      filters.style.left = "250px";
      let video_container =
        document.getElementsByClassName("video-container")[0];
      video_container.style.marginLeft = "250px";
      video_container.style.width = "calc(100% - 250px)";
      let links = document.getElementsByClassName("links");

      // Convert the collection to an array using Array.from() or the spread operator
      for (let i = 0; i < links.length; i++) {
        if (i >= 3) {
          links[i].style.visibility = "visible";
        }
        Array.from(links).forEach((link) => {
          link.style.fontSize = "14px";
          link.style.flexDirection = "row";
          link.style.marginLeft = "0px";
          link.style.width = "";

          const divElement = link.querySelector("div");
          if (divElement) {
            divElement.style.width = "";
            divElement.style.height = "35px";
          }
        });
        ct = true;
      }
    }
  }
});

const videoCardContainer = document.querySelector(".video-container");

let api_key = "AIzaSyBM1_C40cespNthMdFZHgn6-6VwZ8X4mlo"; //add your api else wont work

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));
const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};
const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
        <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
            </div>
        </div>
        `;
};
// search bar
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
