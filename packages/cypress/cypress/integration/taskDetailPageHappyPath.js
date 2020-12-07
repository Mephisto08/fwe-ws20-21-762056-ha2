import { taskBuilder } from "../builder/task";

describe("TaskDetailPage", () => {
  const task = taskBuilder({})();

  it("create label", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/create-label-button/i).click();
    cy.findByLabelText(/name/i).type("Label 1");
    cy.findByText("Erstelle ein Label!").click();
    cy.findByTestId(/show-label-button-O/i).click();
    cy.findByTestId("label-list").find("li").should("have.length", 1);
    cy.screenshot();
  });

  it("create task go to DetailPage", () => { 
      cy.visit("/");
      cy.screenshot();
      cy.findByTestId(/create-task-button/i).click();
      cy.findByLabelText(/name/i).type(task.name);
      cy.findByLabelText(/beschreibung/i).type(task.description);
      cy.findByText("Erstelle einen Task!").click();
      cy.findByTestId("task-item").should("have.length", 1);
      cy.screenshot();
      cy.findByTestId(/task-item-flex/i).click();
      cy.screenshot();
      cy.url().should("contain", "/task/");
      cy.screenshot();
  });

  it("edit Task", () => { 
    cy.screenshot();
    cy.findByTestId(/edit-task-button/i).click();
    cy.findByLabelText(/name/i).type("Update");
    cy.findByLabelText(/beschreibung/i).type("Update");
    cy.findByText("Bestätige die Änderungen!").click();
    cy.screenshot();
    cy.findByTestId(/task-name/i).should('have.text', task.name + "Update");
    cy.findByTestId(/task-description/i).should('have.text', task.description + "Update");
    cy.screenshot();
  });

  it("create Tracking", () => { 
    cy.screenshot();
    cy.findByTestId(/create-tracking-button/i).click();
    cy.findByLabelText(/beschreibung/i).type("Erstes Tracking");
    cy.findByText("Erstelle ein Tracking für diesen Task!").click();
    cy.screenshot();
    cy.findByTestId("tracking-item").should("have.length", 1);
    cy.screenshot();
  });

  it("edit Tracking", () => { 
    cy.screenshot();
    cy.findByTestId(/edit-tracking-button/i).click();
    cy.findByLabelText(/beschreibung/i).type(" Update");
    cy.findByText("Bestätige die Änderungen").click();
    cy.screenshot();
    cy.findByTestId(/tracking-description/i).should('have.text', 'Erstes Tracking Update');
    cy.screenshot();
  });

  it("show Labels", () => { 
    cy.screenshot();
    cy.findByTestId(/show-label-button-D/i).click();
    cy.findByTestId("label-list").find("li").should("have.length", 1);
    cy.screenshot();
  });

  it("delete tracking", () => {
    cy.screenshot();
    cy.findByTestId(/delete-tracking-button/i).click();
    cy.findByTestId("tracking-item").should("have.length", 0);
    cy.screenshot();
  });
});

