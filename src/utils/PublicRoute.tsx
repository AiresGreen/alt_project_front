import { AuthContext } from "@/hook/contexts/auth.context.tsx";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
