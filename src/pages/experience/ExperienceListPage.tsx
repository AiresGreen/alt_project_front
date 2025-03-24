import { useContext, useState } from "react";
import { AuthContext } from "@/hook/contexts/auth.context";

// React Hook Form + Zod
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Lucide React (icônes)
import { Edit, Trash2 } from "lucide-react";

// shadcn/ui (exemple, adapte selon ton organisation de composants)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Schéma Zod pour valider le formulaire
const experienceSchema = z.object({
    poste: z.string().min(1, "Le poste est requis"),
    entreprise: z.string().min(1, "Le nom de l’entreprise est requis"),
    dateDebut: z.string().optional(),
    dateFin: z.string().optional(),
    description: z.string().optional(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

export default function ExperienceListePage() {
    // Vérifie l’authentification via le contexte
    const { isAuthenticated } = useContext(AuthContext);

    // État local pour gérer la liste d’expériences
    const [experiences, setExperiences] = useState<ExperienceFormData[]>([]);

    // État pour savoir si on modifie une expérience en particulier (index)
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // État booléen pour afficher/masquer le formulaire
    const [showForm, setShowForm] = useState<boolean>(false);

    // Hook pour form (React Hook Form + Zod)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ExperienceFormData>({
        resolver: zodResolver(experienceSchema),
    });

    // Si pas connecté, on n’affiche pas la page
    if (!isAuthenticated) {
        return <p className="p-4">Vous devez être connecté pour accéder à cette page.</p>;
    }

    // Soumission du formulaire (ajout ou édition)
    const onSubmit = (data: ExperienceFormData) => {
        if (editingIndex === null) {
            // Ajout d’une nouvelle expérience
            setExperiences([...experiences, data]);
        } else {
            // Modification d’une expérience existante
            const updatedList = [...experiences];
            updatedList[editingIndex] = data;
            setExperiences(updatedList);
            setEditingIndex(null);
        }

        // On réinitialise le formulaire
        reset();
        // On masque le formulaire après la soumission
        setShowForm(false);
    };

    // Clic sur "Nouvelle expérience"
    const handleNewExperience = () => {
        // Mode ajout
        setEditingIndex(null);
        // On réinitialise le formulaire pour être sûr qu’il soit vide
        reset();
        // On affiche le formulaire
        setShowForm(true);
    };

    // Clic sur "Modifier"
    const handleEdit = (index: number) => {
        // On passe en mode édition
        setEditingIndex(index);
        // Charge les données existantes dans le formulaire
        reset(experiences[index]);
        // On affiche le formulaire
        setShowForm(true);
    };

    // Clic sur "Supprimer"
    const handleDelete = (index: number) => {
        const updatedList = [...experiences];
        updatedList.splice(index, 1);
        setExperiences(updatedList);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Expériences Professionnelles</h1>

            {/* Bouton pour afficher le formulaire d’ajout */}
            {!showForm && (
                <Button onClick={handleNewExperience} className="mb-4">
                    Nouvelle expérience
                </Button>
            )}

            {/* Formulaire (affiché seulement si showForm === true) */}
            {showForm && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mb-8 p-4 rounded-lg bg-card-custom"
                >
                    <div>
                        <Label htmlFor="poste">Poste</Label>
                        <Input
                            id="poste"
                            placeholder="Intitulé du poste"
                            {...register("poste")}
                        />
                        {errors.poste && (
                            <p className="text-red-500 text-sm mt-1">{errors.poste.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="entreprise">Entreprise</Label>
                        <Input
                            id="entreprise"
                            placeholder="Nom de l’entreprise"
                            {...register("entreprise")}
                        />
                        {errors.entreprise && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.entreprise.message}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label htmlFor="dateDebut">Date de début</Label>
                            <Input
                                id="dateDebut"
                                type="text"
                                placeholder="ex: 2015 ou 01/2015"
                                {...register("dateDebut")}
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="dateFin">Date de fin</Label>
                            <Input
                                id="dateFin"
                                type="text"
                                placeholder="ex: 2018 ou 12/2018"
                                {...register("dateFin")}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">Description du poste</Label>
                        <Textarea
                            id="description"
                            placeholder="Décrivez vos missions, vos réalisations..."
                            {...register("description")}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="submit">
                            {editingIndex === null ? "Ajouter" : "Enregistrer"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                // Annule et referme le formulaire
                                reset();
                                setShowForm(false);
                                setEditingIndex(null);
                            }}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            )}

            {/* Liste des expériences */}
            <div className="space-y-4 bg-card-custom">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded flex flex-col  md:flex-row md:items-center md:justify-between"
                    >
                        <div className="mb-4 md:mb-0">
                            {/* Titre (poste) et entreprise */}
                            <p className="font-semibold text-black text-lg">{exp.poste}</p>
                            <p className="text-sm text-black">{exp.entreprise}</p>

                            {/* Période */}
                            {(exp.dateDebut || exp.dateFin) && (
                                <p className="text-sm text-black mt-1">
                                    Période : {exp.dateDebut} – {exp.dateFin}
                                </p>
                            )}

                            {/* Description */}
                            {exp.description && (
                                <p className="text-sm text-black mt-2 whitespace-pre-wrap">
                                    {exp.description}
                                </p>
                            )}
                        </div>

                        <div className="flex space-x-2 self-end md:self-center">
                            <Button variant="outline" onClick={() => handleEdit(index)}>
                                <Edit className="w-4 h-4 mr-1" />
                                Modifier
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(index)}>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Supprimer
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
