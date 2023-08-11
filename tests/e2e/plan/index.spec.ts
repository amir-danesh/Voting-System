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
                .send({ title: "test plan", deadLine: tomorrow.toISOString(), description: "test description" })
                .expect(200);
        });

        it("should not create a plan without a title", async () => {
            await request(app)
                .post("/plan")
                .send({ deadLine: tomorrow, description: "test description" })
                .expect(400);
        });

        it("should not create a plan when description is not string", async () => {
            await request(app)
                .post("/plan")
                .send({ title: "test plan", deadLine: tomorrow, description: 12345 })
                .expect(400);
        });

        it("should not create a plan when deadLine is not valid", async () => {
            await request(app)
                .post("/plan")
                .send({ title: "test plan", deadLine: "invalid date", description: "test description" })
                .expect(400);
        });
    });
});
