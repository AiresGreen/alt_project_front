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
};


describe('Page LanguesListPage', () => {
    beforeEach(() => {
        cy.login();
    });

//==verifier affichage correct de la page d'ajout + Interaction avec "langue" et le selecteur
    it('Should have a title', () => {
        cy.get(selectors.cardTitleLangue, ).should('contain.text', 'Ajouter une nouvelle langue');
        cy.get(selectors.cardTitleSafed).should('contain.text', 'Langues enregistrées');
    });

    //==Interaction avec "langue" et le selecteur + "niveau" et selector
    it('Should show language-selector and chose "Russian + levels"', ()=> {
        //==langue

        cy.selectLangue('Russian');
        cy.wait(500);


        //===niveau

        cy.selectLevel('native')
        cy.wait(500)
        cy.get(selectors.confirmButton).click()
        cy.wait(500)
    })

    //==Changement de niveau et du langue
    it('Should change level of language and language', () => {


        //==changement de niveau
        cy.changeLevel(advanced)
    } )

});
