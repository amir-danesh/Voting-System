import express from "express";
import { isNonEmptyString } from "../../services/utility/non-empty-string";
import { addPlan } from "../../services/plan";
import { HttpResponseType, sendResponse } from "../utility/http-response";

const moment = require("moment");

export const router = express.Router();

router.post("/", async (req, res) => {
    const { title, description, deadLine } = req.body;

    if (!isNonEmptyString(title, "title").state) {
        sendResponse(res, {
            status: 400,
            response: {
                message: "title is required",
            },
        });
        return;
    }

    if (description && typeof description !== "string") {
        sendResponse(res, {
            status: 400,
            response: {
                message: "discription must be a string or an empty string or not provided",
            },
        });
        return
    }

    if (!moment(deadLine).isValid()) {
        sendResponse(res, {
            status: 400,
            response: {
                message: "deadLine is not valid date",
            },
        });
        return
    }

    const response: HttpResponseType = addPlan(title, description, new Date(deadLine));

    console.log(response);

    sendResponse(res, response);
});
