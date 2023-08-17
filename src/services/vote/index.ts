import ProgramRepository from "../../repositories/program";
import PlanRepository from "../../repositories/plan";
import VoteRepository from "../../repositories/vote";
import { BadRequestError } from "../utility/app-error";
import { deadLineNotPassed } from "../plan";
import { UserService } from "../user";

const planRepository = PlanRepository.getInstance();
const programRepository = ProgramRepository.getInstance();
const voteRepository = VoteRepository.getInstance();

const userService = new UserService();

export const voteProgram = (userId: string, programId: number) => {
    userService.findUserByIDandRole(userId, "Normal");

    const selectedProgram = programRepository.getProgramById(programId)
    if (!selectedProgram){
        throw new BadRequestError("Program does not exist")
    }

    const selectedPlan = planRepository.getPlanById(selectedProgram.planId);
    if(!selectedPlan){
        throw new BadRequestError("Plan does not exist")
    }
    
    deadLineNotPassed(selectedPlan?.deadLine)

    

}

const checkIfUserAlreadyVoted = (userId: string, planId: number): void => {
    if(voteRepository.ifVoteExists(userId, planId)){
        throw new BadRequestError("User have already voted")
    }
}