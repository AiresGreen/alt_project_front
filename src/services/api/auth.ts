import { useApi } from "@/hook/useApi";


const api = useApi();


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


export const signup = async (payload: { email: string; firstname: string; lastname: string; password: string }) => {
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
