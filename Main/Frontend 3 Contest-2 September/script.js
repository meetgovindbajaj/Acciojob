const signupForm = document.getElementById("signupForm");
const signupPage = document.getElementById("signupPage");
const profilePage = document.getElementById("profilePage");
let message = "";

const checkLoginStatus = () => {
  console.log(localStorage["userData"] ? true : false);
  if (localStorage["userData"]) window.location.href = "profile.html";
};

signupPage.onload = checkLoginStatus();

const checkValidation = () => {
  if (
    signupForm.fullname.value === "" ||
    signupForm.email.value === "" ||
    signupForm.password.value === "" ||
    signupForm.confirmPassword.value === ""
  ) {
    message = "Error: All fields are mandatory!";
    return false;
  } else if (signupForm.password.value !== signupForm.confirmPassword.value) {
    message = "Password & Confirm Password fields should contain same value!";
    return false;
  } else {
    return true;
  }
};
const handleSubmit = () => {
  if (checkValidation()) {
    formError.innerText = "";
    const data = {
      fullname: signupForm.fullname.value,
      email: signupForm.email.value,
      password: signupForm.password.value,
      token: self.crypto.randomUUID(),
    };
    localStorage.setItem("userData", JSON.stringify(data));
    window.location.href = "profile.html";
  } else {
    formError.innerText = message;
  }
  return false;
};
