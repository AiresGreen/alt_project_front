import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

// Reprend la structure de votre interface Candidature
export interface Candidature {
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

// Définit ce que le contexte va exposer
interface CandidateContextProps {
    candidatures: Candidature[];
    setCandidatures: Dispatch<SetStateAction<Candidature[]>>;
}

// Crée le contexte avec une valeur par défaut (placeholder)
const CandidateContext = createContext<CandidateContextProps | undefined>(undefined);

// Hook personnalisé pour consommer facilement le contexte
export function useCandidateContext() {
    const context = useContext(CandidateContext);
    if (!context) {
        throw new Error("useCandidateContext must be used within a CandidateProvider");
    }
    return context;
}

// Interface pour le provider (enfants React)
interface CandidateProviderProps {
    children: ReactNode;
    // Optionnel : vous pouvez prévoir une prop initiale si besoin
    initialCandidatures?: Candidature[];
}

// Le provider qui englobe votre application (ou une partie)
export function CandidateProvider({ children, initialCandidatures }: CandidateProviderProps) {
    // État local stockant la liste de candidatures
    const [candidatures, setCandidatures] = useState<Candidature[]>(
        initialCandidatures || []
    );

    const value: CandidateContextProps = {
        candidatures,
        setCandidatures,
    };

    return <CandidateContext.Provider value={value}>{children}</CandidateContext.Provider>;
}
