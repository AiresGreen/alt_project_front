

import { useApi } from "@/hook/useApi";

const api= useApi();

export const getCurrentUser = async () => {
    try {
        //==Récupérer firstname,lastname,email from back
        const {data} = await api.get(`/auth/profile`);
        return data;
    } catch (error:any) {
        throw error("not found current user");
    }
}

export const getCurrentProfile = async (phone_number:string) => {
    try {
        //== Récupérer picture, street, zip_code, city, phone_number from back.
        const {data} = await api.get(`/profile/${phone_number}`);
        return data;
    } catch (error:any) {
        throw error("not found current profile");
    }

}

export const getCurrentUsefulInfo = async (user_id:number) => {
    try{
        //===Récupération d'information utile from back
        const {data} = await api.get(`/useful-info/${user_id}`);
        return data;
    } catch (error:any) {
        throw error("not found current useful info");
    }

}

export const getCurrentExperience = async (id:number) => {
    try {
        const {data} = await api.get(`/experience/${id}`);
        return data;
    } catch (error:any) {
        throw error("not found current experience");
    }
}

export const getCurrentEducation = async (id:number) => {
    try {
        const {data} = await api.get(`/education/${id}`);
        return data;
    } catch (error:any) {
        throw error("not found current education");
    }
}

export const getCurrentProjects = async (id:number) => {
    try {
        const {data} = await api.get(`/projects/${id}`);
        return data;
    } catch (error:any) {
        throw error("not found current projects");
    }
}

export const getCurrentHobbies=async (id:number) => {
    try {
        const {data} = await api.get(`/hobbies/${id}`);
        return data;
    } catch (error:any) {
        throw error("not found current hobby");
    }
}

export const getCurrentSkills = async (id:number) => {
    try {
        const {data} = await api.get(`/skills/${id}`);
        return data;
    } catch (error:any) {
        throw error("not found current skills");
    }
}

export const getLangues = async () => {
    try {
        const {data} = await api.get(`/languages`);
        return data;
    } catch (error:any) {
        throw error("not found current langues");
    }
}
