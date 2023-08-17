import UserRepository from "../../repositories/user";
import { UserRole } from "../../models/user";
import { AuthenticationError } from "../utility/app-error";


type LoginResponse = {
    status: "ok" | "fail";
    message: string;
    data?: any;
};

export class UserService {
    private userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository()
    }
    
    async userLogin (username: string, password: string) {
        const user = await this.userRepo.getUserByUsernameAndPassword(username, password);
    
        const response: LoginResponse = user
            ? {
                  status: "ok",
                  message: "login successful",
                  data: user,
              }
            : {
                  status: "fail",
                  message: "username or password is incorrect",
              };
    
        return response;
    };
    

    async findUserByIDandRole (userId: string, role: UserRole) {
        const foundUser = await this.userRepo.getUserById(userId);
        if(!foundUser){
            throw new AuthenticationError("User is not Authenticated");
        }
        if(foundUser.role!== role){
            throw new AuthenticationError(`User is not ${role}`);
        }
        return foundUser
    }
}