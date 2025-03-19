// candidates.context.tsx
import React, { createContext, useContext, useState } from "react";

interface Candidature {
    id: number;
    title: string;
    contractType: string;
    location: string;
    cvChecked: boolean;
    reponse: string;
    entretien: string;
    statut: string;
    relanceCount: number;
}

interface CandidateContextProps {
    candidatures: Candidature[];
    setCandidatures: React.Dispatch<React.SetStateAction<Candidature[]>>;
}

const CandidateContext = createContext<CandidateContextProps | undefined>(undefined);

export function useCandidateContext() {
    const context = useContext(CandidateContext);
    if (!context) {
        throw new Error("useCandidateContext must be used within a CandidateProvider");
    }
    return context;
}

export function CandidateProvider({ children }: { children: React.ReactNode }) {
    const [candidatures, setCandidatures] = useState<Candidature[]>([
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
            title: "Développeur Fullstack",
            contractType: "CDI",
            location: "Paris",
            cvChecked: false,
            reponse: "non-recu",
            entretien: "non",
            statut: "refusée",
            relanceCount: 0,
        },
    ]);

    return (
        <CandidateContext.Provider value={{ candidatures, setCandidatures }}>
            {children}
        </CandidateContext.Provider>
    );
}
