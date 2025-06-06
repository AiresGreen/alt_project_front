export interface LanguageInterface {
    id: string;
    langEnglishName: string;
    level: string;
}


export interface UserLanguage {
    language_id: number;
    level: string;
    language: {
        id: number;
        langEnglishName: string;
    };
}
