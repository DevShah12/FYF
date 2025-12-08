const validateAdminForm = require("./admin-validation");

describe("Admin Login Validation", () => {

    test("fails when email is empty", () => {
        const result = validateAdminForm("", "secret123");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("email");
    });

    test("fails when email does not contain @", () => {
        const result = validateAdminForm("adminexample.com", "secret123");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("email");
    });

    test("fails when password is shorter than 6 characters", () => {
        const result = validateAdminForm("admin@example.com", "123");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("password");
    });

    test("passes when both email and password are valid", () => {
        const result = validateAdminForm("admin@example.com", "secret123");
        expect(result.valid).toBe(true);
    });

});
