describe('Page LanguesListPage', () => {
    beforeEach(() => {
        cy.login(); // ⚠️ Remplacer par ton custom command si besoin
        cy.visit('/profile/languages'); // URL de la page Langues
    });

    it('Affiche le titre de la page', () => {
        cy.contains('Langues enregistrées').should('exist');
    });

    it('Affiche un message si aucune langue n’est enregistrée', () => {
        cy.intercept('GET', '**/user/languages', { body: [] }).as('getEmptyLangues');
        cy.reload();
        cy.wait('@getEmptyLangues');
        cy.contains('Aucune langue pour le moment.').should('exist');
    });

    it('Affiche les langues enregistrées', () => {
        cy.get('[data-testid="language-card"]').should('have.length.at.least', 1);
    });

    it('Clique sur le bouton "Ajouter une langue"', () => {
        cy.contains('Ajouter une langue').click();
        cy.get('form').should('exist');
    });

    it('Ajoute une langue avec un niveau', () => {
        cy.contains('Ajouter une langue').click();
        cy.get('select[name="language_id"]').select('Anglais');
        cy.get('select[name="level"]').select('C1');
        cy.get('button[type="submit"]').click();
        cy.contains('Langue ajoutée avec succès').should('exist'); // si toast
    });

    it('Édite une langue existante', () => {
        cy.get('[data-testid="language-card"]').first().within(() => {
            cy.contains('Modifier').click();
        });
        cy.get('select[name="level"]').select('B2');
        cy.get('button[type="submit"]').click();
        cy.contains('Langue mise à jour avec succès').should('exist'); // toast attendu
    });

    it('Supprime une langue', () => {
        cy.get('[data-testid="language-card"]').first().within(() => {
            cy.contains('Supprimer').click();
        });
        cy.contains('Êtes-vous sûr').should('exist');
        cy.contains('Confirmer').click();
        cy.contains('Langue supprimée').should('exist');
    });

    it('Gère une erreur serveur lors de la suppression', () => {
        cy.intercept('DELETE', '**/user/languages/**', {
            statusCode: 500,
            body: { message: 'Erreur serveur' },
        }).as('deleteFail');

        cy.get('[data-testid="language-card"]').first().within(() => {
            cy.contains('Supprimer').click();
        });
        cy.contains('Confirmer').click();
        cy.wait('@deleteFail');
        cy.contains('Erreur serveur').should('exist');
    });
});