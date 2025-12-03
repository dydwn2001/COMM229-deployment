describe("RegisterTest", () => {
  it("tests RegisterTest", () => {
    cy.viewport(1520, 729);
    cy.visit("http://localhost:5173/");
    cy.get("header a.MuiButton-outlined").click();
    cy.get("#_r_g_").click();
    cy.get("#_r_g_").type("dydwn12");
    cy.get("#_r_h_").click();
    cy.get("#_r_h_").type("kimchi100@gmail.com");
    cy.get("#_r_i_").click();
    cy.get("#_r_i_").type("kimchi100");
    cy.get("#_r_j_").click();
    cy.get("#_r_j_").type("kimchi100");
    cy.get("#root > div > div button").click();
    cy.location("href").should("eq", "http://localhost:5173/");
  });
});
//# recorderSourceMap=BCBDBEBFBGBHBIBJBKBLBMBNC
