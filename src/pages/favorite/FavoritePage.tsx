import { IoArrowUndo } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Info } from 'lucide-react';
import { useMediaQuery } from '@/lib/useMediaQuery';
import {Link} from "react-router-dom";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

const FavoritePage = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const favoriteOffers = [
        {
            id: 1,
            title: '[Titre du poste] – CDI / CDD / Freelance – [Ville ou Remote]',
            location: 'Ville / Télétravail',
            contract: 'CDI / CDD / Alternance / Stage / Freelance',
            salary: 'Fourchette de rémunération',
            imageUrl: 'https://via.placeholder.com/120',
        },
        {
            id: 2,
            title: '[Titre du poste] – CDI / CDD / Freelance – [Ville ou Remote]',
            location: 'Ville / Télétravail',
            contract: 'CDI / CDD / Alternance / Stage / Freelance',
            salary: 'Fourchette de rémunération',
            imageUrl: 'https://via.placeholder.com/120',
        },
    ];

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Liste des offres favorites</h1>
                <Button size="sm" variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                    <Link to={"/"} className={"flex items-center gap-2"}>
                        <IoArrowUndo className={"text-black"} /> Accueil
                    </Link>
                </Button>
                <BackButton/>
            </div>

            <div className="space-y-4">
                {favoriteOffers.map((offer) => (
                    <Card key={offer.id} className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center p-4 shadow-md bg-card-custom`}>
                        <img
                            src={offer.imageUrl}
                            alt="Offre"
                            className={`rounded ${isDesktop ? 'w-32 h-24 object-cover mr-4' : 'w-full h-48 object-cover mb-4'}`}
                        />
                        <CardContent className="flex-1 w-full">
                            <h2 className="text-md font-semibold mb-2">{offer.title}</h2>
                            <p className="text-sm text-gray-900">
                                <span className="font-semibold">Lieu :</span> {offer.location}
                            </p>
                            <p className="text-sm text-gray-900">
                                <span className="font-semibold">Type de contrat :</span> {offer.contract}
                            </p>
                            <p className="text-sm text-gray-900">
                                <span className="font-semibold">Salaire :</span> {offer.salary}
                            </p>
                        </CardContent>
                        <div className={`flex ${isDesktop ? 'flex-row items-end' : 'flex-col items-center'} gap-2 mt-2 md:mt-0`}>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                Voir offre
                            </Button>
                            <Button size="sm" variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                                <Info className="w-4 h-4 mr-1" /> Info recruteur
                            </Button>
                            <Heart className="w-5 h-5 text-black cursor-pointer hover:text-red-500" />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FavoritePage;
