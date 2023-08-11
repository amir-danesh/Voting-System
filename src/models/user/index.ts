export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}

const roles = ["Admin","Representative","Normal"] as const;
export type UserRole = typeof roles[number];