describe("Login", () => {
  it("tests Login", () => {
    cy.viewport(958, 738);
    cy.visit("http://localhost:5173/");
    cy.get("header div.MuiStack-root > a.MuiButton-contained").click();
    cy.get("#_r_1a_").type("kimchi100@gmail.com");
    cy.get("#_r_1b_").type("kimchi100");
    cy.get("div > div > div div > div:nth-of-type(1) > div").click();
    cy.get("#_r_1a_").type("kimchi100@gmail.com");
    cy.get("#_r_1b_").click();
    cy.get("#root > div > div > div").click();
    cy.get("#_r_1b_").type("kimchi100");
    cy.get("#root > div > div button").click();
    cy.location("href").should("eq", "http://localhost:5173/");
  });
});
//# recorderSourceMap=BCBDBEBFBGBHBIBJBKBLBMC
