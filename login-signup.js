document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('login-signup-form');
    const toggleFormLink = document.getElementById('toggle-form');
    let formHeading = document.getElementById('form-heading'); // Use let or ensure it is the form h2

    // If the h2 is outside the form, fetch the form box h2
    if (!formHeading || formHeading.tagName !== 'H2') {
         formHeading = form.closest('.form-box').querySelector('h2');
    }

    const submitBtn = document.getElementById('submit-btn');

    const nameField = document.getElementById('name-field');
    const phoneField = document.getElementById('phone-field');
    const confirmPasswordField = document.getElementById('confirm-password-field');

    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // Function to re-attach toggle listener
    function attachToggleListener() {
        const currentToggleLink = document.getElementById('toggle-form');
        if (currentToggleLink) {
             // Use a local function to prevent arguments.callee deprecation warnings
            currentToggleLink.addEventListener('click', toggleFormView);
        }
    }

    // Switch between Login and Signup Forms
    function toggleFormView() {
        if (formHeading.textContent.trim() === 'Login') {
            formHeading.textContent = 'Sign Up';
            submitBtn.textContent = 'Sign Up';
            nameField.style.display = 'block';
            phoneField.style.display = 'block';
            confirmPasswordField.style.display = 'block';
            form.action = "signup-user.php"; // Set action for signup
            document.getElementById('toggle-link').innerHTML = 'Already have an account? <a href="javascript:void(0)" id="toggle-form">Log In</a>';
        } else {
            formHeading.textContent = 'Login';
            submitBtn.textContent = 'Login';
            nameField.style.display = 'none';
            phoneField.style.display = 'none';
            confirmPasswordField.style.display = 'none';
            form.action = "login-user.php"; // Set action for login
            document.getElementById('toggle-link').innerHTML = 'Don\'t have an account? <a href="javascript:void(0)" id="toggle-form">Sign Up</a>';
        }
        // Re-attach listener after inner HTML change
        attachToggleListener(); 
    }

    if (toggleFormLink) {
        // Initial setup for the listener
        toggleFormLink.addEventListener('click', toggleFormView);
    }
    
    // Validation functions (as provided in original file)
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    function validatePhone(phone) {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    }
    function validatePassword(password) {
        // Updated regex for better client-side check
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        return passwordPattern.test(password);
    }

    // Handle form submission (Client-Side Validation only)
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Temporarily prevent submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(err => err.textContent = "");

        // Run client-side validation...
        if (!validateEmail(email)) {
            emailError.textContent = "Invalid email format. Please enter a valid email address (e.g., example@domain.com).";
            isValid = false;
        }

        if (formHeading.textContent.trim() === 'Sign Up') {
            const phone = document.getElementById('phone').value;
            if (!validatePhone(phone)) {
                phoneError.textContent = "Phone number must be exactly 10 digits.";
                isValid = false;
            }
        }

        if (!validatePassword(password)) {
            passwordError.textContent = "Password must be at least 8 characters long and include both letters and numbers.";
            isValid = false;
        }

        if (formHeading.textContent.trim() === 'Sign Up') {
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                confirmPasswordError.textContent = "Passwords do not match. Please confirm your password.";
                isValid = false;
            }
        }

        // If client-side validation passes, allow the form to submit to PHP
        if (isValid) {
            form.submit(); // Manually submit the form to the PHP script
        }
    });
});