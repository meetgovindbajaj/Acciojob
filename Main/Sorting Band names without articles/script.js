const ul = document.getElementById("opt");
let touristSpots = [...ul.getElementsByTagName("li")].map(
  (list) => list.innerText
);
function dynamicSort(a, b) {
  const regex = new RegExp("(^(an|a|the)\\s*)", "i");
  let one = regex.test(a) ? a.split(regex) : [a],
    two = regex.test(b) ? b.split(regex) : [b];
  one = one[one.length - 1].toUpperCase();
  two = two[two.length - 1].toUpperCase();
  return one < two ? -1 : one > two ? 1 : 0;
}
touristSpots.sort(dynamicSort);
document.getElementById("band").innerHTML = touristSpots
  .map((list) => {
    return `<li>${list}</li>`;
  })
  .join("");
