

describe('CV Construct Page', () => {
    beforeEach(() => {
        cy.visit('/cv-construct');
    });

    it('Sélectionne un avatar via les boutons emoji', () => {
        // On suppose que chaque bouton avatar possède data-cy="avatar-button" et un attribut data-avatar
        cy.get('[data-cy=avatar-button][data-avatar="🧑‍💻"]').click();
        // Vérifie que le bouton sélectionné a une classe active (ex: .active)
        cy.get('[data-cy=avatar-button].active')
            .should('have.attr', 'data-avatar', '🧑‍💻');
    });

    it('Télécharge une photo et affiche l’aperçu', () => {
        // Nécessite le plugin cypress-file-upload et un fichier fixture (ex: "example.png" dans cypress/fixtures)
        const fileName = 'example.png';
        cy.fixture(fileName, 'base64').then(fileContent => {
            cy.get('[data-cy=file-input]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/png',
                encoding: 'base64'
            });
        });
        // Vérifie que l’aperçu de l’avatar est visible
        cy.get('[data-cy=avatar-preview]').should('be.visible');
    });

    it('Supprime l’avatar lorsque le bouton "Supprimer" est cliqué', () => {
        // D'abord, on simule la sélection d'un avatar
        cy.get('[data-cy=avatar-button][data-avatar="🧑‍💻"]').click();
        // Puis on clique sur le bouton de suppression, identifié par data-cy="delete-avatar"
        cy.get('[data-cy=delete-avatar]').click();
        // Vérifie que l’aperçu n’est plus présent
        cy.get('[data-cy=avatar-preview]').should('not.exist');
    });

    it('Permet de sélectionner le prénom et le nom dans les dropdowns', () => {
        // Sélection du prénom
        cy.get('[data-cy=firstname-select]').click();
        cy.get('[data-cy=firstname-option][data-value="Jean"]').click();
        cy.get('[data-cy=firstname-select]').should('contain.text', 'Jean');

        // Sélection du nom
        cy.get('[data-cy=lastname-select]').click();
        cy.get('[data-cy=lastname-option][data-value="Dupont"]').click();
        cy.get('[data-cy=lastname-select]').should('contain.text', 'Dupont');
    });

    it('Permet de cocher des options dans les listes (ex. expérience, compétences)', () => {
        // Pour l'expérience, on coche "Miaou"
        cy.get('[data-cy=checkbox-experience][data-value="Miaou"]')
            .check({ force: true });
        // Vérifie que "Miaou" apparait dans la liste des expériences
        cy.get('[data-cy=experience-list]').should('contain.text', 'Miaou');

        // Pour les compétences, on coche "Communication"
        cy.get('[data-cy=checkbox-skills][data-value="Communication"]')
            .check({ force: true });
        cy.get('[data-cy=skills-list]').should('contain.text', 'Communication');
    });

    it('Affiche les boutons "Télécharger en PDF" et le bouton de retour', () => {
        // Vérifie la présence du bouton pour télécharger le PDF, identifié par data-cy="download-pdf"
        cy.get('[data-cy=download-pdf]').should('be.visible');
        // Vérifie la présence du bouton de retour
        cy.get('[data-cy=back-button]').should('exist');
    });

    it('Soumet le formulaire et affiche le toast de confirmation', () => {
        // On simule la soumission du formulaire via le bouton identifié par data-cy="submit-cv"
        cy.get('[data-cy=submit-cv]').click();
        // Vérifie l'apparition du toast de confirmation (par exemple, avec data-cy="toast")
        cy.get('[data-cy=toast]')
            .should('contain.text', 'CV sauvegardé avec succès !');
    });
});
