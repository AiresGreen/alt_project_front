import { useApi } from "@/hook/useApi";
import axios from "axios";


const api = useApi();


export const signin = async (payload: { email: string; password: string }) => {

  try {
    // Envoi d'une requête POST vers /auth/signin avec les identifiants
    const { data } = await api.post("/auth/signin", payload);


    console.log("🚀 ~  ~ signin: ", data);
    return data;
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

    return data;
  } catch (error: any) {
    throw error.response?.data?.message || "Erreur lors de l'inscription";
  }
};


export async function refreshTokens() {

  const token = localStorage.getItem('refresh-token');
  const headers = {
    'Authorization': 'Bearer ' + token,
  }

  try {
    const {data} = await axios.post(
        import.meta.env.VITE_API_LOCAL_URL + 'auth/refresh',
        {},
        { headers }
    );
    console.log(":rocket: ~ file: auth.tsx:55 ~ refreshToken ~ refreshToken:", data)
    return data;
  } catch (error) {
    throw new Error("Echec du refreshToken " + error);
  }
}


export async function destroyTokenUser() {
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('user');
}
