export interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    role? : string;
}

export interface Session {
    user?: User;
}