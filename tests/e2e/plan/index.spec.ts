import request from "supertest";
import { app } from "../../../src";

describe("Plan", () => {
    describe("Create", () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        it("should create a plan", async () => {
            await request(app)
                .post("/plan")
                .send({ title: "test plan", description: "test description", deadLine: tomorrow })
                .expect(200);
        });

        it("should not create a plan without a title", async () => {
            await request(app)
                .post("/plan")
                .send({ description: "test description", deadLine: tomorrow })
                .expect(400);
        });

        it("should not create a plan when description is not string", async () => {
            await request(app)
                .post("/plan")
                .send({ title: "test plan", description: 12345, deadLine: tomorrow })
                .expect(400);
        });

        it("should not create a plan when deadLine is not valid", async () => {
            await request(app)
                .post("/plan")
                .send({ title: "test plan", description: "test description", deadLine: "invalid date" })
                .expect(400);
        });
    });
});
