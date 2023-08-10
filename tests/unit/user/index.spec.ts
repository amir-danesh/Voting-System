import { userLogin } from "../../../src/services/user"

describe ("User", () => {
    it("should return 200 if user exists", () => {
        const result = userLogin("admin", "admin")
        expect(result.status).toBe(200);
    })

    it("should return 401 if user does not exist", () => {
        const result = userLogin("incorrect username", "admin");
        expect(result.status).toBe(401);
    })
})