document.body.onload = load();
// document.addEventListener(
//   "contextmenu",
//   function (e) {
//     e.preventDefault();
//   },
//   false
// );
let currentPage = "/";
const initSong = {
  id: "song-1",
  src: "./assets/songs/1, 2, 3 (feat Jason Derulo & De La Ghetto) - Sofia Reyes.m4a",
  title: "1, 2, 3 (feat Jason Derulo & De La Ghetto)",
  album: "Sofia Reyes",
  artist: "Jason Derulo & De La Ghetto",
  duration: "3:21",
};
let currentMusic = initSong;
const audio_container = document.getElementById("audio_player");
let prevRec = [
  {
    page: "/",
    id: "home",
  },
];
let nextRec = [];
let currentPlaylist = {
  title: "",
  img: "",
};
let songs = [];
function onChangePage({ page, id }) {
  const prevElement = document.getElementsByClassName("active")[0];
  const newElement = document.getElementById(id);
  if (prevElement.id !== id) {
    prevElement.classList.remove("active");
    newElement.classList.add("active");
    prevRec.push({
      page: currentPage,
      id: prevElement.id,
    });
  }
  currentPage = page;
  changePages();
}

async function load() {
  let container, res, List;
  // mainbar
  container = document.getElementById("mainbar");
  res = await fetch("./data/playlist.json");
  List = await res.json();
  container.innerHTML = `
  <div class="heading">
    ${getGreetings(new Date().getHours())}
  </div>
  <div class="playlist">
    ${getPlaylist(List)}
  </div>
  `;
  // episodebar
  container = document.getElementById("episodebar");
  res = await fetch("./data/episodes.json");
  List = await res.json();
  container.innerHTML = `
  <div class="episode_top">
    <div class="heading">Episodes for you</div>
    <div class="more_link">Show all</div>
  </div>
  <div class="episodes">
    ${getEpisodes(List)}
  </div>
  `;
  res = await fetch("./data/songs.json");
  songs = await res.json();
  container = document.getElementById("player_left_title");

  container.innerText = currentMusic.title;
  container = document.getElementById("player_left_desc");
  container.innerText = currentMusic.artist;
}
function getPlaylist([...Playlist]) {
  let text = `<div class="playlist_item" key=${Playlist[0].id} onclick="changePlaylist({
    title: '${Playlist[0].title}',
    img:'${Playlist[0].img}',
  })">
        <img src=${Playlist[0].img} alt="" class="playlist_item_img" />
        <span class="playlist_item_text">${Playlist[0].title}</span>
      </div>`;
  return Playlist.slice(1).reduce(
    (next, current) =>
      next +
      `<div class="playlist_item" key=${current.id} onclick="changePlaylist({
    title: '${current.title}',
    img:'${current.img}',
  })">
        <img src=${current.img} alt="" class="playlist_item_img" />
        <span class="playlist_item_text">${current.title}</span>
      </div>`,
    text
  );
}
function getEpisodes([...Episode]) {
  let text = `<div class="episode_item" key=${Episode[0].id} onclick="changePlaylist({
    title: '${Episode[0].title}',
    img:'${Episode[0].img}',
  })">
        <img src=${Episode[0].img} alt="" class="episode_item_img" />
        <div class="episode_item_text">${Episode[0].title}</div>
         <div class="episode_item_host">${Episode[0].host}</div>
      </div>`;
  return Episode.slice(1).reduce(
    (next, current) =>
      next +
      `<div class="episode_item" key=${current.id} onclick="changePlaylist({
    title: '${current.title}',
    img:'${current.img}',
  })">
        <img src=${current.img} alt="" class="episode_item_img" />
        <div class="episode_item_text">${current.title}</div>
        <div class="episode_item_host">${current.host}</div>
      </div>`,
    text
  );
}
function getSongs() {
  let i = 1;
  const SongList = [...songs];
  let text = `<tr onclick="changeMusic({
    id:'${SongList[0].id}',
    src:'${SongList[0].src}',
    title:'${SongList[0].title}',
    album:'${SongList[0].album}',
    artist:'${SongList[0].artist}',
    duration:'${SongList[0].duration}'
  })">
                      <td scope="row" colspan="2">${i++}.</td>
                      <td colspan="7">
                        <div class="col">
                          <div class="col_left">
                            <img
                              src="${currentPlaylist.img}"
                              alt=""
                              height="50"
                            />
                          </div>
                          <div class="col_right">
                            <div class="col_right_title">
                              ${SongList[0].title}
                            </div>
                            <div class="col_right_desc">
                              ${SongList[0].artist}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td colspan="6" pcOnly>${SongList[0].album}</td>
                      <td colspan="5" pcOnly>Aug 04, 2023</td>
                      <td colspan="2">${SongList[0].duration}</td>
                    </tr>`;
  return SongList.slice(1).reduce(
    (next, current) =>
      next +
      `<tr onclick="changeMusic({
    id:'${current.id}',
    src:'${current.src}',
    title:'${current.title}',
    album:'${current.album}',
    artist:'${current.artist}',
    duration:'${current.duration}'
  })">
                      <td scope="row" colspan="2">${i++}.</td>
                      <td colspan="7">
                        <div class="col">
                          <div class="col_left">
                            <img
                              src="https://source.unsplash.com/random/${
                                50 + i
                              }x50"
                              alt=""
                              height="50"
                            />
                          </div>
                          <div class="col_right">
                            <div class="col_right_title">
                              ${current.title}
                            </div>
                            <div class="col_right_desc">
                              ${current.artist}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td colspan="6" pcOnly>${current.album}</td>
                      <td colspan="5" pcOnly>Aug 04, 2023</td>
                      <td colspan="2">${current.duration}</td>
                    </tr>`,
    text
  );
}
function getGreetings(hr) {
  return hr < 6
    ? "Good Evening"
    : hr < 12
    ? "Good Morning"
    : hr < 17
    ? "Good Afternoon"
    : "Good Evening";
}

function setPrevPage() {
  try {
    const prev = prevRec.pop();
    const prevElement = document.getElementsByClassName("active")[0];
    const newElement = document.getElementById(prev.id);
    prevElement.classList.remove("active");
    newElement.classList.add("active");
    if (prevElement.id !== prev.id) {
      nextRec.push({
        page: currentPage,
        id: prevElement.id,
      });
    }
    currentPage = prev.page;
  } catch (error) {}
  changePages();
}
function setNextPage() {
  try {
    const next = nextRec.pop();
    currentPage = next.page;
    const nextElement = document.getElementsByClassName("active")[0];
    const newElement = document.getElementById(next.id);
    nextElement.classList.remove("active");
    newElement.classList.add("active");
  } catch (error) {}
  changePages();
}

// topbar backgroundColor transition
const topbar = document.getElementById("topbar");
const main = document.getElementById("main");
main.addEventListener("scroll", () => {
  if (main.scrollTop > 40) {
    topbar.style.backgroundColor = "var(--topbar)";
  } else {
    topbar.style.backgroundColor = "transparent";
  }
});

// switch pages

function changePages() {
  const main = document.getElementById("main");
  const mainPage = document.getElementById("main_content");
  const otherPage = document.getElementById("other_content");
  const container = document.getElementById("songList_body");
  if (currentPage !== "/") {
    mainPage.style.display = "none";
    otherPage.style.display = "block";
    main.style.background = "var(--green_gradiant)";
    container.innerHTML = getSongs();
  } else {
    mainPage.style.display = "block";
    otherPage.style.display = "none";
    main.style.background = "var(--black_gradiant)";
  }
}

// music
function changePlaylist(playlist) {
  const other_left = document.getElementById("other_left");
  other_left.innerHTML = `<img
                  src='${playlist.img}'
                  alt=""
                  height="230"
                />`;
  const other_title = document.getElementById("other_title");
  other_title.innerText = playlist.title;

  currentPlaylist = playlist;
  onChangePage({ page: "/library", id: "library" });
}
let playState = "play";
let muteState = "unmute";
const music_container = document.getElementById("audio-tag");

/* Implementation of the presentation of the audio player */
// import lottieWeb from "https://cdn.skypack.dev/lottie-web";

const playIconContainer = document.getElementById("play-icon");
const playIconContainer2 = document.getElementById("play-icon-2");
const audioPlayerContainer = document.getElementById("audio-player-container");
const seekSlider = document.getElementById("seek-slider");
const volumeSlider = document.getElementById("volume-slider");
const muteIconContainer = document.getElementById("mute-icon");
const audio = document.querySelector("audio");
const durationContainer = document.getElementById("duration");
const currentTimeContainer = document.getElementById("current-time");
let raf = null;
function changeMusic(Song) {
  music_container.src = Song.src;
  currentMusic = Song;
  let container = document.getElementById("player_left_title");
  container.innerText = Song.title;
  container = document.getElementById("player_left_desc");
  container.innerText = Song.artist;
  container = document.getElementById("player_left_img");
  container.src = currentPlaylist.img;
  playState = "play";
  playIconContainer.src = "./assets/icons/bottom/play.svg";
  playIconContainer2.src = "./assets/icons/bottom/play.svg";

  cancelAnimationFrame(raf);
  audioPlayerContainer.style.setProperty("--seek-before-width", 0 + "%");
}
playIconContainer.addEventListener("click", () => {
  if (playState === "play") {
    audio.play();
    playIconContainer.src = "./assets/icons/bottom/pause.svg";
    playIconContainer2.src = "./assets/icons/bottom/pause.svg";

    requestAnimationFrame(whilePlaying);
    playState = "pause";
  } else {
    audio.pause();
    playIconContainer.src = "./assets/icons/bottom/play.svg";
    playIconContainer2.src = "./assets/icons/bottom/play.svg";
    cancelAnimationFrame(raf);
    playState = "play";
  }
});
playIconContainer2.addEventListener("click", () => {
  if (playState === "play") {
    audio.play();
    playIconContainer.src = "./assets/icons/bottom/pause.svg";
    playIconContainer2.src = "./assets/icons/bottom/pause.svg";
    requestAnimationFrame(whilePlaying);
    playState = "pause";
  } else {
    audio.pause();
    playIconContainer.src = "./assets/icons/bottom/play.svg";
    playIconContainer2.src = "./assets/icons/bottom/play.svg";
    cancelAnimationFrame(raf);
    playState = "play";
  }
});
muteIconContainer.addEventListener("click", () => {
  if (muteState === "unmute") {
    muteIconContainer.src = "./assets/icons/bottom/sound.svg";
    audio.muted = true;
    muteState = "mute";
  } else {
    muteIconContainer.src = "./assets/icons/bottom/soundfill.svg";

    audio.muted = false;
    muteState = "unmute";
  }
});

const showRangeProgress = (rangeInput) => {
  if (rangeInput === seekSlider)
    audioPlayerContainer.style.setProperty(
      "--seek-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
  else
    audioPlayerContainer.style.setProperty(
      "--volume-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
};

seekSlider.addEventListener("input", (e) => {
  showRangeProgress(e.target);
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  if (!audio.paused) {
    cancelAnimationFrame(raf);
  }
});
seekSlider.addEventListener("change", () => {
  audio.currentTime = seekSlider.value;
  if (!audio.paused) {
    requestAnimationFrame(whilePlaying);
  }
});
volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value;
  showRangeProgress(e.target);
  // outputContainer.textContent = value;
  audio.volume = value / 100;
});
/* Implementation of the functionality of the audio player */

// const outputContainer = document.getElementById("volume-output");

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

const displayDuration = () => {
  durationContainer.textContent = calculateTime(audio.duration);
};

const setSliderMax = () => {
  seekSlider.max = Math.floor(audio.duration);
};

const displayBufferedAmount = () => {
  try {
    const bufferedAmount = Math.floor(
      audio.buffered.end(audio.buffered.length - 1)
    );
    audioPlayerContainer.style.setProperty(
      "--buffered-width",
      `${(bufferedAmount / seekSlider.max) * 100}%`
    );
  } catch (error) {}
};

const whilePlaying = () => {
  seekSlider.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  audioPlayerContainer.style.setProperty(
    "--seek-before-width",
    `${(seekSlider.value / seekSlider.max) * 100}%`
  );
  raf = requestAnimationFrame(whilePlaying);
};

if (audio.readyState > 0) {
  displayDuration();
  setSliderMax();
  displayBufferedAmount();
} else {
  audio.addEventListener("loadedmetadata", () => {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
  });
}

audio.addEventListener("progress", displayBufferedAmount);

/* Implementation of the Media Session API */
if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: currentMusic.title,
    artist: currentMusic.artist,
    album: currentMusic.album,
  });
  navigator.mediaSession.setActionHandler("play", () => {
    if (playState === "play") {
      audio.play();
      requestAnimationFrame(whilePlaying);
      playState = "pause";
      playIconContainer.src = "./assets/icons/bottom/pause.svg";
      playIconContainer2.src = "./assets/icons/bottom/pause.svg";
    } else {
      audio.pause();
      cancelAnimationFrame(raf);
      playState = "play";
      playIconContainer.src = "./assets/icons/bottom/play.svg";
      playIconContainer2.src = "./assets/icons/bottom/play.svg";
    }
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    if (playState === "play") {
      audio.play();
      requestAnimationFrame(whilePlaying);
      playState = "pause";
      playIconContainer.src = "./assets/icons/bottom/pause.svg";
      playIconContainer2.src = "./assets/icons/bottom/pause.svg";
    } else {
      audio.pause();
      cancelAnimationFrame(raf);
      playState = "play";
      playIconContainer.src = "./assets/icons/bottom/play.svg";
      playIconContainer2.src = "./assets/icons/bottom/play.svg";
    }
  });
  navigator.mediaSession.setActionHandler("seekbackward", (details) => {
    audio.currentTime = audio.currentTime - (details.seekOffset || 10);
  });
  navigator.mediaSession.setActionHandler("seekforward", (details) => {
    audio.currentTime = audio.currentTime + (details.seekOffset || 10);
  });
  navigator.mediaSession.setActionHandler("seekto", (details) => {
    if (details.fastSeek && "fastSeek" in audio) {
      audio.fastSeek(details.seekTime);
      return;
    }
    audio.currentTime = details.seekTime;
  });
  navigator.mediaSession.setActionHandler("stop", () => {
    audio.currentTime = 0;
    seekSlider.value = 0;
    audioPlayerContainer.style.setProperty("--seek-before-width", "0%");
    currentTimeContainer.textContent = "0:00";
    if (playState === "pause") {
      cancelAnimationFrame(raf);
      playState = "play";
      playIconContainer.src = "./assets/icons/bottom/play.svg";
      playIconContainer2.src = "./assets/icons/bottom/play.svg";
    }
  });
}
