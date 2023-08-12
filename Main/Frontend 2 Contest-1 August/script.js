let arr = [
  { id: 1, name: "john", age: 18, profession: "developer" },
  { id: 2, name: "jack", age: 20, profession: "developer" },
  { id: 3, name: "karen", age: 19, profession: "admin" },
];
let empCount = 3;
const cat = ["developer", "intern", "admin"];
const sol = document.getElementById("sol");

function PrintDeveloper() {
  const devArr = arr.filter((emp) => emp.profession === "developer");
  consoleArr("Consoling Developer Array Variable", devArr);
}

function addData() {
  arr.push(generateRandomEmp());
  consoleArr("Adding New Employee and Consoling Array Variable");
}

function removeAdmin() {
  arr = arr.filter((emp) => emp.profession !== "admin");
  consoleArr("Removing Admins and Consoling Array Variable");
}

function concatenateArray() {
  const arr2 = Array.from({ length: generateRandom(4, 8) }).map((_) =>
    generateRandomEmp()
  );
  arr = arr.concat(arr2);
  consoleArr("Concatinated Array and Consoling Array Variable");
}

function consoleArr(message = "Consoling Array Variable", array = arr) {
  console.log(message, ...array);
  sol.innerHTML = `<ul>
      ${array.map(
        (emp, i) => `<li key=${i + emp.id}>${JSON.stringify(emp, null, 2)}</li>`
      )}
    </ul>`;
}

function generateRandom(start = 1, stop = 100) {
  return Math.floor(Math.random() * (stop - start) + start);
}

function generateRandomName() {
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const nameLength = Math.floor(Math.random() * 4) + 4;
  let name = "";
  let useVowel = Math.random() < 0.5;
  for (let i = 0; i < nameLength; i++) {
    if (useVowel) name += vowels[generateRandom(0, 5)];
    else name += consonants[generateRandom(0, 21)];
    useVowel = !useVowel;
  }
  return name;
}

function generateRandomEmp() {
  return {
    id: ++empCount,
    name: generateRandomName(),
    age: generateRandom(17, 31),
    profession: cat[generateRandom(0, 3)],
  };
}
