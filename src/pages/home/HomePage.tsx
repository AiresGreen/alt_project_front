import { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/hook/contexts/auth.context";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { FiltersAccordion } from "@/components/filters/FiltersAccordion";
import { Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { OfferInterface } from "@/interface/OfferInterface.ts";
import { getOffers } from "@/services/api/home.ts";

export default function HomePage() {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const { isAuthenticated } = useContext(AuthContext);
    const [openSheet, setOpenSheet] = useState(false);
    const navigate = useNavigate();

    //===Appel get
    const {
        data: offers,
        isLoading,
        isError,
    } = useQuery<OfferInterface[]>({
        queryKey: ["offers"],
        queryFn: () => getOffers(),
        staleTime: 0,
    });
    //_____ Pagination----//
    const [page, setPage] = useState(1);
    const OFFERS_PER_PAGE = 8;

    const totalPages = offers ? Math.ceil(offers.length / OFFERS_PER_PAGE) : 0;
    const currentOffers = offers?.slice(
        (page - 1) * OFFERS_PER_PAGE,
        page * OFFERS_PER_PAGE
    );
    return (
        <div>
            <main>
                <div className="container mx-auto mt-4 flex flex-col items-center md:flex-row gap-4 px-4">
                    {isMobile ? (
                        <>
                            <div className="mb-4 flex justify-end">
                                <Sheet
                                    open={openSheet}
                                    onOpenChange={setOpenSheet}
                                >
                                    <SheetTrigger asChild>
                                        <Button variant="outline">
                                            <Filter className="h-4 w-4" />
                                            <span>Filtre</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent
                                        side="right"
                                        className="w-[80%] sm:w-[60%]"
                                    >
                                        <SheetHeader>
                                            <SheetTitle>Filtrer</SheetTitle>
                                            <SheetDescription>
                                                Affinez votre recherche
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="mt-4">
                                            <FiltersAccordion />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <section className="w-full space-y-2">
                                {isLoading && <span>Loading...</span>}
                                {isError && <span>Erreur</span>}
                                {offers &&
                                    offers.map(
                                        (offer: OfferInterface, i: number) => (
                                            <Card key={i} className="">
                                                <CardHeader>
                                                    <CardTitle>
                                                        {offer.intitule}
                                                    </CardTitle>
                                                    <CardDescription className="gap-4">
                                                        <span className="text-sm ">
                                                            Date de publication
                                                            :{" "}
                                                            {new Date(
                                                                offer.dateCreation
                                                            ).toLocaleString(
                                                                "fr-FR",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                        <br />
                                                        <span className="text-sm">
                                                            Lieu :{" "}
                                                            {
                                                                offer
                                                                    .lieuTravail
                                                                    .libelle
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="text-sm">
                                                            Type de contrat :{" "}
                                                            {
                                                                offer.typeContratLibelle
                                                            }{" "}
                                                            /{" "}
                                                            {
                                                                offer.dureeTravailLibelle
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="text-sm">
                                                            Salaire :{" "}
                                                            {
                                                                offer.salaire
                                                                    .libelle
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="text-sm">
                                                            Domaine :{" "}
                                                            {
                                                                offer.secteurActiviteLibelle
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="text-sm">
                                                            Experience :{" "}
                                                            {
                                                                offer.experienceLibelle
                                                            }
                                                        </span>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm">
                                                        Description :{" "}
                                                        {offer.description.slice(
                                                            0,
                                                            250
                                                        )}
                                                        <span className="text-sm text-muted-foreground">
                                                            ...
                                                        </span>
                                                    </p>
                                                </CardContent>
                                                <CardFooter className="flex justify-between">
                                                    {isAuthenticated ? (
                                                        <Button
                                                            onClick={() =>
                                                                navigate(
                                                                    "/postuler"
                                                                )
                                                            }
                                                        >
                                                            Postuler
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={() =>
                                                                navigate(
                                                                    "/login"
                                                                )
                                                            }
                                                            variant="outline"
                                                        >
                                                            Se connecter pour
                                                            postuler
                                                        </Button>
                                                    )}
                                                </CardFooter>
                                            </Card>
                                        )
                                    )}
                            </section>
                        </>
                    ) : (
                        <section className="flex gap-16">
                            <aside className="md:w-1/4 w-full border p-4 rounded-lg space-y-4 sticky-top-24 h-fit">
                                <FiltersAccordion />
                                {isAuthenticated ? (
                                    <Button
                                        variant="outline"
                                        className="w-full mt-4"
                                        onClick={() =>
                                            navigate("/profile-page")
                                        }
                                    >
                                        Accéder à mon profil
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="w-full mt-4"
                                        onClick={() => navigate("/cv-build")}
                                    >
                                        Créer le CV
                                    </Button>
                                )}
                            </aside>
                            <div>
                                <section className=" w-full space-y-6 max-h-[625px] always-show-scrollbar">
                                    {isLoading && <span>Loading...</span>}
                                    {isError && <span>Erreur</span>}
                                    {currentOffers &&
                                        currentOffers.map(
                                            (
                                                offer: OfferInterface,
                                                i: number
                                            ) => (
                                                <Card key={i} className="">
                                                    <CardHeader>
                                                        <CardTitle>
                                                            {offer.intitule}
                                                        </CardTitle>
                                                        <CardDescription className="gap-4">
                                                            <span className="text-sm ">
                                                                Date de
                                                                publication :{" "}
                                                                {new Date(
                                                                    offer.dateCreation
                                                                ).toLocaleString(
                                                                    "fr-FR",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                            </span>
                                                            <br />
                                                            <span className="text-sm">
                                                                Lieu :{" "}
                                                                {
                                                                    offer
                                                                        .lieuTravail
                                                                        .libelle
                                                                }
                                                            </span>
                                                            <br />
                                                            <span className="text-sm">
                                                                Type de contrat
                                                                :{" "}
                                                                {
                                                                    offer.typeContratLibelle
                                                                }{" "}
                                                                /{" "}
                                                                {
                                                                    offer.dureeTravailLibelle
                                                                }
                                                            </span>
                                                            <br />
                                                            <span className="text-sm">
                                                                Salaire :{" "}
                                                                {
                                                                    offer
                                                                        .salaire
                                                                        .libelle
                                                                }
                                                            </span>
                                                            <br />
                                                            <span className="text-sm">
                                                                Domaine :{" "}
                                                                {
                                                                    offer.secteurActiviteLibelle
                                                                }
                                                            </span>
                                                            <br />
                                                            <span className="text-sm">
                                                                Experience :{" "}
                                                                {
                                                                    offer.experienceLibelle
                                                                }
                                                            </span>
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-sm">
                                                            Description :{" "}
                                                            {offer.description.slice(
                                                                0,
                                                                250
                                                            )}
                                                            <span className="text-sm text-muted-foreground">
                                                                ...
                                                            </span>
                                                        </p>
                                                    </CardContent>
                                                    <CardFooter className="flex justify-end">
                                                        <Button
                                                            onClick={() =>
                                                                navigate(
                                                                    "/offer-page"
                                                                )
                                                            }
                                                        >
                                                            Voir offre
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            )
                                        )}
                                </section>
                                {totalPages > 1 && (
                                    <div className="flex justify-center gap-2 pt-4">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => (
                                                <Button
                                                    key={i}
                                                    variant={
                                                        page === i + 1
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    onClick={() =>
                                                        setPage(i + 1)
                                                    }
                                                >
                                                    {i + 1}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
