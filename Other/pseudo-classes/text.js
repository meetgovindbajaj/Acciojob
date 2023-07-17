const color_white = "rgb(255, 255, 255)";
cy.window().then((window) => {
  cy.get("p")
    .first()
    .then((element) => {
      const first_child = window.getComputedStyle(element[0], ":first-child");
      const color = first_child.getPropertyValue("color");
      expect(color).to.equal(color_white);
    });
  const color_red = "rgb(255, 0, 0)";
  cy.get("p")
    .last()
    .then((element) => {
      const last_child = window.getComputedStyle(element[0], ":last-child");
      const color = last_child.getPropertyValue("color");
      expect(color).to.equal(color_red);
    });
});
