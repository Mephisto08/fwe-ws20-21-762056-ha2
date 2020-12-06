import { taskBuilder } from "../builder/task";

describe("TaskOverviewPage", () => {
  const task = taskBuilder({})();
  it("create a task", () => { 
      cy.visit("/");
      cy.screenshot();
      cy.findByTestId(/create-task-button/i).click();
      cy.findByLabelText(/name/i).type(task.name);
      cy.findByLabelText(/beschreibung/i).type(task.description);
      cy.findByText("Erstelle einen Task!").click();
      cy.findByTestId("task-item").should("have.length", 1);
      cy.screenshot();
  });

  it("filter tasks bad Filter", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/filter-button/i).click();
    cy.findByLabelText(/Task Name/i).type("Name");
    cy.findByText("Filter anwenden!").click();
    cy.findByTestId("task-item").should("have.length", 0);
    cy.screenshot();
  });

  it("create label", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/create-label-button/i).click();
    cy.findByLabelText(/name/i).type("Label 1");
    cy.findByText("Erstelle ein Label!").click();
    cy.findByTestId(/show-label-button/i).click();
    cy.findByTestId("label-list").find("li").should("have.length", 1);
    cy.screenshot();
  });

  it("delete Label bad name", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/delete-label-button/i).click();
    cy.findByLabelText(/name/i).type("Lable 1");
    cy.findByText("Lösche Label!").click();
    cy.findByTestId(/show-label-button/i).click();
    cy.findByTestId("label-list").find("li").should("have.length", 1);
    cy.screenshot();
  });
  
});

