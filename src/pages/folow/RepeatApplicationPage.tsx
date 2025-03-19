import { Checkbox } from "@radix-ui/react-checkbox"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {Link} from "react-router-dom";


interface Candidature {
    id: number
    title: string
    contractType: string
    location: string
    cvChecked: boolean
    reponse: string
    entretien: string
    statut: string
    relanceCount: number
}

export default function RepeatApplicationPage() {
    // Exemple de données mock
    const [candidatures, setCandidatures] = React.useState<Candidature[]>([
        {
            id: 1,
            title: "[Titre du poste]",
            contractType: "CDI / CDD / Freelance",
            location: "[Ville ou Remote]",
            cvChecked: true,
            reponse: "recu",
            entretien: "non",
            statut: "en-cours",
            relanceCount: 2,
        },
        {
            id: 2,
            title: "[Titre du poste]",
            contractType: "CDI / CDD / Freelance",
            location: "[Ville ou Remote]",
            cvChecked: false,
            reponse: "non-recu",
            entretien: "non",
            statut: "acceptee",
            relanceCount: 0,
        },
    ])

    // Gestion de la checkbox CV
    const handleCheckboxChange = (id: number) => {
        setCandidatures((prev) =>
            prev.map((cand) =>
                cand.id === id ? { ...cand, cvChecked: !cand.cvChecked } : cand
            )
        )
    }

    // Gestion des selects Réponse / Entretien / Statut
    const handleSelectChange = (
        id: number,
        field: "reponse" | "entretien" | "statut",
        value: string
    ) => {
        setCandidatures((prev) =>
            prev.map((cand) => (cand.id === id ? { ...cand, [field]: value } : cand))
        )
    }

    // Incrémente le compteur de relance
    const handleRelance = (id: number) => {
        setCandidatures((prev) =>
            prev.map((cand) =>
                cand.id === id
                    ? { ...cand, relanceCount: cand.relanceCount + 1 }
                    : cand
            )
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Barre supérieure (facultatif, selon la maquette) */}
            <div className="bg-blue-600 text-white p-4">
                <h1 className="text-xl font-bold">Suivi de mes candidatures</h1>
            </div>

            {/* Contenu principal */}
            <div className="p-4 space-y-6">
                {candidatures.map((cand) => (
                    <div key={cand.id} className="rounded-md overflow-hidden shadow">
                        {/* Header coloré */}
                        <div className="bg-blue-600 text-white p-3 font-semibold">
                            {cand.title} - {cand.contractType} - {cand.location}
                        </div>

                        {/* Contenu de la candidature */}
                        <div className="bg-white p-4">
                            <div className="grid grid-cols-4 gap-4">
                                {/* CV */}
                                <div>
                                    <Label className="mb-1 block text-sm">CV</Label>
                                    <Checkbox
                                        checked={cand.cvChecked}
                                        onCheckedChange={() => handleCheckboxChange(cand.id)}
                                    />
                                </div>

                                {/* Réponse */}
                                <div>
                                    <Label className="mb-1 block text-sm">Réponse</Label>
                                    <Select
                                        value={cand.reponse}
                                        onValueChange={(value) =>
                                            handleSelectChange(cand.id, "reponse", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="recu">Reçu</SelectItem>
                                            <SelectItem value="non-recu">Non-reçu</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Entretien */}
                                <div>
                                    <Label className="mb-1 block text-sm">Entretien</Label>
                                    <Select
                                        value={cand.entretien}
                                        onValueChange={(value) =>
                                            handleSelectChange(cand.id, "entretien", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="invite">Invité.e</SelectItem>
                                            <SelectItem value="non">Non</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Statut */}
                                <div>
                                    <Label className="mb-1 block text-sm">Statut</Label>
                                    <Select
                                        value={cand.statut}
                                        onValueChange={(value) =>
                                            handleSelectChange(cand.id, "statut", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en-cours">En cours</SelectItem>
                                            <SelectItem value="acceptee">Acceptée</SelectItem>
                                            <SelectItem value="refusee">Refusée</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Affichage du compteur de relances */}
                            <div className="mt-4 text-center text-xl font-bold">
                                {cand.relanceCount}
                            </div>

                            {/* Bouton de relance */}
                            <div className="mt-4 flex justify-center">
                                <Button onClick={() => handleRelance(cand.id)}>
                                    <Link to="/offers-of-employer">
                                    Relancer ma candidature
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bouton Retour en bas */}
            <div className="p-4">
                <Button variant="secondary" className="w-full">
                    <Link to="/applications">
                    Retour
                    </Link>
                </Button>
            </div>
        </div>
    )
}
