import { userLogin } from "../../../src/services/user";

describe("User", () => {
    it("should return 200 if user exists", () => {
        const result = userLogin("admin", "admin");
        expect(result.status).toBe("ok");
    });

    it("should return 401 if user does not exist", () => {
        expect(userLogin("incorrect username", "admin")).toEqual({
            status: "fail",
            message: "username of password is incorrect",
        });
    });
});
