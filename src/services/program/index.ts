import ProgramRepository from "../../repositories/program";
import { planExists, deadLineNotPassed } from "../plan";
import { UserService } from "../user";
import { BadRequestError } from "../utility/app-error";

const programRepository = ProgramRepository.getInstance();
const userService = new UserService()

type programCreationResponse = {
    status: "ok" | "fail";
    message: string;
    data?: any;
}

export const createProgram = (userId: string, planId: number, title: string, description?: string ) => {
    userService.findUserByIDandRole(userId, "Representative");

    const plan = planExists(planId);
    deadLineNotPassed(plan.deadLine);

    const createdProgram = programRepository.addProgram({
        planId, title, description
    });

    const response: programCreationResponse = createdProgram ? {
        status: "ok",
        message: "Program created successfully",
        data: createdProgram
    }: {
        status: "fail",
        message: "Failed to create program",
    }
    return response
}

export const editProgram = (userId: string, planId: number, programId: number, title: string, description?: string ) => {
    userService.findUserByIDandRole(userId, "Representative");

    const plan = planExists(planId);
    deadLineNotPassed(plan.deadLine);
    const selectedProgram = programRepository.getProgramById(programId)

    if (!selectedProgram){
        throw new BadRequestError("Program does not exist")
    }

    const editedProgram = programRepository.editProgram({
        planId,programId, title, description
    });

    const response: programCreationResponse = editedProgram ? {
        status: "ok",
        message: "Program edited successfully",
        data: editedProgram
    }: {
        status: "fail",
        message: "Failed to edit program",
    }
    return response
}