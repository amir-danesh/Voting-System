import express, { Request, Response } from "express";
import { isNonEmptyString } from "../../services/utility/non-empty-string";
import { sendResponse } from "../utility/http-response";
import { userLogin } from "../../services/user";

export const router = express.Router();

router.post('/login', (req,res) => {
    const { username, password } = req.body;
    const usernameValidation = isNonEmptyString(username, "username");
    const passwordValidation = isNonEmptyString(password, "password");

    if (!usernameValidation.state || !passwordValidation.state) {
        sendResponse(res, { status: 401, response: {message: "Invalid username or password"} });
        return;
    }

    const response = userLogin(username, password);

    sendResponse(res, response);
    return;
});
