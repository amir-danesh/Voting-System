import express from "express";
import { sendResponse } from "../utility/http-response";
import { HttpResponseType } from "../utility/http-response";
import { userLogin } from "../../services/user";
import { AuthenticationError } from "../../services/utility/app-error";
import { z } from "zod";

export const router = express.Router();

const loginParser = z.object({
    username: z.string().nonempty().min(1),
    password: z.string().nonempty().min(1),
});

router.post("/login", (req, res) => {
    try {
        const loginParams = loginParser.parse(req.body);

        const r = userLogin(loginParams.username, loginParams.password);
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
        return;
    } catch (error) {
        if (error instanceof z.ZodError) {
            sendResponse(res, { status: 400, response: { message: error.message } });
            return;
        }
        if (error instanceof AuthenticationError) {
            sendResponse(res, { status: error.statusCode, response: { message: error.message } });
            return;
        }
        sendResponse(res, {status: 500, response: { message: "Internal server error" }});
        return;
    }
});
