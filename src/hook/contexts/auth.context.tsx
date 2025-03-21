import { IUserProfile } from "@/interface/UserInterface";
import { createContext, useState, ReactNode } from "react";


interface AuthContextType {
    isAuthenticated: boolean;
    userProfile: IUserProfile | null;
    updateAuthentication: (status: boolean, profile?: IUserProfile | null) => void;
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

    function updateAuthentication(status: boolean, profile: IUserProfile | null = null) {
        setIsAuthenticated(status);
        setUserProfile(profile);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userProfile, updateAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
}
