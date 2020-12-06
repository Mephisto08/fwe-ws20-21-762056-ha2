import { taskBuilder } from "../builder/task";

describe("DashboardPage", () => {
  it("can create a new task", () => {
      const task = taskBuilder({})();
      cy.visit("/");
      cy.screenshot();
      cy.findByTestId(/create-task-button/i).click();
      cy.findByLabelText(/name/i).type(task.name);
      cy.findByLabelText(/beschreibung/i).type(task.description);
      cy.findByText("Erstelle einen Task!").click();
      cy.findByTestId("task-item").should("have.length", 1);
      cy.screenshot();
  });
});