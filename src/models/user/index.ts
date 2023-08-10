export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}

export type UserRole = "Admin" | "Representative" | "Normal";
