import datosProducto from "./datosProducto";

describe('Cypress Avanzado - Desafio 1', () => {
  const TIMEOUT = 60000;
  beforeEach(() => {
    cy.login();
  })

  it('agregar buscar y eliminar un producto', () => {
    //Ingresando a OnlineShop 
    cy.get('a[data-cy="onlineshoplink"]').click()

    //Agregando producto nuevo
    cy.contains('Add Product').click()    
    cy.get('input[data-cy="productName"]').type(datosProducto.nombre)
    cy.get('input[data-cy="productPrice"]').type(datosProducto.precio)
    cy.get('input[data-cy="productCard"]').type(datosProducto.url)
    cy.get('input[data-cy="productID"]').type(datosProducto.id)
    cy.contains('Create product').click()
    cy.contains('button', 'Close' , { timeout: TIMEOUT }).click();

    //Busco producto por su ID
    cy.get('[data-cy="search-type"]' , { timeout: TIMEOUT }).select('ID')
    cy.get('input[data-cy="search-bar"]').type(`${datosProducto.id}{enter}`)
    cy.get('[data-cy="delete-3345"]' , { timeout: TIMEOUT }).should('exist');


    //Eliminando el producto
    cy.get('[data-cy="delete-3345"]' , { timeout: TIMEOUT }).click()
    cy.contains('button', 'Delete' , { timeout: TIMEOUT }).click();
    cy.contains('button', 'Close' , { timeout: TIMEOUT }).click();

    //Busco nuevamente el producto por su ID
    cy.get('[data-cy="search-type"]' , { timeout: TIMEOUT }).select('ID')
    cy.get('input[data-cy="search-bar"]').clear().type(`${datosProducto.id}{enter}`)
    cy.get('[data-cy="delete-3345"]' , { timeout: TIMEOUT }).should('not.exist');


  })
})
  