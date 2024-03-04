//refactorizar el codigo para tomar el value del input #user despues de haber escrito el usuario invoke('val')
// Asignar el valor a un alias using as

it('Deberia validar que el usuario ingresado se encuentra en el header', () => {
    cy.visit('https://pushing-it.vercel.app/')
    cy.get('#registertoggle').dblclick()
    cy.get('#user').type('pushingit')
    cy.get('#user').invoke('val').as('userValue');
    cy.get('#pass').type('123456!')
    cy.get('#submitForm').click()
    cy.get('[id^="user_pushingit"]').invoke('text').then(function (text) { 
        expect(text).to.include(this.userValue) 
    });
});