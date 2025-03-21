import { useMediaQuery } from 'react-responsive';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthContext } from '@/hook/contexts/auth.context';
import {useContext} from "react";

const formSchema = z.object({
    nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères.'),
    prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères.'),
    email: z.string().email('Veuillez fournir un email valide.'),
});

export default function EnterprisePage () {
    const isMobile = useMediaQuery({query:'(max-width: 768px)'});
    const { isAuthenticated } = useContext(AuthContext);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { nom: '', prenom: '', email: '' },
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* En-tête */}
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">EntrepriseTech – Innover, Connecter, Réussir</h1>
                {isMobile && (
                    <Button variant="ghost">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </Button>
                )}
            </header>

            {/* Galerie photos */}
            <section className="mb-6 overflow-x-auto flex gap-4">
                <img src="photo1.jpg" alt="Entreprise" className="w-full md:w-1/3 rounded-lg" />
                {!isMobile && <img src="photo2.jpg" alt="Entreprise" className="w-1/3 rounded-lg" />}
                {!isMobile && <img src="photo3.jpg" alt="Entreprise" className="w-1/3 rounded-lg" />}
            </section>

            {/* Infos détaillées en accordéon mobile */}
            <section className="space-y-4">
                {[
                    {
                        title: "Détail sur l’entreprise",
                        content: (
                            <ul>
                                <li><strong>Localisation :</strong> Paris, France</li>
                                <li><strong>Taille :</strong> 250-1000 employés</li>
                                <li><strong>Secteur :</strong> Technologies SaaS</li>
                            </ul>
                        ),
                    },
                    {
                        title: "Valeurs & Missions",
                        content: (
                            <ul>
                                <li>Respect, innovation, performance.</li>
                                <li>Développer des solutions SaaS innovantes.</li>
                                <li>Épanouissement professionnel et équilibre vie privée.</li>
                            </ul>
                        ),
                    },
                    {
                        title: "Pourquoi nous rejoindre ?",
                        content: (
                            <ul>
                                <li>Entreprise en pleine croissance.</li>
                                <li>Opportunités de carrière.</li>
                                <li>Horaires flexibles.</li>
                            </ul>
                        ),
                    },
                ].map((section, idx) => (
                    <details key={idx} open={idx === 0}>
                        <summary className="font-semibold cursor-pointer py-2">{section.title}</summary>
                        <Card className="mt-2">
                            <CardContent>{section.content}</CardContent>
                        </Card>
                    </details>
                ))}
            </section>

            {/* Offres d'emploi */}
            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Offres d'emploi actuelles</h2>
                <div className="flex overflow-x-auto gap-4">
                    {[
                        { title: "Développeur Full-Stack ICEL", location: "Paris/Remote" },
                        { title: "Chargé de communication digitale", location: "Stage, Paris" },
                    ].map((job, idx) => (
                        <Card key={idx} className="min-w-full md:min-w-0 md:w-1/3">
                            <CardContent>
                                <h3 className="font-bold">{job.title}</h3>
                                <p>{job.location}</p>
                                <Button variant="link">Voir plus</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Candidature spontanée */}
            {isAuthenticated && !isMobile && (
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Candidature spontanée</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
                            <FormField control={form.control} name="nom" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl><Input placeholder="Nom" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="prenom" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl><Input placeholder="Prénom" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl><Input placeholder="E-mail" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit">Envoyer</Button>
                        </form>
                    </Form>
                </section>
            )}

            {isAuthenticated && isMobile && (
                <Button className="fixed bottom-4 right-4 shadow-lg">Postuler</Button>
            )}
        </div>
    );
};


