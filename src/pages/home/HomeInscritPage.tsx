import {useState} from "react"

//shadcn/ui
import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {NavigationBarInscrit} from "@/components/navigationBar/NavigationBar.tsx"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@radix-ui/react-accordion"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Filter} from "lucide-react";
import {useMediaQuery} from "@/lib/useMediaQuery.ts";

// ------------------------------
// Composant d'accordions (catégories de filtres)
// ------------------------------
const FiltersAccordion = () => (
    <Accordion type="multiple"
               className="space-y-2">
        {/* 1) Type de contrat */}
        <AccordionItem value="type-contrat">
            <AccordionTrigger>Type de contrat</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cdi"/>
                        <Label htmlFor="cdi">CDI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cdd"/>
                        <Label htmlFor="cdd">CDD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="autre"/>
                        <Label htmlFor="autre">Autre</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        {/* 2) Niveau d’expérience */}
        <AccordionItem value="experience">
            <AccordionTrigger>Niveau d’expérience</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="junior"/>
                        <Label htmlFor="junior">Junior</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="intermediaire"/>
                        <Label htmlFor="intermediaire">Intermédiaire</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="senior"/>
                        <Label htmlFor="senior">Senior</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        {/* 3) Temps de travail */}
        <AccordionItem value="temps-travail">
            <AccordionTrigger>Temps de travail</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="temps-plein"/>
                        <Label htmlFor="temps-plein">Temps plein</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="temps-partiel"/>
                        <Label htmlFor="temps-partiel">Temps partiel</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        {/* 4) Mode de travail */}
        <AccordionItem value="mode-travail">
            <AccordionTrigger>Mode de travail</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remote"/>
                        <Label htmlFor="remote">Télétravail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="onsite"/>
                        <Label htmlFor="onsite">Sur site</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

// ------------------------------
// Rendu principal
// ------------------------------
export const HomeInscritPage = () => {
    // Détection du breakpoint mobile (max-width: 768px)
    const isMobile = useMediaQuery("(max-width: 768px)")

// État local pour le Sheet (mobile)
    const [openSheet, setOpenSheet] = useState(false)

    return (
        <div>
            <NavigationBarInscrit/>
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
                                        <Button variant="outline"
                                                className="flex items-center space-x-2">
                                            <Filter className="h-4 w-4"/>
                                            <span>Filtre</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right"
                                                  className="w-[80%] sm:w-[60%]">
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
                                <Card>
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

                                <Card>
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
                                        className="w-full mt-4">
                                    Créer le CV
                                </Button>
                            </aside>

                            {/* LISTE D'OFFRES */}
                            <section className="md:w-3/4 w-full space-y-4">
                                <Card>
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

                                <Card>
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
                <footer className="mt-8 border-t py-4 text-center text-sm text-gray-600">
                    <div className="mb-2 space-x-4">
                        <a href="#"
                           className="hover:underline">
                            À propos
                        </a>
                        <a href="#"
                           className="hover:underline">
                            Contact
                        </a>
                        <a href="#"
                           className="hover:underline">
                            Mentions légales
                        </a>
                    </div>
                    <p>© 2024 BalanceTonJob – Créé par JM &amp; Vladou. Open-source sous licence.</p>
                </footer>
            </main>
        </div>
    )
}
