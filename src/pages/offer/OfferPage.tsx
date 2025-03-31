import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMediaQuery } from 'react-responsive';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/hook/contexts/auth.context';
import {BackButton} from "@/components/BackButton/BackButton.tsx";

const schema = z.object({
    nom: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide'),
});

const ApplicationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form className="flex flex-col gap-2 " onSubmit={handleSubmit(onSubmit)}>
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

            <Button type="submit" className="mt-2">
                Postuler
            </Button>
            <BackButton/>
        </form>
    );
};

const LoginPrompt = () => (
    <div className="text-center text-sm md:text-base flex flex-col items-center">
        Veuillez vous connecter pour postuler.
        <Button className="mt-2" variant="outline">
            Se connecter
        </Button>
    </div>
);

export default function OfferPage() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <Card className="max-w-4xl mx-auto shadow-lg ">
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-semibold">
                        [Titre du poste] - CDI / CDD / Freelance - [Ville ou Remote]
                    </CardTitle>
                </CardHeader>

                <CardContent className={`flex ${isMobile ? 'flex-col p-4' : 'flex-row'} gap-6 text-black`}>
                    <div className="flex-1">
                        <h2 className="font-semibold mb-3">Détail d'offre :</h2>
                        <ul className="text-sm md:text-base list-disc ml-5">
                            <li>Lieu : [Ville / Télétravail]</li>
                            <li>Type de contrat : CDI / CDD / Alternance / Stage / Freelance</li>
                            <li>Salaire : [Fourchette de rémunération]</li>
                        </ul>

                        <div className="mt-4">
                            <h3 className="font-semibold">À propos du poste :</h3>
                            <p className="text-sm md:text-base">
                                Nous recherchons un(e) [Nom du poste] motivé(e) et passionné(e) pour rejoindre notre équipe...
                            </p>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold">Profil recherché :</h3>
                            <ul className="text-sm md:text-base list-disc ml-5">
                                <li>Formation : [Ex: Bac+3 en informatique]</li>
                                <li>Expérience : [Ex: 2 ans minimum]</li>
                                <li>Compétences : [Clé 1, Clé 2, Clé 3]</li>
                            </ul>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold">Ce que nous offrons :</h3>
                            <ul className="text-sm md:text-base list-disc ml-5">
                                <li>Environnement de travail dynamique</li>
                                <li>Perspectives d'évolution</li>
                                <li>Télétravail possible</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex-1 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
                        <h3 className="font-semibold mb-3">Envoyer votre candidature :</h3>
                        {isAuthenticated ? <ApplicationForm /> : <LoginPrompt />}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}