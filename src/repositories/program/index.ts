import { Program } from "../../models/program";
import { NotFoundError } from "../../services/utility/app-error";

interface AddProgram {
    planId: number,
    title: string,
    description?: string
}

interface editProgram {
    planId: number,
    programId: number,
    title: string,
    description?: string,
}

class ProgramRepository {
    private constructor() {}
    private static ProgramRepoInstance: ProgramRepository | undefined = undefined;
    private programs: Program[] = [
        {
            id: 1,
            planId: 1,
            title: "do this",
            description: "like this",
        },
        {
            id: 2,
            planId: 1,
            title: "do that",
            description: "like that",
        },
        {
            id: 3,
            planId: 2,
            title: "let's attack",
            description: "with 1000 men",
        },
    ];
    private idCounter: number = this.programs.length + 1;

    public static getInstance(): ProgramRepository {
        if (!this.ProgramRepoInstance) {
            this.ProgramRepoInstance = new ProgramRepository();
        }
        return this.ProgramRepoInstance;
    }

    addProgram(program: AddProgram): Program {
        this.idCounter += 1;
        const newProgram: Program = { ...program, id: this.idCounter };
        this.programs.push(newProgram);
        return newProgram;
    }

    editProgram(program: editProgram): Program {
        const index = this.getIndexProgramById(program.programId);
        if (index !== -1) {
            const updatedProgram = { ...this.programs[index], ...program };
            this.programs[index] = updatedProgram;
            return updatedProgram;
        }
        throw new NotFoundError(`Program with ID ${program.programId} not found`);
    }
    

    getProgramById = (programId: number): Program | undefined => {
        return this.programs.find((program) => program.id === programId)
    }

    getIndexProgramById = (programId: number): number => {
        return this.programs.findIndex((program) => program.id === programId)
    }
}

export default ProgramRepository;
