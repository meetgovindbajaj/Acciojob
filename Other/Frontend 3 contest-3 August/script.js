// const form = document.getElementById("form");
// form.onsubmit = (e) => {
//   e.preventDefault();
//   const data = new FormData(form);
//   data.forEach((v, k) => console.log(k, v));
// };

const form = document.getElementById("signupForm");
const message = document.getElementById("message");
let person = {
  fullname: "",
  email: "",
  password: "",
};
// handle signing up
form.onsubmit = (e) => {
  e.preventDefault();
  try {
    if (e.target.password.value === e.target.confirmPassword.value) {
      for (const key in person) {
        if (Object.hasOwnProperty.call(person, key)) {
          person[key] = e.target[key].value;
        }
      }
      message.innerText = "Signup success";
      message.setAttribute("data-success", "");
      localStorage.setItem(
        "data",
        JSON.stringify({
          isAuth: true,
          person,
        })
      );
      setTimeout(() => {
        location.replace("./profile.html");
      }, 3000);
    } else {
      throw new Error("error occured");
    }
  } catch (err) {
    message.innerText = err.message;
    message.setAttribute("data-error", "");
  }
};

form.onreset = () => {
  message.innerText = "";
  message.removeAttribute("data-success");
  message.removeAttribute("data-error");
};
