import datosProducto from "./datos";
import datosCard from "./datoscard";
import { TIMEOUT } from "../../../fixtures/constantes"

describe("Desafio 3", () => {

  before(() => {
    cy.login();
    cy.visit('');
  });

  it('Buscar, eliminar, crear y editar mediante HTTP request', () => {
    cy.eliminarProducto(datosProducto.producto2.id);
    cy.eliminarProducto(datosProducto.producto3.id);
    cy.crearProducto(datosProducto.producto2);
    cy.crearProducto(datosProducto.producto3);
  })

  it('Agrego productos al carrito', () => {
    //Ingresando a OnlineShop
    cy.login();
    cy.visit('');
    cy.get('a[data-cy="onlineshoplink"]', { timeout: TIMEOUT }).click()

    //Busco producto 2 por su ID
    cy.buscarProducto(datosProducto.producto2.id, datosProducto.producto2.name);

    //Agrego producto 2 al carrito de compras
    cy.agregarCarrito();

    //Busco producto 3 por su ID
    cy.buscarProducto(datosProducto.producto3.id, datosProducto.producto2.name);

    //Agrego producto 3 al carrito de compras
    cy.agregarCarrito();

    //Busco producto 2 por su ID
    cy.buscarProducto(datosProducto.producto2.id, datosProducto.producto2.name);

    //Agrego producto 2 al carrito de compras
    cy.agregarCarrito();

    //Busco producto 3 por su ID
    cy.buscarProducto(datosProducto.producto3.id, datosProducto.producto3.name);

    //Agrego producto 3 al carrito de compras
    cy.agregarCarrito();

    //Voy al Sopping Cart
    cy.get('[data-cy="goShoppingCart"]', { timeout: TIMEOUT }).click();

    //Hago el Checkout
    cy.get('[data-cy="goCheckout"]', { timeout: TIMEOUT }).click();

    //Completo datos de la compra y reviso datos en la base de datos
    cy.get('[data-cy="firstName"]', { timeout: TIMEOUT }).type(datosCard.card.firstName);
    cy.get('[data-cy="lastName"]', { timeout: TIMEOUT }).type(datosCard.card.lastName);
    cy.get('[data-cy="cardNumber"]', { timeout: TIMEOUT }).type(datosCard.card.cardNumber);
    cy.get('[data-cy="purchase"]', { timeout: TIMEOUT }).click();
    cy.get('[data-cy="sellId"]', { timeout: TIMEOUT }).invoke('text').then(function (sellId) {
      this.sellId = sellId
      const query = `SELECT * FROM public."purchaseProducts" INNER JOIN public."sells" ON public."purchaseProducts".sell_id = public."sells".id WHERE sell_id=${this.sellId};`
      cy.task("connectDB", query).then(function (result) {
      cy.log(result);
      expect(result[0].id).to.equal(parseInt(this.sellId));
      expect(result[1].id).to.equal(parseInt(this.sellId));
      expect(result[0].cardNumber).to.equal(datosCard.card.cardNumber);
      expect(result[1].cardNumber).to.equal(datosCard.card.cardNumber);

  })
})
})
})





