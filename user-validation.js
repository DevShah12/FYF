function validateUserForm(name, email, password) {
    if (!name || name.trim().length < 2) {
        return { valid: false, error: "name" };
    }

    if (!email || !email.includes("@")) {
        return { valid: false, error: "email" };
    }

    if (!password || password.length < 6) {
        return { valid: false, error: "password" };
    }

    return { valid: true };
}

module.exports = validateUserForm;
