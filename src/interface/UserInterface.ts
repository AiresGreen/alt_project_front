export interface userProfile {
    avatarUrl?: string;
    initials?: string;
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    emailVerified: boolean;
    [key: string]: any;

}