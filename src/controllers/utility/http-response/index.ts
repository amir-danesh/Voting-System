import { Response } from "express";

export type HttpResponse = {
    status: number;
    response: {
        message: string;
        data?: any
    };
}

export const sendResponse = (res: Response, value: HttpResponse) => {
    res.status(value.status).send(value.response);
};