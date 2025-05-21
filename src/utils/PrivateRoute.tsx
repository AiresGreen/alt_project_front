import { AuthContext } from "@/hook/contexts/auth.context";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const { isAuthenticated, userProfile } = useContext(AuthContext);

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (userProfile && !userProfile.emailVerified) {
        return <Navigate to="/verification-en-attente" />;
    }

    return <Outlet />;
}
