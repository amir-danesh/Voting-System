import PlanRepository from "../../repositories/plan";
import { BadRequestError, DateValidationError, NotFoundError } from "../utility/app-error";
import { HttpResponseType } from "../../controllers/utility/http-response";
import { findUserByIDandRole } from "../user";

const planRepository = PlanRepository.getInstance();

export const validatedDate = (date: Date) => {
    const currentDate = new Date();
    if (date.getTime() < currentDate.getTime()) {
        throw new DateValidationError("Date cannot be in the past");
    }
    return true;
};

export const addPlan = (userId: string, title: string, deadLine: Date, description?: string): HttpResponseType => {
    findUserByIDandRole(userId, "Admin");
    validatedDate(deadLine);

    const createPlan = planRepository.addPlan({ title, description, deadLine });
    return { status: 200, response: { message: "Plan added successfully", data: createPlan } };
};

export const planExists = (planId: number) => {
    const plan = planRepository.getPlanById(planId);
    if (!plan) {
        throw new NotFoundError("Plan not found");
    }
    return plan;
}

export const deadLineNotPassed = (deadLine: Date) => {
    if (deadLine.getTime() < new Date().getTime()) {
        throw new BadRequestError("Plan deadline is reached");
    }
    return true
}