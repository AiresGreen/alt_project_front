import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useMediaQuery} from 'react-responsive';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useContext} from 'react';
import {AuthContext} from '@/hook/contexts/auth.context';
import {BackButton} from "@/components/BackButton/BackButton.tsx";
import {useQuery} from "@tanstack/react-query";
import {OfferInterface} from "@/interface/OfferInterface.ts";
import {getOfferById} from "@/services/api/home.ts";
import {useParams} from "react-router-dom";


const schema = z.object({
    nom: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide'),
});

const ApplicationForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form className="flex flex-col gap-2 "
              onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Nom"
                className="border rounded-md px-3 py-2"
                {...register('nom')}
            />
            {errors.nom && <span className="text-red-500 text-xs">{errors.nom.message}</span>}

            <input
                type="email"
                placeholder="Email"
                className="border rounded-md px-3 py-2"
                {...register('email')}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

            <Button type="submit"
                    className="mt-2">
                Postuler
            </Button>
            <BackButton/>
        </form>
    );
};

const LoginPrompt = () => (
    <div className="text-center text-sm md:text-base flex flex-col items-center">
        Veuillez vous connecter pour postuler.
        <Button className="mt-2"
                variant="outline">
            Se connecter
        </Button>
    </div>
);

export default function OfferPage() {
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    const {isAuthenticated} = useContext(AuthContext);

    //===affichage des li !vide
    const displayIfExists = (label: string, value?: string) =>
        value ? <li>{label} : {value}</li> : null;

    //===Appel get


    const {id} = useParams();
    const {
        data: offer,
        isLoading,
        isError,
    } = useQuery<OfferInterface>({
        queryKey: ["offers", id],
        queryFn: () => getOfferById(id!),
        enabled: !!id,
    });

    //==Supression de ligne vide auto

    const detailsListOfDetalsOffre = [
        displayIfExists("Lieu", offer?.lieuTravail?.libelle),
        displayIfExists("Type de contrat", offer?.typeContratLibelle),
        displayIfExists("Durée", offer?.dureeTravailLibelle),
        displayIfExists("Salaire", offer?.salaire?.libelle),
        displayIfExists("Expérience", offer?.experienceLibelle),
        displayIfExists("Domaine", offer?.domaine),
        displayIfExists("Secteur d'activité", offer?.secteurActiviteLibelle),
    ].filter(Boolean);

    const detailsListOfProfile = [
        displayIfExists("Formation", `${offer?.formations?.domaineLibelle} / ${offer?.formations?.niveauLibelle}`),
        displayIfExists("Compétence", offer?.competences?.libelle),
        displayIfExists("Qualités professionnelles", `${offer?.qualitesProfessionnelles?.libelle} / ${offer?.qualitesProfessionnelles?.descrition}`),

    ].filter(Boolean);

    const detailsListOfContact = [
        displayIfExists("Recruteur", offer?.contact?.nom),
        displayIfExists("Coordenées", offer?.contact?.coordonnees1),
        displayIfExists("Postuler", offer?.contact?.urlPostulation),
    ].filter(Boolean);

    const detailsListOfEntreprise = [
        displayIfExists("Nom", offer?.entreprise?.nom),
        displayIfExists(" ", offer?.entreprise?.logo),
        displayIfExists("Notre site", offer?.entreprise?.url),
        displayIfExists("Qui sommes nous", offer?.entreprise?.description),
    ].filter(Boolean);

    return (
        <div className="p-4 md:p-8 min-h-screen">
            {isLoading && <span>Loading...</span>}
            {isError && <span>Erreur ou offre introuvable</span>}
            {!offer && <span>Aucune offre trouvée.</span>}
            {offer &&
                <Card className="max-w-4xl mx-auto shadow-lg ">
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl font-semibold">
                            {displayIfExists(offer.intitule)}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className={`flex ${isMobile ? 'flex-col p-4' : 'flex-row'} gap-6 text-black`}>
                        <div className="flex-1">
                            <h2 className="font-semibold mb-3">Détail d'offre :</h2>
                            <ul className="text-sm md:text-base list-disc ml-5">
                                <li className="list-none text-gray-400 font-light">
                                    Date de publication {" "}: {" "} {new Date(
                                    offer.dateCreation
                                ).toLocaleString(
                                    "fr-FR",
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
                                }
                                </li>

                                {detailsListOfDetalsOffre}

                            </ul>

                            <div className="mt-4">
                                <h3 className="font-semibold">À propos du poste {" "}: <br/></h3>
                                <p className="text-sm md:text-base">
                                    {offer.description}
                                </p>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold">Profil recherché {" "}:<br/></h3>
                                <ul className="text-sm md:text-base list-none ml-5">
                                    {detailsListOfProfile}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold">Notre entreprise</h3>
                                <ul className="text-sm md:text-base list-none ml-5">
                                    {detailsListOfEntreprise}
                                </ul>
                            </div>

                            <div className="mt-4">
                                {isAuthenticated ? <ApplicationForm/> : <LoginPrompt/>}
                                <h3 className="font-semibold">Contactez nous {" "}:<br/></h3>
                                <ul className="text-sm md:text-base list-none ml-5">
                                    {detailsListOfContact}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            }
        </div>
    );
}