// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const config = {
	initialBet: '0.01',
	maxBet: '150.00',
};

Cypress.Commands.add('closeModalIfExists', () => {
	cy.get('body').then(($body) => {
		if ($body.find('.modal__wrapper').length) {
			cy.get('.modal__wrapper').find('button').eq(0).click();
		}
	});
});

Cypress.Commands.add('getContainer', () => {

	if (Cypress.$('mat-dialog-container').length) {

		return cy.get('mat-dialog-container');
	}

	return cy.get('body');
});

Cypress.Commands.add('initBet', (bet) => {
	let coin1 = '';
	let coin2 = '';
	let coin3 = '';

	//Coin1
	cy.getContainer()
		.find('.previous-rolls-item')
		.eq(7)
		.find('div')
		.invoke('attr', 'class')
		.then((text) => {
			if (text.includes('coin-t')) {
				coin1 = 'coin-t';
			} else if (text.includes('coin-ct')) {
				coin1 = 'coin-ct';
			} else {
				coin1 = 'dices';
			}

			//Coin2
			cy.getContainer()
				.find('.previous-rolls-item')
				.eq(8)
				.find('div')
				.invoke('attr', 'class')
				.then((text) => {
					if (text.includes('coin-t')) {
						coin2 = 'coin-t';
					} else if (text.includes('coin-ct')) {
						coin2 = 'coin-ct';
					} else {
						coin2 = 'dices';
					}

					//Coin3
					cy.getContainer()
						.find('.previous-rolls-item')
						.eq(9)
						.find('div')
						.invoke('attr', 'class')
						.then((text) => {
							if (text.includes('coin-t')) {
								coin3 = 'coin-t';
							} else if (text.includes('coin-ct')) {
								coin3 = 'coin-ct';
							} else {
								coin3 = 'dices';
							}

							cy.closeModalIfExists();

							if (coin1 !== 'dices' && coin1 === coin2 && coin2 === coin3) {
								cy.getContainer().get('input').clear().type(bet);

								if (coin1 === 'coin-t') {
									cy.get('.text-center > .font-numeric')
										.invoke('text')
										.then((time) => {
											const waitingMs = (parseInt(time) + 10) * 1000;

											cy.getContainer().find('.bet-btn').eq(0).click();
											cy.wait(waitingMs);
										});

									cy.getContainer()
										.find('.previous-rolls-item')
										.eq(9)
										.find('div')
										.invoke('attr', 'class')
										.then((text) => {
											if (text.includes('coin-ct')) {
												//WIN
												cy.log('[green] WIN');
												cy.initBet(config.initialBet);
											} else {
												//LOSE
												cy.log('[red] LOSE');
												cy.forceBet((bet * 2).toPrecision(2), 'coin-ct');
											}
										});
								} else {
									cy.get('.text-center > .font-numeric')
										.invoke('text')
										.then((time) => {
											const waitingMs = (parseInt(time) + 7) * 1000;

											cy.getContainer().find('.bet-btn').eq(2).click();
											cy.wait(waitingMs);
										});

									cy.getContainer()
										.find('.previous-rolls-item')
										.eq(9)
										.find('div')
										.invoke('attr', 'class')
										.then((text) => {
											if (text.includes('coin-t')) {
												//WIN
												cy.log('[green] WIN');
												cy.initBet(config.initialBet);
											} else {
												//LOSE
												cy.log('[red] LOSE');
												// cy.initBet((bet * 2).toPrecision(2));
												cy.forceBet((bet * 2).toPrecision(2), 'coin-t');
											}
										});
								}
							} else {
								cy.get('.text-center > .font-numeric')
									.invoke('text')
									.then((time) => {
										const waitingMs = (parseInt(time) + 10) * 1000;
										cy.wait(waitingMs);
										cy.initBet(config.initialBet);
									});
							}
						});
				});
		});
});

Cypress.Commands.add('forceBet', (bet, coin) => {
	cy.closeModalIfExists();
	cy.getContainer().get('input').clear().type(bet);

	cy.get('.text-center > .font-numeric')
		.invoke('text')
		.then((time) => {
			const waitingMs = (parseInt(time) + 10) * 1000;

			cy.getContainer()
				.find('.bet-btn')
				.eq(coin === 'coin-ct' ? 0 : 2)
				.click();
			cy.wait(waitingMs);

			cy.getContainer()
				.find('.previous-rolls-item')
				.eq(9)
				.find('div')
				.invoke('attr', 'class')
				.then((text) => {
					if (text.includes(coin)) {
						//WIN
						cy.log('[green] WIN');
						cy.initBet(config.initialBet);
					} else {
						//LOSE
						cy.log('[red] LOSE');

						if (bet * 2 > parseFloat(config.maxBet)) {
							cy.log('[red] RESET');
							cy.initBet(config.initialBet);
						} else {
							cy.forceBet((bet * 2).toPrecision(2), coin);
						}
					}
				});
		});
});
