import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@radix-ui/react-select";
import { Button } from "@/components/ui/button.tsx";
import * as React from "react";
import { Link } from "react-router-dom";
import { useCandidateContext } from "./candidate.context";

export default function ChoiceForSendingQuestionnerPage() {
    const { candidatures, setCandidatures } = useCandidateContext();

    const handleCheckboxChange = (id: number) => {
        setCandidatures((prev) =>
            prev.map((cand) =>
                cand.id === id ? { ...cand, cvChecked: !cand.cvChecked } : cand
            )
        );
    };

    const handleSelectChange = (
        id: number,
        field: "reponse" | "entretien" | "statut",
        value: string
    ) => {
        setCandidatures((prev) =>
            prev.map((cand) =>
                cand.id === id ? { ...cand, [field]: value } : cand
            )
        );
    };

    const handleSendQuestionnaire = (id: number) => {
        // Remplacez cette fonction par la logique d'envoi de questionnaire souhaitée.
        console.log("Envoyer le questionnaire pour la candidature", id);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-blue-600 text-white p-4">
                <h1 className="text-xl font-bold">Suivi de mes candidatures</h1>
            </div>

            <div className="p-4 space-y-6">
                {candidatures.map((cand) => (
                    <div key={cand.id} className="rounded-md overflow-hidden shadow">
                        <div className="bg-blue-600 text-white p-3 font-semibold">
                            {cand.title} - {cand.contractType} - {cand.location}
                        </div>

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
                                <Button onClick={() => handleSendQuestionnaire(cand.id)}>
                                    Envoyer le questionnaire
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4">
                <Button variant="secondary" className="w-full">
                    <Link to="/applications">Retour</Link>
                </Button>
            </div>
        </div>
    );
}
