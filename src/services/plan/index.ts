import PlanRepository from "../../repositories/plan";
import { DateValidationError } from "../utility/app-error";
import { HttpResponseType } from "../../controllers/utility/http-response";

const planRepository = PlanRepository.getInstance();

export const validatedDate = (date: Date) => {
    const currentDate = new Date();
    if (date.getTime() < currentDate.getTime()) {
        throw new DateValidationError("Date cannot be in the past");
    }
    return true;
};

export const addPlan = (title: string, deadLine: Date, description?: string): HttpResponseType => {
    validatedDate(deadLine);

    const createPlan = planRepository.addPlan({ title, description, deadLine });
    return { status: 200, response: { message: "Plan added successfully", data: createPlan } };
};
