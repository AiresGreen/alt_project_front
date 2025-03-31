import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "react-responsive";

// Contexte d'authentification
import { AuthContext } from "@/hook/contexts/auth.context";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {generateFakeUser} from "@/utils/generateFakeUser .tsx";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

type ProfileFormData = {
    name: string;
    phone: string;
};

export const ProfileDetailsPage = () => {
    const navigate = useNavigate();
    const { userProfile } = useContext(AuthContext); // ou { isAuthenticated, user } selon votre structure
    const { register, handleSubmit } = useForm<ProfileFormData>();

    //React-responsive
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const onSubmit = (data: ProfileFormData) => {
        // Faites quelque chose avec les données du formulaire
        toast.success("Profil mis à jour !");
        console.log("Données du formulaire :", data);
    };
    const [testUser, setTestUser] = useState<any>(generateFakeUser);

    // Utiliser directement la fonction utilitaire pour obtenir un faux utilisateur
    useEffect(() => {
        if (userProfile) {
            const fakeUser = generateFakeUser();
            setTestUser(fakeUser);
        }
    }, [userProfile]);

    if (!testUser) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Titre principal */}
            <h1 className="text-2xl font-bold mb-4">
                {isMobile ? "Profil" : "Détails du Profil"}
            </h1>

            {/* Formulaire d'exemple avec react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
                <div>
                    <label className="block font-semibold mb-1">Nom :</label>
                    <input
                        type="text"
                        className="border p-2 w-full rounded"
                        {...register("name")}
                        defaultValue={testUser.name || ""}
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Téléphone :</label>
                    <input
                        type="text"
                        className="border p-2 w-full rounded"
                        {...register("phone")}
                        defaultValue={testUser.telephone || ""}
                    />
                </div>
                <Button type="submit">Enregistrer</Button>
            </form>

            {/* Cartes correspondant aux différentes sections du CV */}
            <section className="space-y-4 ">
                {/* Infos Zutiles */}
                <Card className=" text-black">
                    <CardHeader>
                        <CardTitle>Infos Zutiles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{testUser.infosUtiles}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate("/info-zutile")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 3C5 3 1.73 7.11 1.05 9.08a.998.998 0 000 .84C1.73 11.89 5 16 10 16s8.27-4.11 8.95-6.08a.998.998 0 000-.84C18.27 7.11 15 3 10 3zM10 14c-2.21 0-4-1.79-4-4 0-2.21
                  1.79-4 4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
                            </svg>
                            Voir
                        </Button>
                    </CardFooter>
                </Card>

                {/* Expériences Professionnelles */}
                <Card className=" text-black">
                    <CardHeader>
                        <CardTitle>Expériences Professionnelles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{testUser.experiences}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate("/experience")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 3C5 3 1.73 7.11 1.05 9.08a.998.998 0 000 .84C1.73 11.89 5 16 10 16s8.27-4.11
                  8.95-6.08a.998.998 0 000-.84C18.27 7.11 15 3 10 3zM10 14c-2.21 0-4-1.79-4-4
                  0-2.21 1.79-4 4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
                            </svg>
                            Voir
                        </Button>
                    </CardFooter>
                </Card>

                {/* Formation / Education */}
                <Card className=" text-black">
                    <CardHeader>
                        <CardTitle>Formation / Éducation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{testUser.formations}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate("/education")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 3C5 3 1.73 7.11 1.05 9.08a.998.998 0 000 .84C1.73 11.89
                  5 16 10 16s8.27-4.11 8.95-6.08a.998.998 0 000-.84C18.27 7.11
                  15 3 10 3zM10 14c-2.21 0-4-1.79-4-4 0-2.21 1.79-4
                  4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
                            </svg>
                            Voir
                        </Button>
                    </CardFooter>
                </Card>

                {/* Compétences */}
                <Card className=" text-black">
                    <CardHeader>
                        <CardTitle>Compétences</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{testUser.competences}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate("/skills")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 3C5 3 1.73 7.11 1.05 9.08a.998.998 0 000 .84C1.73 11.89
                  5 16 10 16s8.27-4.11 8.95-6.08a.998.998 0 000-.84C18.27 7.11
                  15 3 10 3zM10 14c-2.21 0-4-1.79-4-4 0-2.21 1.79-4
                  4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
                            </svg>
                            Voir
                        </Button>
                    </CardFooter>
                </Card>

                {/* Projets de Folie */}
                <Card className=" text-black">
                    <CardHeader>
                        <CardTitle>Projets de Folie</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{testUser.projetFolie}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate("/projects")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 3C5 3 1.73 7.11 1.05 9.08a.998.998 0 000 .84C1.73 11.89
                  5 16 10 16s8.27-4.11 8.95-6.08a.998.998 0 000-.84C18.27 7.11
                  15 3 10 3zM10 14c-2.21 0-4-1.79-4-4 0-2.21 1.79-4
                  4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
                            </svg>
                            Voir
                        </Button>
                    </CardFooter>
                </Card>

                {/* Langues Parlées */}
                <Card className=" text-black">
                    <CardHeader>
                        <CardTitle>Langues Parlées</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{testUser.langues}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate("/languages")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 3C5 3 1.73 7.11 1.05 9.08a.998.998 0 000 .84C1.73 11.89
                  5 16 10 16s8.27-4.11 8.95-6.08a.998.998 0 000-.84C18.27 7.11
                  15 3 10 3zM10 14c-2.21 0-4-1.79-4-4 0-2.21 1.79-4
                  4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
                            </svg>
                            Voir
                        </Button>
                    </CardFooter>
                </Card>

                {/* Loisirs */}
                <Card className=" text-black">
                    <CardHeader>
                        <CardTitle>Loisirs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{testUser.loisirs}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate("/hobbies")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 3C5 3 1.73 7.11 1.05 9.08a.998.998 0 000 .84C1.73 11.89
                  5 16 10 16s8.27-4.11 8.95-6.08a.998.998 0 000-.84C18.27 7.11
                  15 3 10 3zM10 14c-2.21 0-4-1.79-4-4 0-2.21 1.79-4
                  4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z" />
                            </svg>
                            Voir
                        </Button>
                    </CardFooter>
                </Card>
            </section>

            {/* Bouton de retour*/}
            <div className="mt-8">
                <BackButton/>
            </div>
        </div>
    );
};
