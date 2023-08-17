import { v4 } from "uuid";
import { User } from "../../models/user";
import { Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import { AppDataSource } from "../../../data-source";

class UserRepository {
    private userRepo: Repository<UserEntity>;
    constructor() {
        this.userRepo = AppDataSource.getRepository(UserEntity);
    }

    getUserByUsernameAndPassword(username: string, password: string): Promise<User | null> {
        return this.userRepo.findOneBy({ username, password });
    }

    getUserById(id: string): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
    }
}

export default UserRepository;
