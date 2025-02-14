// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

//import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

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