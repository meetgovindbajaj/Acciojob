const profilePage = document.getElementById("profilePage");

const checkLoginStatus = () => {
  if (localStorage["userData"]) return false;
  return true;
};

let userData = null;
let dummyData = {
  fullname: "Govind Bajaj",
  email: "govind.bajaj@accio.com",
  password: "notpassword",
  token: self.crypto.randomUUID(),
};
const getData = () => {
  if (checkLoginStatus()) return (window.location.href = "index.html");
  userData = JSON.parse(localStorage.getItem("userData")) ?? dummyData;
  const container = document.querySelector(".dataContainer");
  container.innerHTML = `
    <div class="box" ><span>Full Name : </span>${userData.fullname}</div>
    <div class="box" ><span>Email : </span>${userData.email}</div>
    <div class="box" ><span>Password : </span>${userData.password}</div>
    <div class="box" ><span>Token : </span>${userData.token}</div>`;
};

const handleLogout = () => {
  localStorage.removeItem("userData");
  return (window.location.href = "index.html");
};

onload = getData();
