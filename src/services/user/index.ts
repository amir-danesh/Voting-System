import UserRepository from "../../repositories/user";
import { HttpResponseType } from "../../controllers/utility/http-response";
import { AuthenticationError } from "../utility/app-error";

const userReposity = UserRepository.getInstance();

export const userLogin = (username: string, password: string) => {
    try {
        const user = userReposity.getUserByUsernameAndPassword(username, password);
        if (!user) {
            throw new AuthenticationError("Invalid username or password");
        }
        const response: HttpResponseType = {
            status: 200,
            response: {
                message: "Login successful",
                data: user
            }
        }
        return response
    } catch (error) {
        if (error instanceof AuthenticationError) {            
            return { status: error.statusCode, response: { message: error.message } };
        }
        return { status: 500, response: { message: "Internal server error" }}
    }
};
