// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


//
// Place any custom JS here
//

// Dark Mode Switch
document.addEventListener('DOMContentLoaded', (event) => {
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById('darkModeSwitch');

    // Set the default theme to dark if no setting is found in local storage
    const currentTheme = localStorage.getItem('bsTheme') || 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    switchElement.checked = currentTheme === 'dark';

    switchElement.addEventListener('change', function () {
        if (this.checked) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('bsTheme', 'dark');
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('bsTheme', 'light');
        }
    });


    const matchPrefersLight = window.matchMedia('(prefers-color-scheme:light)');
    if (matchPrefersLight.matches) {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
    matchPrefersLight.addEventListener('change', event => {
        document.documentElement.setAttribute('data-bs-theme', event.matches ? "light" : "dark");
    });

});