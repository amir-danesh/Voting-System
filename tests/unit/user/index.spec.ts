import { UserService } from "../../../src/services/user";

const userService = new UserService();

describe("User", () => {
    it("should return 200 if user exists", async () => {
        const result = await userService.userLogin("admin", "admin");
        expect(result.status).toBe("ok");
    });

    it("should return 401 if user does not exist", async () => {
        expect(await userService.userLogin("incorrect username", "admin")).toEqual({
            status: "fail",
            message: "username or password is incorrect",
        });
    });

    it("should return user if user does exists",async  () => {
        expect(await userService.findUserByIDandRole("","Normal"))
    })
});

