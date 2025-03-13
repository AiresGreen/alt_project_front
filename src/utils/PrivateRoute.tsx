import { AuthContext } from "@/hook/contexts/auth.context";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}