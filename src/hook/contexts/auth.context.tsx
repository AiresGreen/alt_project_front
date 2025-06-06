import { userProfile } from "@/interface/UserInterface.ts";
import { createContext, useState, ReactNode } from "react";



interface AuthContextType {
    isAuthenticated: boolean;
    userProfile: userProfile | null;
    updateAuthentication: (status: boolean, profile?: userProfile | null) => void;
}

interface AuthProviderType {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userProfile: null,
    updateAuthentication: () => {},
});

export function AuthProvider({ children }: AuthProviderType) {
    // 1) Savoir si on a déjà un token stocké au moment du premier rendu
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        localStorage.getItem("access-token") ? true : false
    );
    // 2) Tenter de recharger le profil utilisateur depuis localStorage si présent
    const [userProfile, setUserProfile] = useState<userProfile | null>(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });
    function updateAuthentication(status: boolean, profile: userProfile | null = null) {
        setIsAuthenticated(status);
        setUserProfile(profile);

        if (status && profile) {
            // on stocke aussi en localStorage pour recharger ensuite
            localStorage.setItem("user", JSON.stringify(profile));
        } else {
            localStorage.removeItem("user");
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userProfile, updateAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
}
