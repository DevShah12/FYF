function validateAdminForm(email, password) {
    if (!email || !email.includes("@")) {
        return { valid: false, error: "email" };
    }

    if (!password || password.length < 6) {
        return { valid: false, error: "password" };
    }

    return { valid: true };
}

module.exports = validateAdminForm;
