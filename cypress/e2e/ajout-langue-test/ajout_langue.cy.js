
const selectors = {
    langueCard: '[data-testid="language-card"]',
    langueTrigger: '[data-cy="langueFormTrigger"]',
    langueInput: 'input[list="langues-list"]',
    langueOption: (langue) => `[data-cy="langue-option-${langue.langEnglishName}"]`,
    niveauTrigger: '[data-cy="levelsFormTrigger"]',
    niveauOption: (level) => `[data-cy="level-option-${level}"]`,
    cardTitleLangue: '[data-cy="card-title-langue"]',
    cardTitleSafed: '[data-cy="card-title-safed"]',
    confirmButton: '[data-cy="confirm-button"]',
    changeButton: '[data-cy="change-button"]',
    deleteButton: '[data-cy="delete-button"]',
};

describe('Page LanguesListPage', () => {
    beforeEach(() => {
        cy.login();
        cy.goToLanguages()
    });


    //==Interaction avec "langue" et le selecteur + "niveau" et selector
    it('Should show language-selector and chose "Russian + levels"', ()=> {
        //==langue
        cy.get(selectors.langueTrigger).type('rus');
        cy.selectLangue('Russian');
        cy.wait(500);


        //===niveau

        cy.selectLevel('native')
        cy.wait(500)
        cy.get(selectors.confirmButton).click()
        cy.wait(500)
    });

    //==Changement de niveau
    it('Should change level option', () => {
        //==changement de niveau
        cy.changeLevel('advanced')
        cy.get(selectors.confirmButton).click()
    });

    //==Changement de la langue Russe => Francais
    it('Should change langue option', () => {
        cy.changeLanguage('French')
        cy.get(selectors.confirmButton).click()
    })

});
