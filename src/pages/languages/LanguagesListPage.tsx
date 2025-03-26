import { useState } from "react";
import { LanguageInterface } from "@/interface/LanguageInterface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

export const LanguagesListPage = () => {
    // State pour la liste des langues
    const [langues, setLangues] = useState<LanguageInterface[]>([]);

    // States pour le formulaire
    const [nom, setNom] = useState("");
    const [niveau, setNiveau] = useState("");

    // States pour l’édition
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // Soumission du formulaire (création ou édition)
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (isEditing && editId !== null) {
            // Mode édition : mise à jour de la langue ciblée
            setLangues((prevLangues) =>
                prevLangues.map((langue) =>
                    langue.id === editId ? { ...langue, nom, niveau } : langue
                )
            );
            toast.success("Langue modifiée avec succès");
        } else {
            // Mode création : ajout d'une nouvelle langue
            const newId = new Date().getTime(); // Génère un id unique
            const nouvelleLangue: LanguageInterface = {
                id: newId,
                nom,
                niveau,
            };
            setLangues((prevLangues) => [...prevLangues, nouvelleLangue]);
            toast.success("Langue ajoutée avec succès");
        }
        resetForm();
    };

    // Lance l’édition d’une langue existante
    const handleEdit = (langue: LanguageInterface) => {
        setIsEditing(true);
        setEditId(langue.id);
        setNom(langue.nom);
        setNiveau(langue.niveau);
    };

    // Supprime une langue
    const handleDelete = (id: number) => {
        setLangues((prevLangues) => prevLangues.filter((l) => l.id !== id));
        toast("Langue supprimée");
    };

    // Réinitialise le formulaire et repasse en mode création
    const resetForm = () => {
        setIsEditing(false);
        setEditId(null);
        setNom("");
        setNiveau("");
    };

    return (
        <div className="p-6 space-y-6">
            {/* Formulaire de création / édition */}
            <Card className="bg-card-custom">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        {isEditing ? "Modifier une langue" : "Ajouter une nouvelle langue"}
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit} >
                    <CardContent className="space-y-4 text-black">
                        <div>
                            <Label htmlFor="nom" className="block mb-1">
                                Nom de la langue
                            </Label>
                            <Input
                                id="nom"
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                placeholder="Ex : Français"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="niveau" className="block mb-1">
                                Niveau
                            </Label>
                            <Input
                                id="niveau"
                                type="text"
                                value={niveau}
                                onChange={(e) => setNiveau(e.target.value)}
                                placeholder="Ex : C1"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center space-x-4">
                        <Button type="submit" variant="default">
                            {isEditing ? "Enregistrer" : "Ajouter"}
                        </Button>
                        {isEditing && (
                            <Button type="button" variant="outline" onClick={resetForm}>
                                Annuler
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>

            {/* Liste des langues */}
            <div className={"bg-card-custom"}>
                <h2 className="text-xl font-semibold mb-4 text-black">Langues enregistrées</h2>
                {langues.length === 0 ? (
                    <p>Aucune langue pour le moment.</p>
                ) : (
                    <div className="grid gap-4">
                        {langues.map((langue) => (
                            <Card key={langue.id} className="border bg-card-custom">
                                <CardHeader>
                                    <CardTitle>{langue.nom}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        <strong>Niveau :</strong> {langue.niveau}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex space-x-2">
                                    <Button
                                        onClick={() => handleEdit(langue)}
                                        variant="secondary"
                                        size="sm"
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(langue.id)}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Supprimer
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Bouton de retour */}
            <div>
                <BackButton/>
            </div>
        </div>
    );
};
