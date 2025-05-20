

import { useApi } from "@/hook/useApi";


const api = useApi();


export const getOffers = async () => {
    try {
        //===Récupérer toutes les offres de bdd
        const { data } = await api.get("/offer");
        return data;
    } catch (error:any) {
        throw error.response?.data?.message || "Erreur de récupération des offres"
    }
}

export const getOfferById = async (id: string) => {
    try {
        //===Récupération d'offre par id
        const { data } = await api.get(`/offer/${id}`);
        return data;
    } catch (error:any) {
        throw error.response?.data?.message || "Offre non trouvé";
    }
}

