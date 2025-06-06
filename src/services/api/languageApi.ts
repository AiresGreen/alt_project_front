import {useApi} from "@/hook/useApi.tsx";


const api = useApi()
export const getLangues = async () => {
    const { data } = await api.get('/languages/all');
    return data;
};

export const getLevels = async () => {
    const { data } = await api.get('/languages/levels');
    return data;
};

export const getLanguageOfUser = async (user_id: any) => {
    const { data } = await api.get(`/languages/${user_id}`);
    return data;
};

export const addLangue = async (payload: {
    langEnglishName: string;
    level: string;
}) => {
    const { data } = await api.post('/languages', payload);
    return data;
};

export const deleteLangue = async (language_id: string) => {
    await api.delete(`/languages/${language_id}`);
};

export const updateLangue = async (
    id: string,
    payload: { langEnglishName: string; level: string },
) => {
    await api.put(`/languages/${id}`, payload);
};


