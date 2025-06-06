import { createContext, useState, ReactNode } from 'react';
import type { userProfile } from '@/interface/UserInterface';

interface AuthContextType {
    isAuthenticated: boolean;
    userProfile: userProfile | null;
    updateAuthentication: (status: boolean, profile?: userProfile | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userProfile: null,
    updateAuthentication: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    // 1) Initialiser isAuthenticated selon la présence d’un token
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!localStorage.getItem('access-token')
    );

    // 2) Initialiser userProfile depuis localStorage (s’il y a un objet “user” enregistré)
    const [userProfile, setUserProfile] = useState<userProfile | null>(() => {
        const stored = localStorage.getItem('user');
        return stored ? (JSON.parse(stored) as userProfile) : null;
    });

    function updateAuthentication(
        status: boolean,
        profile: userProfile | null = null
    ) {
        setIsAuthenticated(status);
        setUserProfile(profile);

        if (status && profile) {
            localStorage.setItem('user', JSON.stringify(profile));
        } else {
            // Déconnexion : on efface tout
            localStorage.removeItem('user');
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
        }
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, userProfile, updateAuthentication }}
        >
            {children}
        </AuthContext.Provider>
    );
}
