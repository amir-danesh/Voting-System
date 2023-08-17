import express, {Request, Response} from "express";
import { sendResponse } from "../utility/http-response";
import { HttpResponseType } from "../utility/http-response";
import { UserService } from "../../services/user";
import { AuthenticationError } from "../../services/utility/app-error";
import { z } from "zod";

const loginParser = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
});

export class UserController {
    private userRepo: UserService;
    router: express.Router;
    constructor() {
        this.userRepo = new UserService();
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.handleLoginRequest.bind(this));
        // Add more routes here as needed
    }

    private async handleLoginRequest(req: Request, res: Response) {
        try {
            const loginParams = loginParser.parse(req.body);

            const r = await this.userRepo.userLogin(loginParams.username, loginParams.password);
            const response: HttpResponseType =
                r.status === "ok"
                    ? {
                          status: 200,
                          response: {
                              message: r.message,
                              data: r.data,
                          },
                      }
                    : {
                          status: 401,
                          response: {
                              message: r.message,
                          },
                      };

            sendResponse(res, response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                sendResponse(res, { status: 400, response: { message: error.message } });
            } else if (error instanceof AuthenticationError) {
                sendResponse(res, { status: error.statusCode, response: { message: error.message } });
            } else {
                sendResponse(res, { status: 500, response: { message: "Internal server error" } });
            }
        }
    }
}
