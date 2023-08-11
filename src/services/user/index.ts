import UserRepository from "../../repositories/user";
import { UserRole } from "../../models/user";
import { AuthenticationError } from "../utility/app-error";

const userRepository = UserRepository.getInstance();

type LoginResponse = {
    status: "ok" | "fail";
    message: string;
    data?: any;
};

export const userLogin = (username: string, password: string) => {
    const user = userRepository.getUserByUsernameAndPassword(username, password);

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

export const findUserByIDandRole = (userId: string, role: UserRole) => {
    const foundUser = userRepository.getUserById(userId);
    if(!foundUser){
        throw new AuthenticationError("User is not Authenticated");
    }
    if(foundUser.role!== role){
        throw new AuthenticationError(`User is not ${role}`);
    }
    return foundUser
}