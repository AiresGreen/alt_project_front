describe("LoginForm- End-To-End Test", () => {
    beforeEach(() => {
        cy.visit("/signin"); //on se rend sur la page Signin pour la tester
    });
    //vérifie que tous les champs sont remplissables
    it("fills form and submit", () => {
        cy.contains("Prénom").should("be.visible");
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
        cy.get('button[type="submit"]').click();
    });
    //vérifie si le prénom est présent
    it("contains username", () => {
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le prénom doit être présent").should("be.visible");
    });
    //vérifie si le nom de famille est présent
    it("contains lastname", () => {
        cy.get('input[name="username"]').type("Cristobal");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le nom est nécessaire").should("be.visible");
    });
    //vérifie si l'e-mail est présent
    it("verifies email filled-up", () => {
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
        cy.get('button[type="submit"]').click();
        cy.contains("L'e-mail est essentiel").should("be.visible");
    });
    //vérifie si l'email est au bon format
    it("verifies email format", () => {
        cy.contains("Prénom").should("be.visible");
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal.sp");
        cy.get('input[name="password"]').type("Azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Votre Email est non valide").should("be.visible");
    });
    //Vérifie les erreurs du mot de passe
    it("is at least 8 characters", () => {
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("Azer12@");
        cy.get('input[name="passwordconfirmation"]').type("Azer12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le mot de passe doit avoir au moins 8 caractères");
    });
    it("contains upper case", () => {
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("azerty12@");
        cy.get('input[name="passwordconfirmation"]').type("azerty12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le Mot de Passe doit contenir au moins une majuscule");
    });
    it("contains lowercase", () => {
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("AZERTY12@");
        cy.get('input[name="passwordconfirmation"]').type("AZERTY12@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le Mot de Passe doit contenir au moins une minuscule");
    });
    it("contains number", () => {
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("Azertytr@");
        cy.get('input[name="passwordconfirmation"]').type("Azertytr@");
        cy.get('button[type="submit"]').click();
        cy.contains("Le Mot de Passe doit contenir au moins un chiffre");
    });
    it("contains special character", () => {
        cy.get('input[name="username"]').type("Cristobal");
        cy.get('input[name="lastname"]').type("Colón");
        cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
        cy.get('input[name="password"]').type("Azerty123");
        cy.get('input[name="passwordconfirmation"]').type("Azerty123");
        cy.get('button[type="submit"]').click();
        cy.contains(
            "Le mot de Passe doit contenir au moins un caractère spécial"
        );
        //Vérifie si les deux mots de passe coïncident
        it("has same password twice", () => {
            cy.get('input[name="username"]').type("Cristobal");
            cy.get('input[name="lastname"]').type("Colón");
            cy.get(`input[name="email"]`).type("cristobal@amerigo.sp");
            cy.get('input[name="password"]').type("Azerty12@");
            cy.get('input[name="passwordconfirmation"]').type("Azerty12@");
            cy.get('button[type="submit"]').click();
            cy.contains("Les mots de passe ne correspondent pas");
        });
    });
});
