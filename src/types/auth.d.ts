export interface User {
    name?: string;
    email?: string;
    image?: string | null | undefined;
    role? : string;
}

export interface Session {
    user?: User;
}