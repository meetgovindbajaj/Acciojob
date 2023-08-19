const form = document.getElementById("form");
const formButton = document.getElementById("formbtn");
const tableContainer = document.getElementById("table");
const search = document.getElementById("search-box");
let formmode = 0;
let editIndex = -1;
let studentData = JSON.parse(localStorage.getItem("studentData") ?? "[]");

// functions
// adding new students on click
function addStudent() {
  const data = new FormData(form);
  let newstudent = {
    name: "no name",
    email: "no@email.com",
    gpa: "0",
    age: "16",
    degree: "BTech",
  };
  data.forEach((v, k) => (newstudent[k] = v ? v : newstudent[k]));
  studentData = [...studentData, newstudent];
  localStorage.setItem("studentData", JSON.stringify(studentData));
  form.reset();
  display(studentData);
}

// handling click ev for edit of student
function handleStudentEdit(i) {
  editIndex = i;
  formmode = 1;
  formButton.value = "Edit Student";
  form.name.value = studentData[i].name;
  form.email.value = studentData[i].email;
  form.gpa.value = studentData[i].gpa;
  form.age.value = studentData[i].age;
  form.degree.value = studentData[i].degree;
}

// editing student
function editStudent() {
  const data = new FormData(form);
  data.forEach((v, k) => (studentData[editIndex][k] = v));
  localStorage.setItem("studentData", JSON.stringify(studentData));
  display(studentData);
  editIndex = -1;
  handleReset();
}

// deleting student
function handleStudentDelete(i) {
  studentData = studentData.filter((_, index) => index !== i);
  localStorage.setItem("studentData", JSON.stringify(studentData));
  display(studentData);
}

// displaying the student data from the params array
function display(data) {
  document.getElementById("tbody").remove();
  const newTbody = document.createElement("tbody");
  if (data.length > 0)
    data.forEach((student, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td colspan="1" role="row">${i + 1}</td>
                <td colspan="5">${student.name}</td>
                <td colspan="5">${student.email}</td>
                <td colspan="2">${student.age}</td>
                <td colspan="2">${student.gpa}</td>
                <td colspan="3"><div class="cell-block">
                ${student.degree}
                <div>
                <img src="edit.svg" height="16" onclick="handleStudentEdit(${i})"></img>
                <img src="trash.svg" height="16" onclick="handleStudentDelete(${i})"></img>
                </div>
                </div></td>
                `;
      newTbody.appendChild(row);
    });
  else {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td colspan="1" role="row"> </td>
                <td colspan="5"> </td>
                <td colspan="5"> </td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="3"> </td>
                `;
    newTbody.appendChild(row);
  }
  newTbody.id = "tbody";
  tableContainer.append(newTbody);
}

// filtering the student array according to whatever is searched
function handleSearch() {
  if (!search.value) display(studentData);
  else {
    const regex = new RegExp(search.value, "gi");
    let newData = [...studentData];
    newData = newData.filter(
      (student) =>
        regex.test(student.name) ||
        regex.test(student.email) ||
        regex.test(student.degree)
    );
    display(newData);
  }
}

// handling what to do when form is reset
function handleReset() {
  formmode = 0;
  formButton.value = "Add Student";
  form.reset();
}

// main logic
document.onload = display(studentData);
search.addEventListener("keyup", handleSearch);
form.addEventListener("reset", handleReset);
formButton.addEventListener("click", () =>
  formmode === 0 ? addStudent() : editStudent()
);
