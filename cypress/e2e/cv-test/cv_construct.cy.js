describe('CV Construct Page - E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/cv-build');
    });

    it('Sélectionne un avatar via les boutons emoji', () => {
        cy.get('[data-cy=avatar-button][data-avatar="🧑‍💻"]').click();
        cy.get('[data-cy=avatar-button].bg-primary')
            .should('exist')
            .and('have.attr', 'data-avatar', '🧑‍💻');
    });

    it('Télécharge une photo et affiche l’aperçu', () => {
        const fileName = 'example.png';
        cy.fixture(fileName, 'base64').then(fileContent => {
            cy.get('[data-cy=file-input]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/png',
                encoding: 'base64'
            });
        });
        cy.get('[data-cy=avatar-preview]')
            .should('exist')
            .and('be.visible');
    });

    it('Supprime l’avatar lorsque le bouton "Supprimer" est cliqué', () => {
        const fileName = 'example.png';
        cy.fixture(fileName, 'base64').then(fileContent => {
            cy.get('[data-cy=file-input]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/png',
                encoding: 'base64'
            });
        });
        cy.get('[data-cy=avatar-preview]').should('exist');
        cy.get('[data-cy=delete-avatar]').click();
        cy.get('[data-cy=avatar-preview]').should('not.exist');
    });

    it('Permet de sélectionner le prénom et le nom dans les dropdowns', () => {
        cy.get('[data-cy=firstname-select]').click();
        cy.get('[data-cy=firstname-option][data-value="Jean"]').click();
        cy.get('[data-cy=firstname-select]').should('contain.text', 'Jean');

        cy.get('[data-cy=lastname-select]').click();
        cy.get('[data-cy=lastname-option][data-value="Dupont"]').click();
        cy.get('[data-cy=lastname-select]').should('contain.text', 'Dupont');
    });

    it('Met à jour l’aperçu du CV pour le titre et la description', () => {
        cy.get('[data-cy=cv-title-textarea]').type('Ingénieur Logiciel');
        cy.get('[data-cy=cv-summary-textarea]').type('Profil expérimenté en développement fullstack.');

        cy.get('[data-cy=title-preview]')
            .should('exist')
            .and('contain.text', 'Ingénieur Logiciel');

        cy.get('[data-cy=summary-preview]')
            .should('exist')
            .and('contain.text', 'Profil expérimenté en développement fullstack.');
    });

    it('Vérifie la sélection des checkbox et la soumission du formulaire avec toutes les informations', () => {
        // Sélection des checkbox dans chaque groupe
        cy.get('[data-cy=checkbox-experience][data-value="Miaou"]').check({ force: true });
        cy.get('[data-cy=checkbox-skills][data-value="Communication"]').check({ force: true });
        cy.get('[data-cy=checkbox-education][data-value="Nia"]').check({ force: true });
        cy.get('[data-cy=checkbox-project][data-value="CRM BalanceTonJob"]').check({ force: true });
        cy.get('[data-cy=checkbox-interest][data-value="Cinéma"]').check({ force: true });

        // Vérification que les listes sont mises à jour
        cy.get('[data-cy=experience-list]').should('contain.text', 'Miaou');
        cy.get('[data-cy=skills-list]').should('contain.text', 'Communication');
        cy.get('[data-cy=education-list]').should('contain.text', 'Nia');
        cy.get('[data-cy=project-list]').should('contain.text', 'CRM BalanceTonJob');
        cy.get('[data-cy=interest-list]').should('contain.text', 'Cinéma');

        // Remplissage des dropdowns
        cy.get('[data-cy=firstname-select]').click();
        cy.get('[data-cy=firstname-option][data-value="Marie"]').click();
        cy.get('[data-cy=lastname-select]').click();
        cy.get('[data-cy=lastname-option][data-value="Durand"]').click();

        // Remplissage des champs textes
        cy.get('[data-cy=cv-title-textarea]').clear().type('Ingénieur Logiciel');
        cy.get('[data-cy=cv-summary-textarea]').clear().type('Profil expérimenté en développement fullstack.');

        // Remplissage du champ "Langues"
        cy.get('[data-cy=languages-input]').type('Français');

        // Vérification de l'aperçu
        cy.get('[data-cy=title-preview]').should('contain.text', 'Ingénieur Logiciel');
        cy.get('[data-cy=summary-preview]').should('contain.text', 'Profil expérimenté en développement fullstack.');

        // Soumission du formulaire
        cy.get('[data-cy=submit-cv]').click();

        // Vérification de l'apparition du toast de confirmation
        cy.get('[data-cy=toast]')
            .should('exist')
            .and('contain.text', 'CV sauvegardé avec succès !');
    });

    it('Affiche les boutons "Télécharger en PDF" et le bouton de retour', () => {
        cy.get('[data-cy=download-pdf]').should('exist').and('be.visible');
        cy.get('[data-cy=back-button]').should('exist');
    });
});
