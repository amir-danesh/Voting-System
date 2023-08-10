import request from "supertest";
import { app } from "../../../src";

describe("User", () => {
    describe("Login", () => {
        it("should return 200 if username and password are correct", async () => {
            await request(app).post("/login").send({ username: "admin", password: "admin" }).expect(200);
        });

        it("should return 401 if username is incorrect", async () => {
            await request(app).post("/login").send({ username: "wrongUsername", password: "admin" }).expect(401);
        });

        it("should return 401 if password is incorrect", async () => {
            await request(app).post("/login").send({ username: "admin", password: "wrongPassword" }).expect(401);
        });

        it("should return 401 if username or password are not provided", async () => {
            await request(app).post("/login").send({ username: "admin" }).expect(401);
        })

        it("should return 401 if username or password are provided out of string context", async () => {
            await request(app).post("/login").send({ username: null, password: 123456 }).expect(401);
        })
    });
});
