import { faker } from '@faker-js/faker';

export const generateFakeUser = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    adresse: faker.location.streetAddress(),
    infosUtiles: "2 enfants, Handicapé, Permis B, Véhicule",
    experiences: "2010-2015 Boulangerie Traditionnelle\n2018-2019 Start Up Frite\n",
    formations: "2012 - CAP Pâtisserie\n2018 - Ecole du Turfu\n",
    competences: "HTML/CSS, JavaScript",
    projetFolie: "2023 - Créer l'appli du Turfu",
    langues: "Anglais, Espagnol, Allemand, Russe",
    loisirs: "Randonnée, Élevage de la troupe de chasse, Astronomie",
});
