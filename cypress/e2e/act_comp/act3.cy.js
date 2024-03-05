//Interceptar la llamada que agrega una area al test y el response
// Completar la tarea. Validar el status response de la llamada que edita la tarea 

it('Actividad complementaria 3', () => {
    cy.visit('https://pushing-it.vercel.app/')
    cy.get('#registertoggle').dblclick()
    cy.get('#user').type('pushingit')
    cy.get('#pass').type('123456!')
    cy.get('#submitForm').click()
    cy.get('[data-cy="todolistlink"]').click()
    cy.get('[data-cy="removeAll"]').should('be.visible').click()
    cy.get('[data-cy="task"]').type("Tarea {enter}")

    //INTERCEPTANDO EL POST
    cy.intercept('POST', '/api/save-task').as('postTask');
    cy.wait('@postTask').its('response.statusCode').should('be.equal', 201);


    cy.contains('p', 'Tarea', { timeout: 10000 }).should('be.visible').click()

    //INTERCEPTANDO EL PATCH
    cy.intercept('PATCH', '/api/task/**').as('patchTask');
    cy.wait('@patchTask').its('response.statusCode').should('be.equal', 202);


    cy.contains('p', 'Tarea', { timeout: 10000 }).should('attr', 'style', 'text-decoration: line-through;')
});