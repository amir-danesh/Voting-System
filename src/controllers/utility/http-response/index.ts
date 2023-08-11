import { Response } from "express";

export type HttpResponseType = {
    status: number;
    response: {
        message: string;
        data?: any
    };
}

export const sendResponse = (res: Response, value: HttpResponseType) => {
    res.status(value.status).send(value.response);
};