import { useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/hook/contexts/auth.context';
import { Button } from '@/components/ui/button';
import {
    Card, CardHeader, CardTitle, CardContent,
    CardDescription, CardFooter,
} from '@/components/ui/card';
import {
    Sheet, SheetTrigger, SheetContent,
    SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import { FiltersAccordion } from '@/components/filters/FiltersAccordion';
import { Filter } from 'lucide-react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {OfferInterface} from "@/interface/OfferInterface.ts"
import {getOffers} from "@/services/api/home.ts";


export default function HomePage() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { isAuthenticated } = useContext(AuthContext);
    const [openSheet, setOpenSheet] = useState(false);
    const navigate = useNavigate();

    //===TanStack code
    const queryClient = useQueryClient();
console.log('coucou');
    //===Appel get
    const {data: offers, isLoading, isError} = useQuery<OfferInterface[]>({
        queryKey:["offers"],
        queryFn: () => getOffers(),
        staleTime: 0,
    })

    return (
        <div>
            <main>
                <div className="container mx-auto mt-4 flex flex-col items-center md:flex-row gap-4 px-4">
                    {isMobile ? (
                        <>
                            <div className="mb-4 flex justify-end">
                                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                                    <SheetTrigger asChild>
                                        <Button variant="outline">
                                            <Filter className="h-4 w-4" />
                                            <span>Filtre</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-[80%] sm:w-[60%]">
                                        <SheetHeader>
                                            <SheetTitle>Filtrer</SheetTitle>
                                            <SheetDescription>Affinez votre recherche</SheetDescription>
                                        </SheetHeader>
                                        <div className="mt-4">
                                            <FiltersAccordion />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <section className="w-full space-y-4">
                                {isLoading && <span>Loading...</span>}
                                {isError && <span>Erreur</span>}
                                {offers && (
                                offers.map((offer:OfferInterface, i:number)=> (
                                    <Card key={i} className="">
                                        <CardHeader>
                                            <CardTitle>[ {i}] – CDI / CDD / Freelance</CardTitle>
                                            <CardDescription>
                                                <span className="text-sm">Lieu : Ville / Télétravail</span><br />
                                                <span className="text-sm">Type de contrat : CDI / CDD / Alternance / Stage / Freelance</span><br />
                                                <span className="text-sm">Salaire : Fourchette de rémunération</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">Description de l'offre, missions, profil recherché, etc.</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            {isAuthenticated ? (
                                                <Button onClick={() => navigate('/postuler')}>Postuler</Button>
                                            ) : (
                                                <Button onClick={() => navigate('/login')} variant="outline">
                                                    Se connecter pour postuler
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                )))}
                            </section>
                        </>
                    ) : (
                        <>
                            <aside className="md:w-1/4 w-full border p-4 rounded-lg space-y-4">
                                <FiltersAccordion />
                                {isAuthenticated ? (
                                    <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/profile-page')}>
                                        Accéder à mon profil
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/cv-build')}>
                                        Créer le CV
                                    </Button>
                                )}
                            </aside>
                            <section className="md:w-3/4 w-full space-y-4">
                                {[1, 2].map((i) => (
                                    <Card key={i} className="">
                                        <CardHeader>
                                            <CardTitle>[Titre du poste {i}] – CDI / CDD / Freelance</CardTitle>
                                            <CardDescription>
                                                <span className="text-sm">Lieu : Ville / Télétravail</span><br />
                                                <span className="text-sm">Type de contrat : CDI / CDD / Alternance / Stage / Freelance</span><br />
                                                <span className="text-sm">Salaire : Fourchette de rémunération</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">Description de l'offre, missions, profil recherché, etc.</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-end">
                                            <Button onClick={() => navigate('/offer-page')}>Voir offre</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </section>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
