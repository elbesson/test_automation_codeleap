import elements_login from '../../fixtures/elementsLoginScreen';
import elements_home_screen from '../../fixtures/elementsHomeScreen';

context('Automation Tests to codeleap', () => {
  describe('Assertions on login screen', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    })

    it(`Shouldn't log in with empty field`, () => {
      cy.get(elements_login.input_login).clear();
      cy.get(elements_login.button_login).should('be.disabled');
    })

    it(`Shouldn't log in with "space" character`, () => {
      cy.get(elements_login.input_login).type(' ')
      cy.get(elements_login.button_login).click()
    })

    it(`Should log in with special characters`, () => {
      cy.get(elements_login.input_login).type('*****')
      cy.get(elements_login.button_login).click()
      cy.get(elements_home_screen.form_home_screen).should('be.visible')
    })

    it(`Should log in with valid data`, () => {
      cy.fixture('data.json').then((data) => {
        cy.get(elements_login.input_login).type(data.login_data.name);
        cy.get(elements_login.button_login).click();
        cy.get(elements_home_screen.form_home_screen).should('be.visible')
      })
    })
  })

  describe('Assertions on home screen with valid user', () => {
    before(() => {
      cy.fixture('data.json').then((data) => {
        cy.visit('http://localhost:3000/');
        cy.get(elements_login.input_login).type(data.login_data.name);
        cy.get(elements_login.button_login).click();
      })
    })
    it(`CRUD - Should Create, Edit, Delete posts with valid data`, () => {
      cy.fixture('data.json').then((data) => {
        cy.get(elements_home_screen.title_field_form).type('test');
        cy.get(elements_home_screen.content_field_form).type('test');
        cy.get(elements_home_screen.create_button_home).click();
        cy.get(elements_home_screen.header_post).should('have.text', 'test');
        cy.get(elements_home_screen.username_post).should('have.text', data.login_data.username);
        cy.get(elements_home_screen.content_post).should('have.text', 'test');
        cy.get(elements_home_screen.edit_button_home).click();
        cy.get(elements_home_screen.title_input_edit).type(' edit');
        cy.get(elements_home_screen.content_input_edit).type(' edit');
        cy.get(elements_home_screen.save_edit_button).click();
        cy.get(elements_home_screen.delete_form).click();
        cy.get(elements_home_screen.header_post).should('not.exist')
      })
    })
  })
})