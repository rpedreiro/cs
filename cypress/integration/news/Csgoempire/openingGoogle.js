import { When, Then } from "cypress-cucumber-preprocessor/steps";

When('I visit the {string} page', (url) => cy.visit(url, {failOnStatusCode: false}));

Then(/^I should win money$/, () => {
  cy.clearCookie('cf_clearance');
  cy.setCookie('cf_clearance', 'TE5uNZAQvAA.KDgixydg.seX0wAC1LY_w3GXOaPNYWg-1703785278-0-2-47420faf.5d20337d.9af2c2ea-160.0.0', {
    domain: '.csgoempire.com',
  });

  cy.wait(5000);
  cy.getContainer().find('input').eq(0).clear().type('Flavio02525');
  cy.wait(500);
  cy.getContainer().find('input').eq(1).clear().type('Feromonas2');
  cy.wait(500);
  cy.getContainer().find('.newlogindialog_SubmitButton_2QgFE').click();
  cy.wait(12000);
  cy.getContainer().find('.btn_green_white_innerfade').click();
  cy.wait(1000);
  cy.getContainer().find('.btn_green_white_innerfade').click();

  cy.wait(20000);

  cy.initBet('0.01');
});
