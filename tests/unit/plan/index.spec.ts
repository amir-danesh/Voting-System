import { validatedDate } from "../../../src/services/plan";
import { DateValidationError } from "../../../src/services/utility/app-error";

describe("Validate Date", () => {
    it("should return true if date is after the exact now", () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(validatedDate(tomorrow)).toBeTruthy();
    });

    it("should return false if date is before the exact now", () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        expect(() => validatedDate(yesterday)).toThrowError(DateValidationError);
    })
})