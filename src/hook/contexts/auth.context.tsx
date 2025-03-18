import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    updateAuthentication: (status: boolean) => void;
}

interface AuthProviderType {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    updateAuthentication: () => {}
});

export function AuthProvider({ children }: AuthProviderType) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    function updateAuthentication(status: boolean) {
        setIsAuthenticated(status);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, updateAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
}