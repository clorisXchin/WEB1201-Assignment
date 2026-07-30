/* This function reads the saved colour choice from localStorage and applies it when a new Willow Coffee page opens. */
function applySavedTheme() {
    var savedTheme = localStorage.getItem("willowTheme");
    var themeButton = document.getElementById("themeToggle");

    if (savedTheme === "dark") {
        document.body.className = "dark-theme";
        if (themeButton !== null) {
            themeButton.textContent = "Light Theme";
            themeButton.setAttribute("aria-pressed", "true");
        }
    } else {
        document.body.className = "";
        if (themeButton !== null) {
            themeButton.textContent = "Dark Theme";
            themeButton.setAttribute("aria-pressed", "false");
        }
    }
}

/* This function switches between light and dark themes, then stores the user's choice so the same theme continues across all pages. */
function toggleTheme() {
    var themeButton = document.getElementById("themeToggle");

    if (document.body.className === "dark-theme") {
        document.body.className = "";
        localStorage.setItem("willowTheme", "light");
        themeButton.textContent = "Dark Theme";
        themeButton.setAttribute("aria-pressed", "false");
    } else {
        document.body.className = "dark-theme";
        localStorage.setItem("willowTheme", "dark");
        themeButton.textContent = "Light Theme";
        themeButton.setAttribute("aria-pressed", "true");
    }
}

/* This statement applies the saved theme after the page elements are available because the script is placed at the end of the HTML body. */
applySavedTheme();
