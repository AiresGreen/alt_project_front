import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Hobby } from "@/interface/HobbyInterface"

// Composants shadcn/ui
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Icônes (lucide-react)
import { Edit, Trash } from "lucide-react"
import {BackButton} from "@/components/BackButton/BackButton.tsx";

export default function HobbiesListPage() {
    // Exemple de structure de données pour les loisirs (on stocke en local state)
    const [hobbies, setHobbies] = useState<Hobby[]>([
        { id: 1, title: "Jouer", since: "2021", conclusion: "Très fun" },
        { id: 2, title: "Manger", since: "2019", conclusion: "Très bon" },
    ])

    // Hobby actuellement sélectionné pour la modification
    const [currentHobby, setCurrentHobby] = useState<Hobby | null>(null)

    // "list" | "add" | "edit"
    const [mode, setMode] = useState<"list" | "add" | "edit">("list")

    // Hook form
    const { register, handleSubmit, reset } = useForm()

    /**
     * Soumission du formulaire (pour ajouter ou éditer)
     */
    const onSubmit = (data: any) => {
        if (mode === "add") {
            // Ajout d'un nouveau hobby
            const newHobby: Hobby = {
                id: Date.now(), // id fictif
                ...data,
            }
            setHobbies([...hobbies, newHobby])
            toast.success("Loisir ajouté avec succès !")
        } else if (mode === "edit" && currentHobby) {
            // Édition d’un hobby existant
            setHobbies(
                hobbies.map((h) =>
                    h.id === currentHobby.id
                        ? { ...h, ...data } // On met à jour les champs
                        : h
                )
            )
            toast.success("Loisir modifié avec succès !")
        }

        // Après la soumission, on repasse en mode "list" et on reset le formulaire
        reset()
        setMode("list")
        setCurrentHobby(null)
    }

    /**
     * Affiche le formulaire d'ajout
     */
    const handleAddNew = () => {
        reset()
        setCurrentHobby(null)
        setMode("add")
    }

    /**
     * Affiche le formulaire d'édition avec les valeurs d'un hobby
     */
    const handleEdit = (hobby: Hobby) => {
        setCurrentHobby(hobby)
        reset(hobby) // Pré-remplit le formulaire avec les données existantes
        setMode("edit")
    }

    /**
     * Supprime un hobby
     */
    const handleDelete = (id: number) => {
        setHobbies(hobbies.filter((h) => h.id !== id))
        toast.success("Loisir supprimé avec succès !")
    }

    /**
     * Annuler l'ajout ou l'édition, retour à la liste
     */
    const handleCancel = () => {
        reset()
        setCurrentHobby(null)
        setMode("list")
    }

    return (
        <div className="container mx-auto max-w-md p-4">
            {/* Mode Liste */}
            {mode === "list" && (
                <Card className={"bg-card-custom text-black"}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Loisirs</CardTitle>
                        <CardDescription className={"text-black"}>Gérez la liste de vos hobbies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Bouton pour créer un nouveau loisir */}
                        <Button variant="default" onClick={handleAddNew} className="mb-4">
                            Nouveau
                        </Button>

                        {/* Liste des hobbies existants */}
                        {hobbies.length === 0 ? (
                            <p>Aucun loisir pour le moment.</p>
                        ) : (
                            <ul className="space-y-2">
                                {hobbies.map((hobby) => (
                                    <li
                                        key={hobby.id}
                                        className="flex items-center justify-between rounded border p-2"
                                    >
                                        <div>
                                            <div className="font-semibold">{hobby.title}</div>
                                            <div className="text-sm">
                                                Depuis : {hobby.since}
                                            </div>
                                            <div className="text-sm">{hobby.conclusion}</div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" onClick={() => handleEdit(hobby)}>
                                                <Edit className="mr-1 h-4 w-4" />
                                                Modifier
                                            </Button>
                                            <Button variant="destructive" onClick={() => handleDelete(hobby.id)}>
                                                <Trash className="mr-1 h-4 w-4" />
                                                Supprimer
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                    <CardFooter>
                        <BackButton/>
                    </CardFooter>
                </Card>
            )}

            {/* Mode Ajout / Édition */}
            {(mode === "add" || mode === "edit") && (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>{mode === "add" ? "Ajouter un Loisir" : "Modifier un Loisir"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Vite Hobby</Label>
                                <Input
                                    id="title"
                                    placeholder="Ex : Jouer, Lire..."
                                    {...register("title", { required: true })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="since">Depuis quand ?</Label>
                                <Input
                                    id="since"
                                    placeholder="Ex : 2021"
                                    {...register("since")}
                                />
                            </div>

                            <div>
                                <Label htmlFor="conclusion">Et quoi en conclure ?</Label>
                                <Textarea
                                    id="conclusion"
                                    placeholder="Ex : C'est super !"
                                    rows={3}
                                    {...register("conclusion")}
                                />
                            </div>

                            <div className="flex space-x-2 pt-2">
                                <Button type="submit" variant="default">
                                    {mode === "add" ? "Ajouter" : "Enregistrer"}
                                </Button>
                                <Button type="button" variant="secondary" onClick={handleCancel}>
                                    Annuler
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
