import UserRepository from "../../repositories/user";
import { HttpResponseType } from "../../controllers/utility/http-response";
import { AuthenticationError } from "../utility/app-error";

const userReposity = UserRepository.getInstance();

type LoginResponse = {
    status: "ok" | "fail";
    message: string;
    data?: any;
};

export const userLogin = (username: string, password: string) => {
    const user = userReposity.getUserByUsernameAndPassword(username, password);

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
