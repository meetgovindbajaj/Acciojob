let arr = [
  { id: 1, name: "john", age: 18, profession: "developer" },
  { id: 2, name: "jack", age: 20, profession: "developer" },
  { id: 3, name: "karen", age: 19, profession: "admin" },
];

function PrintDeveloper() {
  arr
    .filter((emp) => emp.profession === "developer")
    .forEach((emp) => console.log(emp));
}

function addData() {
  const newEmp = { id: 4, name: "susan", age: 20, profession: "intern" };
  arr.push(newEmp);
}

function removeAdmin() {
  arr = arr.filter((emp) => emp.profession !== "admin");
}

function concatenateArray() {
  const arr2 = [
    { id: 5, name: "govind", age: 23, profession: "admin" },
    { id: 6, name: "jackie", age: 19, profession: "developer" },
    { id: 7, name: "simren", age: 22, profession: "intern" },
  ];
  arr = arr.concat(arr2);
}

function consoleArr() {
  console.log("Consoling Array Variable", arr);
}
