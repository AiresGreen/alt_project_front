describe("PasswordForm- End-To-End Test", () => {
    beforeEach(() => {
        cy.visit("/passwordrecovery"); //on se rend sur la page Password Recovery pour la tester
    });
    //Vérifie que les champs sont remplissables
    it("fills form", () => {
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
    });
    //Vérifie les erreurs du mot de passe
    it("is at least 8 characters", () => {
        cy.get('input[name="password"]').type("Azer12@");
        cy.get('input[name="passwordconfirmation"]').type("Azer12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le mot de passe doit avoir au moins 8 caractères");
    });
    it("contains upper case", () => {
        cy.get('input[name="password"]').type("azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("azerty12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le Mot de Passe doit contenir au moins une majuscule");
    });
    it("contains lowercase", () => {
        cy.get('input[name="password"]').type("AZERTY12@");
        cy.get('input[name="passwordconfirmation"]').type("AZERTY12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le Mot de Passe doit contenir au moins une minuscule");
    });
    it("contains number", () => {
        cy.get('input[name="password"]').type("Azertytr@");
        cy.get('input[name="passwordconfirmation"]').type("Azertytr@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le Mot de Passe doit contenir au moins un chiffre");
    });
    it("contains special character", () => {
        cy.get('input[name="password"]').type("Azerty123");
        cy.get('input[name="passwordconfirmation"]').type("Azerty123");
        cy.get('button[type="submit"]').click();
        cy.contains(
            "Le mot de Passe doit contenir au moins un caractère spécial"
        );
    });
    //Vérifie si les deux mots de passe coïncident
    it("has same password twice", () => {
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerio12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Les mots de passe ne correspondent pas");
    });
    //vérifie que le submit envoie vers la bonne page
    it("fills form and submit", () => {
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/home-inscrit");
    });
});
