// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Arrows effect

const section = document.querySelector(".arrow-section");
const footer = document.querySelector(".footer");
const cols = 10; // Number of columns in the grid
const rows = 6; // Number of rows in the grid
const arrows = [];

// Function to check if CSS is enabled
function isCSSEnabled() {
    const testElement = document.createElement("div");
    testElement.style.display = "none";
    document.body.appendChild(testElement);
    const isHidden = window.getComputedStyle(testElement).display === "none";
    document.body.removeChild(testElement);
    return isHidden;
}

// Create a grid of arrows
if (isCSSEnabled() && section) {
    for (let i = 0; i < rows * cols; i++) {
        const arrow = document.createElement("div");
        arrow.classList.add("arrow");
        arrow.innerHTML = "→";
        section.appendChild(arrow);
        arrows.push(arrow);
    }

    // Track mouse movement and update arrow direction
    footer.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        const sectionRect = section.getBoundingClientRect();

        arrows.forEach((arrow) => {
            const arrowRect = arrow.getBoundingClientRect();
            const arrowX = arrowRect.left + arrowRect.width / 2;
            const arrowY = arrowRect.top + arrowRect.height / 2;

            // Calculate angle between arrow and cursor
            const angle = Math.atan2(clientY - arrowY, clientX - arrowX) * (180 / Math.PI);
            arrow.style.transform = `rotate(${angle}deg)`;
        });
    });
}


const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Smooth scroll to top
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const parallaxImg = document.querySelector(".parallax-img");

    // Moves the image at a slower pace (adjust multiplier for effect strength)
    parallaxImg.style.transform = `translateY(${scrollTop * 0.2}px)`;

    // Fade effect: Reduce opacity as user scrolls down
    let opacity = 1 - scrollTop / 800; // Adjust 600 for fade speed
    parallaxImg.style.opacity = opacity > 0 ? opacity : 0;
});

// Check system preference
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
} else {
    document.documentElement.setAttribute("data-bs-theme", "light");
}

// Listen for changes (auto-switch)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    document.documentElement.setAttribute("data-bs-theme", event.matches ? "dark" : "light");
});

//Password
const correctPassword = "Paulo-2025";
const sessionKey = "portfolioAccess";
let modalElement = document.getElementById("passwordModal");
let modal = new bootstrap.Modal(modalElement);
let passwordInput = document.getElementById("passwordInput");
let errorMessage = document.getElementById("error-message");
let submitBtn = document.getElementById("submitBtn");

function checkPassword() {
    const enteredPassword = passwordInput.value;

    if (enteredPassword === correctPassword) {
        sessionStorage.setItem(sessionKey, "granted");
        modal.hide();
        showPortfolio();
    } else {
        errorMessage.classList.remove("visually-hidden");
        modalElement.classList.add("shake");
        passwordInput.setAttribute("aria-invalid", "true");  // Screen readers detect invalid input
        passwordInput.focus();  // Keep focus on input field
        setTimeout(() => modalElement.classList.remove("shake"), 300);
    }
}

function showPortfolio() {
    document.getElementById("portfolioContent").style.display = "block";
}

function checkAccess() {
    if (sessionStorage.getItem(sessionKey) === "granted") {
        showPortfolio();
    } else {
        modal.show();
        setTimeout(() => passwordInput.focus(), 500);  // Auto-focus input when modal opens
    }
}

document.addEventListener("DOMContentLoaded", checkAccess);
submitBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();  // Allow Enter key to submit
});



console.log("Hey there, inspector! 🕵️‍♂️ I’m just a non-developer trying my hand at creating my online portfolio 😅. Let me know if you’re taking a peek!");