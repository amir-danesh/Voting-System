import express from 'express';
import { z } from 'zod';
import { createProgram, editProgram } from '../../services/program';
import { HttpResponseType, sendResponse } from '../utility/http-response';
import { BadRequestError, NotFoundError } from '../../services/utility/app-error';

export const router = express.Router();

const craeteProgramParser = z.object({
    planId: z.number(),
    title: z.string().nonempty(),
    description: z.string().optional(),
})

const editProgramParser = z.object({
    planId: z.number(),
    programId: z.number(),
    title: z.string().nonempty(),
    description: z.string().optional(),
})

const userIdParser = z.string().nonempty().uuid();

router.post("/", async (req, res) => {
    try {
        const userId = userIdParser.parse(req.headers["Authorization"]);

        const { planId, title, description } = await craeteProgramParser.parseAsync(req.body);
        const r = await createProgram(userId, planId, title, description);

        const response: HttpResponseType = 
        {
            status: r.status === "ok"? 200 : 500,
            response: {
                message: "Program created successfully",
                data: r.data
            }
        }
    } catch (error) {
        if(error instanceof z.ZodError){
            sendResponse(res, { status: 400, response: { message: error.message }});
            return;
        }
        if(error instanceof NotFoundError){
            sendResponse(res, {status: 404, response: {message: error.message}});
            return;
        }
        if(error instanceof BadRequestError) {
            sendResponse(res, {status: 400, response: {message: error.message}});
            return;
        }
        sendResponse(res, {status: 500, response: { message: "Internal server error" }});
        return;
    }
})

router.post("/edit", async (req, res) => {
    try {
        const userId = userIdParser.parse(req.headers["Authorization"]);

        const { planId, programId, title, description } = editProgramParser.parse(req.body);
        const r = editProgram(userId, planId, programId, title, description);

        const response: HttpResponseType = 
        {
            status: r.status === "ok"? 200 : 500,
            response: {
                message: "Program created successfully",
                data: r.data
            }
        }
    } catch (error) {
        if(error instanceof z.ZodError){
            sendResponse(res, { status: 400, response: { message: error.message }});
            return;
        }
        if(error instanceof NotFoundError){
            sendResponse(res, {status: 404, response: {message: error.message}});
            return;
        }
        if(error instanceof BadRequestError) {
            sendResponse(res, {status: 400, response: {message: error.message}});
            return;
        }
        sendResponse(res, {status: 500, response: { message: "Internal server error" }});
        return;
    }
})