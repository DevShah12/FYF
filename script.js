

// Black Friday Countdown Timer
const eventDate = new Date("2024-12-29T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');

    

    document.getElementById('countdown').textContent = `Black Friday Sale: Time left - ${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').textContent = "Black Friday Sale is Live!";
    }
}
const countdownInterval = setInterval(updateCountdown, 1000);

// Form Validation
function validateForm() {
    const nameField = document.querySelector('input[placeholder="Enter your name"]');
    const emailField = document.querySelector('input[placeholder="Enter your email"]');
    const messageField = document.querySelector('textarea[placeholder="Write your message"]');

    const name = nameField ? nameField.value.trim() : "";
    const email = emailField ? emailField.value.trim() : "";
    const message = messageField ? messageField.value.trim() : "";

    if (!name) {
        alert("Name is required.");
        return false;
    }
    if (!email || !email.includes("@")) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!message) {
        alert("Message cannot be empty.");
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}

// Dynamically Attach Last Updated Time to Footer
function addLastUpdated() {
    const footer = document.querySelector('footer');
    const lastUpdated = document.createElement('p');
    const now = new Date();

    // Format the date and time
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    lastUpdated.textContent = `Last Updated: ${formattedDate} at ${formattedTime}`;
    lastUpdated.style.marginTop = '10px';
    lastUpdated.style.fontSize = '0.9rem';

    footer.appendChild(lastUpdated);
}

// Initialize all scripts after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Attach form validation
    const submitButton = document.querySelector('button[onclick="validateForm()"]');
    if (submitButton) {
        submitButton.addEventListener('click', validateForm);
    }

    // Add last updated time to footer
    addLastUpdated();
});