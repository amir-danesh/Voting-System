import { Plan } from "../../models/plan";

const today = new Date();
const tomorrow = new Date(today);
const yesterday = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
yesterday.setDate(tomorrow.getDate() - 1);

interface AddPlan {
    title: string;
    description?: string;
    deadLine: Date;
}

class PlanRepository {
    private constructor() {}
    private static planRepoInstance: PlanRepository | undefined = undefined;
    private plans: Plan[] = [
        {
            id: 1,
            title: "Canada Tower",
            description: "Basic plan",
            deadLine: today,
        },
        {
            id: 2,
            title: "Global Warming",
            deadLine: tomorrow,
        },
        {
            id: 3,
            title: "World Revolution",
            description: "Should happen soon",
            deadLine: yesterday,
        },
    ];
    private idCounter: number = this.plans.length + 1;

    public static getInstance(): PlanRepository {
        if (!this.planRepoInstance) {
            this.planRepoInstance = new PlanRepository();
        }
        return this.planRepoInstance;
    }

    addPlan(plan: AddPlan): Plan {
        this.idCounter += 1;
        const newPlan: Plan = { ...plan, id: this.idCounter };
        this.plans.push(newPlan);
        return newPlan;
    }

    getPlanById(id: number): Plan | undefined {
        return this.plans.find((plan) => plan.id === id);
    }
}

export default PlanRepository;
