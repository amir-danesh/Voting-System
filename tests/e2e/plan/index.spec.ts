import request from "supertest";
import { app } from "../../../src";

describe("Plan", () => {
    describe("Create", () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const loginAdminAndReturnUserId = async () => {
            const user = await request(app).post("/login").send({ username: "admin", password: "admin" });
            return user.body.data.id;
        };

        it("should return 400 when userId is not provided in create a plan", async () => {
            await request(app)
                .post("/plan")
                .send({
                    title: "test plan",
                    deadLine: tomorrow.toISOString(),
                    description: "test description",
                })
                .expect(400);
        });

        it("should return 400 when userId is not valid in create a plan", async () => {
            await request(app)
                .post("/plan")
                .send({
                    title: "test plan",
                    deadLine: tomorrow.toISOString(),
                    description: "test description",
                    userId: "1234",
                })
                .expect(400);
        });

        it("should create plan if logged in", async () => {
            const userId = await loginAdminAndReturnUserId();

            await request(app).post("/plan").set("Authorization", userId).send({title: "test plan", deadLine: tomorrow.toISOString(), description: "test description"})
        });

        it("should throw Authenticated error when userId is not valid in create a plan", async () => {
            await request(app)
                .post("/plan")
                .send({
                    title: "test plan",
                    deadLine: tomorrow.toISOString(),
                    description: "test description",
                    userId: "1234",
                })
                .expect(400);
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
                .send({
                    title: "test plan",
                    deadLine: "invalid date",
                    description: "test description",
                })
                .expect(400);
        });
    });
});
