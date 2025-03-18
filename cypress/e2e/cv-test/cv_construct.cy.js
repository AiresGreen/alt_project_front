describe("CV Form - End-to-End Test", () => {
    beforeEach(() => {
        cy.visit("/cv-build"); // Remplace par le bon chemin si nécessaire
    });

    it("Remplit le formulaire et soumet", () => {
        // Vérifier que la page charge bien
        cy.contains("Prénom").should("be.visible");

        // Remplir les champs de texte
        cy.get('input[name="firstname"]').type("Jean");
        cy.get('input[name="lastname"]').type("Dupont");
        cy.get('input[name="title"]').type("Développeur Fullstack");
        cy.get('textarea[name="summary"]').type("Passionné par le développement web et l'IA.");

        // Sélectionner une langue
        cy.get("[data-testid='select-languages']").click(); // Ouvre le Select
        cy.get("[role='option']").contains("Français").click(); // Sélectionne "Français"

        // Sélectionner une compétence
        cy.get("[data-testid='select-skills']").click();
        cy.get("[role='option']").contains("Informatique").click();

        // Soumettre le formulaire
        cy.get('button[type="submit"]').click();

    });

    it("Affiche des erreurs pour les champs requis vides", () => {
        // Essayer de soumettre sans remplir
        cy.get('button[type="submit"]').click();

        // Vérifier les messages d'erreur
        cy.contains("Le prénom est requis").should("be.visible");
        cy.contains("Le nom est requis").should("be.visible");
        cy.contains("Le titre est requis").should("be.visible");
        cy.contains("Le résumé est requis").should("be.visible");
        cy.contains("La langue est requise").should("be.visible");
        cy.contains("Une compétence est requise").should("be.visible");
    });
});