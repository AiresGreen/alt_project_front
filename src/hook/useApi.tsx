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
        const token = localStorage.getItem('accessToken');
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
        return response
    }, async (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                // pour éviter boucle infinie du refreshToken
                originalRequest._retry = true;
            }

            const refreshToken = localStorage.getItem('refreshToken')

            if (refreshToken) {
                try {
                    const result = await refreshTokens();
                    localStorage.setItem('accessToken', result?.data.datas.accessToken);
                    localStorage.setItem('refreshToken', result?.data.datas.refreshToken);
                    originalRequest.headers['Authorization'] = 'Bearer ' + result?.data.datas.accessToken;
                    return axios(originalRequest);
                } catch (error) {
                    // supprimer le token et le refresh
                    destroyTokenUser();
                    window.location.href = "/";
                }
            } else {
                // supprimer le token et le refresh
                destroyTokenUser();
                window.location.href = "/";
            }
        }
        if (error.response && error.response.status === 500) {
            destroyTokenUser();
            window.location.href = "/";
        }
        return Promise.reject(error)
    })
    return api
}

