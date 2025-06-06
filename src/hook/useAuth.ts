// src/hook/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "@/hook/contexts/auth.context";


export function useAuth() {
    const { userProfile, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated || !userProfile) {
        return { userId: undefined, userProfile: null, isAuthenticated: false };
    }

    return {
        userId: userProfile.id.toString(),
        userProfile,           // on renvoie l’objet complet
        isAuthenticated: true,
    };
}
