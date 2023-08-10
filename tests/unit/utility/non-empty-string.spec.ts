import { isNonEmptyString } from "../../../src/services/utility/non-empty-string";

describe("non-empty string", () => {
    it("should return true if value is string", () => {
        const result = isNonEmptyString("this is a string", "field");
        expect(result.state).toBeTruthy();
    });

    it("should return false if value is undefined", () => {
        const result = isNonEmptyString(undefined, "field");
        expect(result.message).toBe("field is required");
    });

    it("should return false if value is not a strimg", () => {
        const result = isNonEmptyString(234);
        expect(result.message).toBe("field should be a string");
    });

    it("should return false if value is string but length iz zero", () => {
        const result = isNonEmptyString("");
        expect(result.message).toBe("field cannot be empty");
    });
})