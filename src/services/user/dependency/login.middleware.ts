import { NextFunction, Request, Response } from "express";
import { UserService } from "../";
import { AuthenticationError } from "../../utility/app-error";

const userService = new UserService();

export const loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["authorization"];
    if (!userId) {
        throw new AuthenticationError("user is not authenticated");
    }

    const loggedInUserId = await userService.findUserById(userId);

    if(!loggedInUserId) {
        throw new AuthenticationError("user is not authenticated");
    }

    req.user = loggedInUserId;

    next();
};
