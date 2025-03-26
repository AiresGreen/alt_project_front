
import { useForm, useFieldArray } from "react-hook-form"

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import {
    Checkbox,
    CheckboxIndicator,
} from "@radix-ui/react-checkbox"


// Bouton et Link
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {BackButton} from "@/components/BackButton/BackButton.tsx";

//
// 1. Définition des types
//
interface Candidature {
    id: number
    title: string
    contractType: string
    location: string
    cvChecked: boolean
    reponse: string
    entretien: string
    statut: string
}

type FormValues = {
    // Notre formulaire contient un tableau de candidatures
    candidatures: Candidature[]
}

//
// 2. Composant principal
//
export default function FolowApplicationPage() {
    //
    // 2.1 Initialisation du formulaire
    //
    const form = useForm<FormValues>({
        defaultValues: {
            candidatures: [
                {
                    id: 1,
                    title: "[Titre du poste]",
                    contractType: "CDI / CDD / Freelance",
                    location: "[Ville ou Remote]",
                    cvChecked: false,
                    reponse: "non-recu",
                    entretien: "non",
                    statut: "en-cours",
                },
                {
                    id: 2,
                    title: "[Titre du poste]",
                    contractType: "CDI / CDD / Freelance",
                    location: "[Ville ou Remote]",
                    cvChecked: true,
                    reponse: "recu",
                    entretien: "invite",
                    statut: "acceptee",
                },
                {
                    id: 3,
                    title: "[Titre du poste]",
                    contractType: "CDI / CDD / Freelance",
                    location: "[Ville ou Remote]",
                    cvChecked: false,
                    reponse: "non-recu",
                    entretien: "non",
                    statut: "refusee",
                },
            ],
        },
    })

    // Pour gérer un tableau dynamique de candidatures
    const { control, handleSubmit } = form
    const { fields } = useFieldArray({
        control,
        name: "candidatures", // correspond au champ du form
    })

    //
    // 2.2 Soumission du formulaire
    //
    const onSubmit = (data: FormValues) => {
        console.log("Form data:", data)
    }

    //
    // 2.3 Rendu
    //
    return (
        <Form {...form}>
            {/* Le tag <form> de base + handleSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                <h1 className="text-2xl font-bold mb-6">
                    Suivi de mes candidatures
                </h1>

                <div className="space-y-6 bg-card-custom">
                    {/* On mappe sur `fields` (venant de useFieldArray) */}
                    {fields.map((cand, index) => (
                        <div
                            key={cand.id} // `field.id` géré par RHF, ici on peut aussi utiliser cand.id
                            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                        >
                            {/* Titre de l'offre */}
                            <div className="text-lg font-semibold mb-4">
                                {cand.title} - {cand.contractType} - {cand.location}
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                {/* Champ CV (checkbox) */}
                                <FormField
                                    control={control}
                                    // Chemin : candidatures[index].cvChecked
                                    name={`candidatures.${index}.cvChecked`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CV</FormLabel>
                                            <div
                                                className="
                          w-5 h-5
                          flex items-center justify-center
                          rounded border border-gray-300
                          bg-white
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                                            >
                                                <Checkbox
                                                    // Liaison value <-> form
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                >
                                                    <CheckboxIndicator>
                                                        <svg
                                                            className="w-4 h-4 text-blue-600"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M20 6L9 17l-5-5" />
                                                        </svg>
                                                    </CheckboxIndicator>
                                                </Checkbox>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Champ Réponse (Select) */}
                                <FormField
                                    control={control}
                                    name={`candidatures.${index}.reponse`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Réponse</FormLabel>
                                            <Select
                                                // Valeur actuelle + callback
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="
                              w-full inline-flex items-center justify-between
                              rounded border border-gray-300
                              bg-white px-2 py-1
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                            "
                                                    >
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent
                                                    className="
                            bg-white border border-gray-300
                            rounded shadow-lg z-50 text-black
                          "
                                                >
                                                    <SelectItem value="recu">Reçu</SelectItem>
                                                    <SelectItem value="non-recu">Non-reçu</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Champ Entretien (Select) */}
                                <FormField
                                    control={control}
                                    name={`candidatures.${index}.entretien`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Entretien</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="
                              w-full inline-flex items-center justify-between
                              rounded border border-gray-300
                              bg-white px-2 py-1
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                            "
                                                    >
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent
                                                    className="
                            bg-white border border-gray-300
                            rounded shadow-lg z-50 text-black
                          "
                                                >
                                                    <SelectItem value="invite">Invité.e</SelectItem>
                                                    <SelectItem value="non">Non</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Champ Statut (Select) */}
                                <FormField
                                    control={control}
                                    name={`candidatures.${index}.statut`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Statut</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="
                              w-full inline-flex items-center justify-between
                              rounded border border-gray-300
                              bg-white px-2 py-1
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                            "
                                                    >
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent
                                                    className="
                            bg-white border border-gray-300
                            rounded shadow-lg z-50 text-black
                          "
                                                >
                                                    <SelectItem value="en-cours">En cours</SelectItem>
                                                    <SelectItem value="acceptee">Acceptée</SelectItem>
                                                    <SelectItem value="refusee">Refusée</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Boutons en bas */}
                <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Button>
                        <Link to="/repeat-application">
                            Relancer ma candidature
                        </Link>
                    </Button>
                    <Button>
                        <Link to="/choose-questionner">
                            Envoyer la demande de retour
                        </Link>
                    </Button>
                    <BackButton/>
                </div>
            </form>
        </Form>
    )
}
