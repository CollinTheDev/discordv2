// script.js

// Function to show the selected settings section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Function to update account settings
function updateAccountSettings() {
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value;

    if (newUsername) {
        localStorage.setItem('username', newUsername);
        alert('Username updated successfully.');
    }

    if (newPassword) {
        // Here you would handle updating the password
        alert('Password updated successfully.');
    }
}

// On page load, show the account settings by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('account-settings');
});
