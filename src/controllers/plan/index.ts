import express from "express";
import { addPlan } from "../../services/plan";
import { HttpResponseType, sendResponse } from "../utility/http-response";
import { DateValidationError, NotFoundError } from "../../services/utility/app-error";
import { z } from "zod";

export const router = express.Router();

const DateValidation = (date: string) => {
    if (!isNaN(Date.parse(date)) && Date.parse(date) > Date.now()) {
        return true;
    }
    return false;
};

const planParser = z.object({
    title: z.string().nonempty().min(1),
    description: z.string().optional(),
    deadLine: z.string().refine(DateValidation, {
        message: "deadline is invalid or cannot be in the past",
    }),
});

const userIdParser = z.string().nonempty().uuid()

router.post("/", async (req, res) => {
    try {
        const userId = userIdParser.parse(req.headers["Authorization"]);
        const planParams = planParser.parse(req.body);
        const response: HttpResponseType = addPlan(
            userId,
            planParams.title,
            new Date(planParams.deadLine),
            planParams.description
        );

        sendResponse(res, response);
        return;
    } catch (error) {
        if (error instanceof z.ZodError) {
            sendResponse(res, { status: 400, response: { message: error.message } });
            return;
        }
        if (error instanceof DateValidationError) {
            sendResponse(res, { status: 400, response: { message: error.message } });
            return;
        }
        if (error instanceof NotFoundError){

        }
        sendResponse(res, {
            status: 500,
            response: { message: "An internal server error occurred" },
        });
        return;
    }
});
