/* This function opens and closes the small-screen navigation menu, and it also updates aria-expanded so keyboard and screen-reader users receive the correct menu state. */
function toggleNavigation() {
    var navigation = document.getElementById("mainNav");
    var button = document.getElementById("navToggle");

    if (navigation.className === "main-nav") {
        navigation.className = "main-nav open";
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", "Close navigation menu");
    } else {
        navigation.className = "main-nav";
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation menu");
    }
}

/* This function changes the Login navigation wording after a simulated login so the user receives a simple greeting on every page. */
function updateLoginLink() {
    var loginLink = document.getElementById("loginLink");
    var currentUser = localStorage.getItem("willowCurrentUser");

    if (loginLink !== null && currentUser !== null && currentUser !== "") {
        loginLink.textContent = "Hi, " + currentUser;
        loginLink.setAttribute("aria-label", "Open member page for " + currentUser);
    }
}

/* This statement runs after the shared script is loaded at the bottom of each page and prepares the cross-page login greeting. */
updateLoginLink();
