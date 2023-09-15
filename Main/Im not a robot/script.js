let isSelected = [];

const loadImages = () => {
  let images = [];
  const imagesContainer = document.querySelector(".imagesContainer");
  for (let i = 0; i < 5; i++) {
    const elem = `https://source.unsplash.com/random/200x30${i}`;
    const img = document.createElement("img");
    img.className = `img img${i + 1}`;
    img.src = elem;
    img.height = "300";
    img.width = "200";
    img.id = "img_" + i;
    img.onclick = handleClick;
    images[i] = img;
  }
  const randomImg = images[Math.round(Math.random() * 4 + 1) - 1].cloneNode();
  randomImg.id = "img_" + 5;
  randomImg.onclick = handleClick;
  images.splice(Math.round(Math.random() * 4 + 1), 0, randomImg);
  imagesContainer.innerHTML = "";
  imagesContainer.append(...images);
};

const handleClick = (e) => {
  e.preventDefault();
  if (isSelected.length < 2) {
    isSelected.push(e.target);
    e.target.setAttribute("data-selected", "");
    document.getElementById("reset").style.display = "inline";
  }
  if (isSelected.length === 2)
    document.getElementById("verify").style.display = "inline";
};

const handleReset = () => {
  for (let i = 0; i < isSelected.length; i++)
    isSelected[i].removeAttribute("data-selected", "");
  isSelected.length = 0;
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").innerText = "";
  loadImages();
};

const handleVerify = () => {
  const classInit = isSelected[0].classList[1];
  document.getElementById("para").innerText =
    isSelected[1].classList[1] === classInit
      ? "You are a human. Congratulations!"
      : (document.getElementById("para").innerText =
          "We can't verify you as a human. You selected the non-identical tiles.");
  document.getElementById("verify").style.display = "none";
};

loadImages();
/*.img1 {
  content: url("https://picsum.photos/id/237/200/300");
}

.img2 {
  content: url("https://picsum.photos/seed/picsum/200/300");
}

.img3 {
  content: url("https://picsum.photos/200/300?grayscale");
}
.img4 {
  content: url("https://picsum.photos/200/300/");
}
.img5 {
  content: url("https://picsum.photos/200/300.jpg");
}

img {
  margin: 10px;
  border: 5px solid #555;
  width: 10%;
}

.flex {
  display: flex;
  justify-content: center;
}

.selected {
  border: 5px solid rgb(0, 195, 255);
}

p {
  text-align: center;
}

button {
  margin: 20px;
}
*/
