import { taskBuilder } from "../builder/task";

describe("TaskDetailPage", () => {
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


});

