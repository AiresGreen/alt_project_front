import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useCandidateContext } from "@/hook/contexts/candidates.context.tsx";


export default function ChoiceForSendingQuestionnerPage() {
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
    console.log(candidatures)
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-blue-600 text-white p-4">
                <h1 className="text-xl font-bold">Suivi de mes candidatures</h1>
            </div>

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

                            {/* Bouton "Envoyer le questionnaire" */}
                            <div className="mt-4 flex justify-center">
                                <Button>
                                    <Link to={"/questionner"}>
                                    Envoyer le questionnaire
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4">
                <Button variant="outline" className="w-full">
                    <Link to="/applications">Retour</Link>
                </Button>
            </div>
        </div>
    );
}
