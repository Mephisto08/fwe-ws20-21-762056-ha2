import { taskBuilder } from "../builder/task";

describe("TaskOverviewPage", () => {
  beforeEach(() => {
    cy.visit("/");
    // now this runs prior to every test
    // across all files no matter what
    //cy.resetDb()
  })
  it("can create a new task", () => {
      const task = taskBuilder({})();
      cy.screenshot();
      cy.findByTestId(/create-task-button/i).click();
      cy.findByLabelText(/name/i).type(task.name);
      cy.findByLabelText(/beschreibung/i).type(task.description);
      cy.findByText("Erstelle einen Task!").click();
      cy.findByTestId("task-item-list").find('li').should("have.length", 4);
      cy.findByTestId("task-item-list").find('li').
      cy.findByTestId("task-item").should("have.length", 1);
      cy.screenshot();
  });

 
});

