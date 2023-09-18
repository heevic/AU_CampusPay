export interface User {
    name: string;
    email: string;
    image?: string | null;
    role: string;
}

export interface Session {
    user: User;
}