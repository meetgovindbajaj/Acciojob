function volume_sphere() {
  //Write your code here
  const rad = document.getElementById("radius").value;
  const vol = document.getElementById("volume");
  vol.value = ((4 / 3) * 3.1415928 * rad * rad * rad).toFixed(4);
}
