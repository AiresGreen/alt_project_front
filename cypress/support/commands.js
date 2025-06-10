
const selectors = {
    langueCard: '[data-testid="language-card"]',
    langueTrigger: '[data-cy="langueFormTrigger"]',
    langueInput: 'input[list="langues-list"]',
    langueOption: (langue) => `[data-cy="langue-option-${langue.langEnglishName}"]`,
    niveauTrigger: '[data-cy="levelsFormTrigger"]',
    niveauOption: (level) => `[data-cy="level-option-${level}"]`,
    cardTitleLangue: '[data-cy="card-title-langue"]',
    hSafed: '[data-cy="h-safed"]',
    confirmButton: '[data-cy="confirm-button"]',
    changeButton: '[data-cy="change-button"]',
    deleteButton: '[data-cy="delete-button"]',
    safedLanguage: '[data-cy="card-title-safed"]',
};


Cypress.Commands.add('login', () => {
        cy.visit('/login');

        // Remplir le formulaire
        cy.get('input[type="email"]').type('admin@btj.io');
        cy.get('input[type="password"]').type('AdminPassword123!');


        cy.get('[data-cy="connecter"]').click();
        // Vérifie qu’on est redirigé vers l’accueil
        cy.url().should('match', /localhost:5173\/?$/);
        cy.wait(1000);
});

Cypress.Commands.add('goToLanguages', () => {
    // Clique sur l’avatar du profil (navbar)
    cy.get('[data-cy="avatar"]', { timeout: 10000 }).click();

    // Clique sur "Voir mon profil"
    cy.get('[data-cy="voir-profil"]').click();

    // Vérifie qu’on est bien sur la page profil
    cy.url().should('include', '/profile-page');



    //ouvrir la page des langues parlées
    cy.get('[data-cy="voir"]').click();
    cy.wait(2000);

//==verifier affichage correct de la page d'ajout + Interaction avec "langue" et le selecteur

    cy.get(selectors.cardTitleLangue, ).should('contain.text', 'Ajouter une nouvelle langue');
    cy.get(selectors.hSafed).should('contain.text', 'Langues enregistrées');

});

Cypress.Commands.add('selectLevel', (level) => {
    cy.get(selectors.niveauTrigger).click().wait(300);
    cy.get(selectors.niveauOption(level)).click({ force: true });
    cy.get(selectors.niveauTrigger).should('contain.text', level);

});

Cypress.Commands.add('selectLangue', (langue) => {
    cy.get(selectors.langueOption({ langEnglishName: langue }), { timeout: 2000 })
        .should('contain.text', langue)
        .click({ force: true });

    cy.get(selectors.langueTrigger).should('contain.text', langue);
});


Cypress.Commands.add('changeLevel', (level) => {
    cy.get(selectors.langueCard).should('contain.text', 'Russian')
    cy.get(selectors.changeButton).should('contain.text', 'Modifier').click().wait(300);
    cy.get(selectors.niveauTrigger).click().wait(300);
    cy.get(selectors.niveauOption(level)).click({ force: true });
    cy.get(selectors.niveauTrigger).should('contain.text', level);

})

Cypress.Commands.add('changeLanguage', (langue) =>{
    cy.get(selectors.langueCard).should('contain.text', 'Russian')
    cy.get(selectors.changeButton).should('contain.text', 'Modifier').click().wait(300);
    cy.get(selectors.langueTrigger).type(langue);
    cy.get(selectors.langueOption({ langEnglishName: langue }), { timeout: 2000 })
        .should('contain.text', langue)
        .click({ force: true });
    cy.get(selectors.langueTrigger).should('contain.text', langue);
})


