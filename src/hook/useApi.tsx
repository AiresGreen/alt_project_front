import axios, { AxiosInstance } from "axios";
import {destroyTokenUser, refreshTokens} from "@/services/api/auth.ts";

export function useApi() {

    const headers = {
        "Content-Type": "application/json",
        "Access-control-Allow-Origin": "*",

    };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_LOCAL_URL,
        headers
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            console.log("🚀 ~ file: useApi.ts:17 ~ api.interceptors.config.use ~ token:", token)
        }
        return config;
    }, error => {
        Promise.reject(error)
    })

    // interceptor response API
    api.interceptors.response.use((response) => {
        console.log("🚀 ~ useApi ~ response: usaApi donne response");
        return response
    }, async (error) => {
        console.log("🚀 ~ useApi ~ error: useApi donne error");
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                // pour éviter boucle infinie du refresh-token
                originalRequest._retry = true;
            }

            const refreshToken = localStorage.getItem('refresh-token')
            console.log("🚀 ~ useApi ~ refreshToken fonctionne dans useApi ")

            if (refreshToken) {
                console.log("🚀 ~ useApi ~ error: ", error);
                try {
                    const result = await refreshTokens();
                    localStorage.setItem('access-token', result?.accessToken);
                    localStorage.setItem('refresh-token', result?.refreshToken);
                    originalRequest.headers['Authorization'] = 'Bearer ' + result?.accessToken;
                    return axios(originalRequest);
                } catch (error) {
                    // supprimer le token et le refresh
                    await destroyTokenUser();
                    window.location.href = "/login";
                }
            } else {
                // supprimer le token et le refresh
                await destroyTokenUser();
                window.location.href = "/login";
                console.log("refreshtoken est mort");
            }
        }
        if (error.response && error.response.status === 500) {
            await destroyTokenUser();
            window.location.href = "/login";
        }
        return Promise.reject(error)
        console.log("log de la dernière ligne response de useApi")
    })
    return api
}

