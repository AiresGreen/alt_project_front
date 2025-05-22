

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
    entreprise:{nom:string;logo:string;url:string};
    typeContratLibelle: string;
    dureeTravailLibelle:string;
    secteurActiviteLibelle:string

}