import { v4 } from "uuid";
import { User } from "../../models/user";

class UserRepository {
    private constructor() {}
    private static userRepoInstance: UserRepository | undefined = undefined;
    private users: User[] = [
        {
            id: v4(),
            username: "admin",
            password: "admin",
            role: "Admin",
        },
        {
            id: v4(),
            username: "rep",
            password: "rep",
            role: "Representative",
        },
        {
            id: v4(),
            username: "norm",
            password: "norm",
            role: "Normal",
        },
    ];

    public static getInstance(): UserRepository {
        if (!this.userRepoInstance) {
            this.userRepoInstance = new UserRepository();
        }
        return this.userRepoInstance;
    }

    getUserByUsernameAndPassword(username: string, password: string): User | undefined {
        return this.users.find((user) => user.username === username && user.password === password);
    }
}

export default UserRepository;
