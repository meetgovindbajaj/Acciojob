function togglemenu() {
  const collapsible = document.getElementById("collapse");
  const isOpen = collapsible.getAttribute("data-collapse") === "true";
  collapsible.setAttribute("data-collapse", isOpen ? "false" : "true");
}
