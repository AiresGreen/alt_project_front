import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from "@/components/ui/card"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Filter} from "lucide-react";
import {useMediaQuery} from "@/lib/useMediaQuery.ts";
import {FiltersAccordion} from "@/components/filters/FiltersAccordion.tsx";
import { useNavigate } from "react-router-dom";
//import {Link} from "react-router-dom";
// ------------------------------
// Rendu principal
// ------------------------------
export const HomeInscritPage = () => {
    // Détection du breakpoint mobile (max-width: 768px)
    const isMobile = useMediaQuery("(max-width: 768px)")

// État local pour le Sheet (mobile)
    const [openSheet, setOpenSheet] = useState(false)

    //Navigation sur la page CvConstructPage
    const navigate = useNavigate();

    return (
        <div>

            <main>
                {/* Container principal */}
                <div className="container mx-auto mt-4 flex flex-col items-center md:flex-row gap-4 px-4">
                    {/* Affichage conditionnel : Desktop vs Mobile */}
                    {isMobile ? (
                        // ---------------------------
                        // VERSION MOBILE
                        // ---------------------------
                        <>
                            {/* BOUTON FILTRE : ouvre un Sheet */}
                            <div className="mb-4 flex justify-end">
                                <Sheet open={openSheet}
                                       onOpenChange={setOpenSheet}>
                                    <SheetTrigger asChild>
                                        <Button variant="outline">
                                            <Filter className="h-4 w-4"/>
                                            <span>Filtre</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right"
                                                  className="w-[80%] sm:w-[60%] bg-green-300">
                                        <SheetHeader>
                                            <SheetTitle>Filtrer</SheetTitle>
                                            <SheetDescription>Affinez votre recherche</SheetDescription>
                                        </SheetHeader>

                                        <div className="mt-4">
                                            {/* Accordions de filtres */}
                                            <FiltersAccordion/>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            {/* Liste d'offres en plein écran (pas de sidebar) */}
                            <section className="w-full space-y-4">
                                <Card className={'bg-card-custom'}>
                                    <CardHeader>
                                        <CardTitle>[Titre du poste] – CDI / CDD / Freelance</CardTitle>
                                        <CardDescription>
                                            <span className="text-sm">Lieu : Ville / Télétravail</span>
                                            <br/>
                                            <span className="text-sm">
                        Type de contrat : CDI / CDD / Alternance / Stage / Freelance
                      </span>
                                            <br/>
                                            <span className="text-sm">Salaire : Fourchette de rémunération</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">
                                            Description de l'offre, missions, profil recherché, etc.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button>Voir offre</Button>
                                    </CardFooter>
                                </Card>

                                <Card className={'bg-card-custom'}>
                                    <CardHeader>
                                        <CardTitle>[Titre du poste 2] – CDI / CDD / Freelance</CardTitle>
                                        <CardDescription>
                                            <span className="text-sm">Lieu : Ville / Télétravail</span>
                                            <br/>
                                            <span className="text-sm">
                        Type de contrat : CDI / CDD / Alternance / Stage / Freelance
                      </span>
                                            <br/>
                                            <span className="text-sm">Salaire : Fourchette de rémunération</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">Autre description de l'offre...</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button>Voir offre</Button>
                                    </CardFooter>
                                </Card>
                            </section>
                        </>
                    ) : (
                        // ---------------------------
                        // VERSION DESKTOP
                        // ---------------------------
                        <>
                            {/* SIDEBAR avec accordions */}
                            <aside className="md:w-1/4 w-full border p-4 rounded-lg space-y-4">
                                {/* Les sections sont repliées par défaut, s'ouvrent au clic */}
                                <FiltersAccordion/>

                                {/* Autres options de la sidebar, ex. bouton "Créer le CV" */}
                                <Button variant="outline"
                                        className="w-full mt-4"
                                onClick={() => navigate("/cv-builder")}>
                                    Créer le CV
                                </Button>
                            </aside>

                            {/* LISTE D'OFFRES */}
                            <section className="md:w-3/4 w-full space-y-4">
                                <Card className={'bg-card-custom'}>
                                    <CardHeader>
                                        <CardTitle>[Titre du poste] – CDI / CDD / Freelance</CardTitle>
                                        <CardDescription>
                                            <span className="text-sm">Lieu : Ville / Télétravail</span>
                                            <br/>
                                            <span className="text-sm">
                        Type de contrat : CDI / CDD / Alternance / Stage / Freelance
                      </span>
                                            <br/>
                                            <span className="text-sm">Salaire : Fourchette de rémunération</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">
                                            Description de l'offre, missions, profil recherché, etc.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button>Voir offre</Button>
                                    </CardFooter>
                                </Card>

                                <Card className={'bg-card-custom'}>
                                    <CardHeader>
                                        <CardTitle>[Titre du poste 2] – CDI / CDD / Freelance</CardTitle>
                                        <CardDescription>
                                            <span className="text-sm">Lieu : Ville / Télétravail</span>
                                            <br/>
                                            <span className="text-sm">
                        Type de contrat : CDI / CDD / Alternance / Stage / Freelance
                      </span>
                                            <br/>
                                            <span className="text-sm">Salaire : Fourchette de rémunération</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">Autre description de l'offre...</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button>Voir offre</Button>
                                    </CardFooter>
                                </Card>
                            </section>
                        </>
                    )}
                </div>

                {/* FOOTER */}
                {/*<footer className="mt-8 border-t py-4 text-center text-sm text-gray-600">
                    <div className="mb-2 space-x-4">
                        <Link to="src/pages/footer/AproposPage.tsx"
                              className="hover:underline">
                            À propos
                        </Link>
                        <Link to="src/pages/footer/ContactPage.tsx"
                              className="hover:underline">
                            Contact
                        </Link>
                        <Link to="src/pages/footer/MentionsLegalePage.tsx"
                              className="hover:underline">
                            Mentions légales
                        </Link>
                    </div>
                    <p>© 2024 BalanceTonJob – Créé par JM &amp; Vladou. Open-source sous licence.</p>
                </footer>*/}
            </main>
        </div>
    )
}
