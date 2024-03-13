import datosProducto from "./datos";
import { TIMEOUT } from "../../../fixtures/constantes"

describe("Desafio 2", () => {

  before(() => {
    cy.login();
    cy.visit('');
  });

  it('Buscar, eliminar, crear y editar mediante HTTP request', () => {
    cy.eliminarProducto(datosProducto.producto.id);
    cy.crearProducto(datosProducto.producto);
    cy.editarProducto(datosProducto.producto2.id , datosProducto.producto2);

  it('Verificar datos editados', () => {
    //Ingresando a OnlineShop
    cy.login1();
    cy.get('a[data-cy="onlineshoplink"]', { timeout: TIMEOUT }).click()

    //Busco producto por su ID
    cy.get('[data-cy="search-type"]', { timeout: TIMEOUT }).select('ID')
    cy.get('input[data-cy="search-bar"]').type(`${datosProducto.producto.id}{enter}`)
    cy.get('[data-cy="name"]').should('be.visible');

    // Verifico los datos modificados en la edicion    
    cy.get('[data-cy="name"]').should('contain', `${datosProducto.producto2.name}`);
    cy.get('[data-cy="price"]').should('contain', `${datosProducto.producto2.price}`);

  })
  
})
})




