import { Vote } from "../../models/vote";

class VoteRepository {
    private constructor() {}
    private static VoteRepoInstance: VoteRepository | undefined = undefined;
    private votes: Vote[] = [
        {
            userId: "1",
            programId: 1,
            planId: 1,
        },
        {
            userId: "2",
            programId: 2,
            planId: 1,

        },
        {
            userId: "3",
            programId: 3,
            planId: 1,

        },
    ];

    public static getInstance(): VoteRepository {
        if (!this.VoteRepoInstance) {
            this.VoteRepoInstance = new VoteRepository();
        }
        return this.VoteRepoInstance;
    }

    ifVoteExists(userId: string, planId: number): boolean {
        return this.votes.find((vote) => vote.userId === userId && vote.planId === planId)!== undefined
    }

    addVote(userId: string, programId: number, planId: number): Vote {
        const newVote: Vote = {
            userId: userId,
            programId: programId,
            planId: planId,
        }

        this.votes.push(newVote);
        return newVote;
    }
}

export default VoteRepository;
