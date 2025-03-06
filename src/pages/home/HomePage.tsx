import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Filter } from "lucide-react"

export const HomePage = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <NavigationBar />
            <main>
                {/* CONTENU PRINCIPAL */}
                <div className="container mx-auto mt-4 flex flex-1 flex-col md:flex-row gap-4 px-4">
                    {/* SIDEBAR / FILTRES */}
                    <aside className="md:w-1/4 w-full border p-4 rounded-lg space-y-4">
                        {/* Bouton principal "GET offer" */}
                        <Button className="w-full">GET offer</Button>

                        {/* Filtres */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            {/* Le bouton qui ouvre la Sheet */}
                            <SheetTrigger asChild>
                                <Button variant="outline" className="flex items-center space-x-2">
                                    <Filter className="h-4 w-4" />
                                    <span>Filtre</span>
                                </Button>
                            </SheetTrigger>

                            {/* Contenu de la Sheet (panneau latéral) */}
                            <SheetContent side="right" className="w-[80%] sm:w-[60%] md:w-[40%]">
                                <SheetHeader>
                                    <SheetTitle>Filtrer</SheetTitle>
                                    <SheetDescription>Affinez votre recherche</SheetDescription>
                                </SheetHeader>

                                <div className="mt-4">
                                    {/* Accordéon principal : on peut ouvrir plusieurs items en même temps => type="multiple" */}
                                    <Accordion type="multiple" className="space-y-2">
                                        {/* 1) Type de contrat */}
                                        <AccordionItem value="type-contrat">
                                            <AccordionTrigger>Type de contrat</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="mt-2 space-y-2 ml-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="cdi" />
                                                        <Label htmlFor="cdi">CDI</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="cdd" />
                                                        <Label htmlFor="cdd">CDD</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="autre" />
                                                        <Label htmlFor="autre">Autre</Label>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* 2) Niveau d'expérience */}
                                        <AccordionItem value="experience">
                                            <AccordionTrigger>Niveau d’expérience</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="mt-2 space-y-2 ml-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="junior" />
                                                        <Label htmlFor="junior">Junior</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="intermediaire" />
                                                        <Label htmlFor="intermediaire">Intermédiaire</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="senior" />
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
                                                        <Checkbox id="temps-plein" />
                                                        <Label htmlFor="temps-plein">Temps plein</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="temps-partiel" />
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
                                                        <Checkbox id="remote" />
                                                        <Label htmlFor="remote">Télétravail</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="onsite" />
                                                        <Label htmlFor="onsite">Sur site</Label>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* 5) Lieu (exemple en Select) */}
                                        <AccordionItem value="lieu">
                                            <AccordionTrigger>Lieu</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="mt-2 ml-4">
                                                    <Select>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Sélectionnez un lieu" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="paris">Paris</SelectItem>
                                                            <SelectItem value="lyon">Lyon</SelectItem>
                                                            <SelectItem value="marseille">Marseille</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* 6) Secteur d'activité */}
                                        <AccordionItem value="secteur">
                                            <AccordionTrigger>Secteur d'activité</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="mt-2 space-y-2 ml-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="secteur1" />
                                                        <Label htmlFor="secteur1">Secteur 1</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="secteur2" />
                                                        <Label htmlFor="secteur2">Secteur 2</Label>
                                                    </div>
                                                    {/* Ajoute d'autres secteurs si besoin */}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* 7) Métier */}
                                        <AccordionItem value="metier">
                                            <AccordionTrigger>Métier</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="mt-2 space-y-2 ml-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="dev" />
                                                        <Label htmlFor="dev">Développeur</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="designer" />
                                                        <Label htmlFor="designer">Designer</Label>
                                                    </div>
                                                    {/* etc. */}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Bouton "Créer le CV" */}
                        <Button className="w-full">
                            Créer le CV
                        </Button>
                    </aside>

                    {/* LISTE D'OFFRES */}
                    <section className="md:w-3/4 w-full space-y-4">
                        {/* Exemple d'une offre */}
                        <Card>
                            <CardHeader>
                                <CardTitle>[Titre du poste] – CDI / CDD / Freelance</CardTitle>
                                <CardDescription>
                                    <span className="text-sm">Lieu : Ville / Télétravail</span>
                                    <br />
                                    <span className="text-sm">
                    Type de contrat : CDI / CDD / Alternance / Stage / Freelance
                  </span>
                                    <br />
                                    <span className="text-sm">
                    Salaire : Fourchette de rémunération
                  </span>
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

                        {/* Exemple d'une deuxième offre */}
                        <Card>
                            <CardHeader>
                                <CardTitle>[Titre du poste 2] – CDI / CDD / Freelance</CardTitle>
                                <CardDescription>
                                    <span className="text-sm">Lieu : Ville / Télétravail</span>
                                    <br />
                                    <span className="text-sm">
                    Type de contrat : CDI / CDD / Alternance / Stage / Freelance
                  </span>
                                    <br />
                                    <span className="text-sm">
                    Salaire : Fourchette de rémunération
                  </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    Autre description de l'offre...
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button>Voir offre</Button>
                            </CardFooter>
                        </Card>
                    </section>
                </div>

                {/* FOOTER */}
                <footer className="mt-auto border-t py-4 text-center text-sm text-gray-600">
                    <div className="mb-2 space-x-4">
                        <Link to="/apropos" className="hover:underline">
                            À propos
                        </Link>
                        <Link to="/contact" className="hover:underline">
                            Contact
                        </Link>
                        <Link to="/mentions-legales" className="hover:underline">
                            Mentions légales
                        </Link>
                    </div>
                    <p>
                        © 2024 BalanceTonJob – Créé par JM &amp; Vladou. Open-source sous licence.
                    </p>
                </footer>
            </main>
        </>
    );
};
