import { useApi } from "@/hook/useApi";
import axios from "axios";


const api = useApi();


export async function refreshTokens() {

  const token = localStorage.getItem('refreshToken');
  const headers = {
    'Authorization': 'Bearer ' + token,
  }

  try {
    const refreshResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL + 'auth/refresh-token',
        { headers }
    );
    console.log(":rocket: ~ file: auth.tsx:55 ~ refreshToken ~ refreshToken:", refreshResponse)
    return refreshResponse;
  } catch (error) {
    throw new Error("Echec du refreshToken " + error);
  }
}


export async function destroyTokenUser() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}


export const signin = async (payload: { email: string; password: string }) => {
  try {
    // Envoi d'une requête POST vers /auth/signin avec les identifiants
    const { data } = await api.post("/auth/signin", payload);

    // Si le backend renvoie des tokens, on les stocke dans le localStorage
    if (data.access_token && data.refresh_token) {
      localStorage.setItem("access-token", data.access_token);
    }


    return data.user;
  } catch (error: any) {
    throw error.response?.data?.message || "Erreur lors de la connexion";
  }
};


export const signup = async (payload:
                             { email: string; firstname: string; lastname: string; password: string }) => {
  try {
    // Envoi d'une requête POST vers /auth/signup avec les infos de l'utilisateur
    const { data } = await api.post("/auth/signup", payload);

    // Stockage immédiat des tokens reçus après inscription
    if (data.access_token && data.refresh_token) {
      localStorage.setItem("access-token", data.access_token);
    }

    return data.user;
  } catch (error: any) {
    throw error.response?.data?.message || "Erreur lors de l'inscription";
  }
};
