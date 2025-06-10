
const selectors = {
    langueCard: '[data-testid="language-card"]',
    langueTrigger: '[data-cy="langueFormTrigger"]',
    langueInput: 'input[list="langues-list"]',
    langueOption: (langue) => 'data-cy={`langue-option-${langue.langEnglishName}`}',
    niveauTrigger: '[data-cy="levelsFormTrigger"]',
    niveauOption: (level) => `[data-cy="level-option-${level}"]`,
    cardTitleLangue: '[data-cy="card-title-langue"]',
    cardTitleSafed: '[data-cy="card-title-safed"]',
    confirmButton: '[data-cy="confirm-button"]',
    changeButton: '[data-cy="change-button"]',
    deleteButton: '[data-cy="delete-button"]',
};


Cypress.Commands.add('login', () => {
        cy.visit('/login');

        // Remplir le formulaire
        cy.get('input[type="email"]').type('admin@btj.io');
        cy.get('input[type="password"]').type('AdminPassword123!');


        cy.get('[data-cy="connecter"]').click();
        // Vérifie qu’on est redirigé vers l’accueil
        cy.url().should('match', /localhost:5173\/?$/);

    // Clique sur l’avatar du profil (navbar)
    cy.get('[data-cy="avatar"]', { timeout: 10000 }).click();

    // Clique sur "Voir mon profil"
    cy.get('[data-cy="voir-profil"]').click();

    // Vérifie qu’on est bien sur la page profil
    cy.url().should('include', '/profile-page');



    //ouvrir la page des langues parlées
    cy.get('[data-cy="voir"]').click();
    cy.wait(3000);
});

Cypress.Commands.add('goToLanguages', () => {
    // Avatar
    cy.get('[data-cy="avatar"]').click();

    // Lien vers "Voir mon profil"
    cy.get('[data-cy="voir-profil"]').click();

    // Bouton "Voir" pour langues
    cy.get('[data-cy="voir"]').click();

    // Vérifie qu’on est bien sur la page
    cy.contains('Langues enregistrées').should('exist');
});

Cypress.Commands.add('selectLevel', (level) => {
    cy.get('[data-cy="levelsFormTrigger"]').click();
    cy.wait(300);
    cy.get(`[data-cy="level-option-${level}"]`).click({ force: true });
    cy.get('[data-cy="levelsFormTrigger"]').should('contain.text', level);
});

Cypress.Commands.add('selectLangue', (langue) => {
    cy.get('[data-cy="langueFormTrigger"]').click();
    cy.get('[data-cy="langue-option-Russian"]', { timeout: 3000 })
        .should('exist')
        .click({ force: true });

});

Cypress.Commands.add('changeLevel', (level) => {
    cy.get(selectors.langueCard).should('contain.text', 'Russian')
    cy.get(selectors.changeButton).click().wait(300);
    cy.get(selectors.niveauTrigger).click().wait(300);
    cy.get(selectors.niveauOption(level)).click({ force: true });
    cy.get(selectors.niveauTrigger).should('contain.text', level);
})


