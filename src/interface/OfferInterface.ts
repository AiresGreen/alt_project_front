

export interface OfferInterface {
    id: number;
    intitule: string;
    description: string;
    dateCreation:string;
    lieuTravail: {libelle:string} ;
    salaire: {libelle:string} ;
    domaine: string;
    dureeHebdo: string;
    experienceLibelle: string;
    entreprise:{nom:string;logo:string; description:string; url:string};
    typeContratLibelle: string;
    dureeTravailLibelle:string;
    secteurActiviteLibelle:string
    formations: {domaineLibelle:string; niveauLibelle:string} ;
    competences: {libelle:string};
    qualitesProfessionnelles:{libelle:string; descrition:string};
    contact: {nom: string; coordonnees1:string; urlPostulation:string};

}