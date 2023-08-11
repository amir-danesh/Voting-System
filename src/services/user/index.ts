import UserRepository from "../../repositories/user";
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
              message: "username of password is incorrect",
          };

    return response;
};

export const isUserLoggedInAndAdmin = (userId: string) => {
    const foundUser = userRepository.getUserById(userId);
    if(!foundUser){
        throw new AuthenticationError("User is not Authenticated");
    }
    return foundUser
}
