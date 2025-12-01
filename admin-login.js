document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('admin-login-form');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Hardcoded admin credentials (for demo purposes)
    const adminCredentials = {
        email: "admin@fyf.com",
        password: "admin123"
    };

    // Handle admin login form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;

        // Clear previous error messages
        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        // Simple validation
        let isValid = true;

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            emailError.style.display = 'block';
            isValid = false;
        }

        // Validate password
        if (password !== adminCredentials.password) {
            passwordError.textContent = "Incorrect password. Please try again.";
            passwordError.style.display = 'block';
            isValid = false;
        }

        // If credentials are valid, redirect to Admin Dashboard
        if (isValid && email === adminCredentials.email && password === adminCredentials.password) {
            alert("Admin logged in successfully!");
            window.location.href = "admin-dashboard.html"; // Redirect to Admin Dashboard
        }
    });
});
