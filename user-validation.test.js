const validateUserForm = require("./user-validation");

describe("User Form Validation", () => {

    test("fails when name is too short", () => {
        const result = validateUserForm("A", "user@example.com", "secret123");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("name");
    });

    test("fails when name is empty", () => {
        const result = validateUserForm("", "user@example.com", "secret123");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("name");
    });

    test("fails when email is invalid", () => {
        const result = validateUserForm("User", "userexample.com", "secret123");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("email");
    });

    test("fails when password is too short", () => {
        const result = validateUserForm("User", "user@example.com", "123");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("password");
    });

    test("passes when all fields are valid", () => {
        const result = validateUserForm("User Test", "user@example.com", "secret123");
        expect(result.valid).toBe(true);
    });

});
