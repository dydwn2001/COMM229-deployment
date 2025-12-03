describe("EditProfile", () => {
  it("tests EditProfile", () => {
    cy.viewport(958, 738);
    cy.visit("http://localhost:5173/");
    cy.get("div.MuiStack-root > a:nth-of-type(2)").click();
    cy.get("#_r_v_").click();
    cy.get("#_r_v_").type("dydwn12000");
    cy.get("#root > div > div button.MuiButton-contained").click();
  });
});
//# recorderSourceMap=BCBDBEBFBGBHB
