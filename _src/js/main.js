(() => {
    "use strict"; // Enforce strict mode for better error handling

    // ✅ 1. Arrow Effect - Follow Mouse
    const section = document.querySelector(".arrow-section");
    const footer = document.querySelector(".footer");
    const cols = 10, rows = 6;
    const arrows = [];

    function isCSSEnabled() {
        const testElement = document.createElement("div");
        testElement.style.display = "none";
        document.body.appendChild(testElement);
        const isHidden = window.getComputedStyle(testElement).display === "none";
        document.body.removeChild(testElement);
        return isHidden;
    }

    if (isCSSEnabled() && section) {
        for (let i = 0; i < rows * cols; i++) {
            const arrow = document.createElement("div");
            arrow.classList.add("arrow");
            arrow.innerHTML = "→";
            section.appendChild(arrow);
            arrows.push(arrow);
        }

        footer.addEventListener("mousemove", (event) => {
            const { clientX, clientY } = event;
            arrows.forEach((arrow) => {
                const { left, top, width, height } = arrow.getBoundingClientRect();
                const angle = Math.atan2(clientY - (top + height / 2), clientX - (left + width / 2)) * (180 / Math.PI);
                arrow.style.transform = `rotate(${angle}deg)`;
            });
        });
    }

    // ✅ 2. Scroll to Top Button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ✅ 3. Parallax Effect (Only on Home Page)
    if (window.location.pathname.replace(window.location.origin, "").replaceAll("/", "").length === 0) {
        document.addEventListener("scroll", () => {
            const scrollTop = window.scrollY;
            const parallaxImg = document.querySelector(".parallax-img");
            if (parallaxImg) {
                parallaxImg.style.transform = `translateY(${scrollTop * 0.2}px)`;
                parallaxImg.style.opacity = Math.max(1 - scrollTop / 800, 0);
            }
        });
    }

    // ✅ 4. Dark Mode Handling (Auto-Detect System Theme)
    function applyTheme() {
        document.documentElement.setAttribute("data-bs-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    applyTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

    // ✅ 5. Password Protection (Except on Home Page)
    const correctPassword = "Paulo-2025";
    const sessionKey = "portfolioAccess";
    const modalElement = document.getElementById("passwordModal");
    const modal = modalElement ? new bootstrap.Modal(modalElement) : null;
    const passwordInput = document.getElementById("passwordInput");
    const errorMessage = document.getElementById("error-message");
    const submitBtn = document.getElementById("submitBtn");

    function isHomePage() {
        return window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");
    }

    function showModal() {
        if (modal) {
            modal.show();
            setTimeout(() => passwordInput?.focus(), 300);
        }
    }

    function hideModal() {
        if (modal) modal.hide();
    }

    function checkPassword() {
        if (!passwordInput) return;
        if (passwordInput.value.trim() === correctPassword) {
            sessionStorage.setItem(sessionKey, "granted");
            hideModal();
        } else {
            showErrorMessage();
        }
    }

    function showErrorMessage() {
        if (!errorMessage || !modalElement) return;
        errorMessage.classList.remove("visually-hidden");
        modalElement.classList.add("shake");
        passwordInput.setAttribute("aria-invalid", "true");
        passwordInput.focus();
        setTimeout(() => modalElement.classList.remove("shake"), 300);
    }

    function checkAccess() {
        if (!isHomePage() && !sessionStorage.getItem(sessionKey)) {
            showModal();
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (modalElement) {
            checkAccess();
            submitBtn?.addEventListener("click", checkPassword);
            passwordInput?.addEventListener("keypress", (e) => {
                if (e.key === "Enter") checkPassword();
            });
        }
    });

    // ✅ 6. Fun Console Easter Egg
    console.log("Hey there, inspector! 🕵️‍♂️ I’m just a non-developer trying my hand at creating my online portfolio 😅. Let me know if you’re taking a peek!");

})();
