const data = JSON.parse(localStorage.getItem("data"));
fullname.innerText = "Full Name: " + data.person.fullname;
email.innerText = "Email: " + data.person.email;
password.innerText = "Password: " + data.person.password;
