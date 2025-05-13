import axios, { AxiosInstance } from "axios";

export function useApi() {

    const headers = {
        "Content-Type": "application/json",
        "Access-control-Allow-Origin": "*",

    };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_LOCAL_URL,
        headers
    });

// Utilisation de request interceptor pour mettre en place l'injection de l'access token dans chaque requete qui utilise le useApi
    api.interceptors.request.use((config) => {
        // A chaque requete sortante Aller dans le cache pour recuperer le token
        const token = localStorage.getItem("access-token");
        //  et l'injecter dans la requete
        token ? (config.headers["Authorization"] = "Bearer " + token) : "";
        return config
    });

    api.interceptors.response.use(
        (response: any) => response,
        // logique de test du status de la respnse pour declencher la procedure de recuperation du nouvel acces token
    );





    return api;
}