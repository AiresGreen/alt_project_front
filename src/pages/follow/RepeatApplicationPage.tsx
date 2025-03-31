import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"

// On importe le hook du contexte
import { useCandidateContext } from "@/hook/contexts/candidates.context.tsx"
import {BackButton} from "@/components/BackButton/BackButton.tsx";

export default function RepeatApplicationPage() {
    // On récupère candidatures et setCandidatures depuis le contexte
    const { candidatures, setCandidatures } = useCandidateContext()

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
            prev.map((cand) =>
                cand.id === id ? { ...cand, [field]: value } : cand
            )
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
    console.log(candidatures)
    return (
        <div className="min-h-screen ">
            <div className="p-4">
                <h1 className="text-xl font-bold">Suivi de mes candidatures</h1>
            </div>

            {/* Contenu principal */}
            <div className="p-4 space-y-6">
                {candidatures.map((cand) => (
                    <div key={cand.id} className="rounded-md overflow-hidden shadow">
                        {/* Header coloré */}
                        <div className="p-3 font-semibold">
                            {cand.title} - {cand.contractType} - {cand.location}
                        </div>

                        {/* Contenu de la candidature */}
                        <div className="p-4">
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
                                    <Link to="/offers-of-employer">Relancer ma candidature</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bouton Retour en bas */}
            <div className="p-4">
                <BackButton/>
            </div>
        </div>
    )
}
