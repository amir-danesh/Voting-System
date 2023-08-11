import PlanRepository from "../../repositories/plan";
import UserRepository from "../../repositories/user";
import { AuthenticationError, DateValidationError, NotFoundError } from "../utility/app-error";
import { HttpResponseType } from "../../controllers/utility/http-response";
import { isUserLoggedInAndAdmin } from "../user";

const planRepository = PlanRepository.getInstance();
const userRepository = UserRepository.getInstance();

export const validatedDate = (date: Date) => {
    const currentDate = new Date();
    if (date.getTime() < currentDate.getTime()) {
        throw new DateValidationError("Date cannot be in the past");
    }
    return true;
};

export const addPlan = (userId: string, title: string, deadLine: Date, description?: string): HttpResponseType => {
    isUserLoggedInAndAdmin(userId);
    validatedDate(deadLine);

    const createPlan = planRepository.addPlan({ title, description, deadLine });
    return { status: 200, response: { message: "Plan added successfully", data: createPlan } };
};