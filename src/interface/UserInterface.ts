export interface IUserProfile {
    avatarUrl?: string;
    initials?: string;
    [key: string]: any;
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    emailVerified: boolean;
}