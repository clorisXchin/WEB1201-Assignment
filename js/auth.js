/*
    This file is used for the three-step registration form
    and the simple simulated login form. It uses localStorage, so the account is only saved inside the user's browser. It is not a real database.
*/


/*
    Store the current registration step.
    0 = Step 1, 1 = Step 2, 2 = Step 3.
*/
var currentStep = 0;

/* Get the registration form and its main buttons. */
var registerForm = document.getElementById("registerForm");
var nextButton = document.getElementById("nextStep");
var backButton = document.getElementById("prevStep");
var registerButton = document.getElementById("submitRegister");
var registerSuccess = document.getElementById("registerSuccess");


/*
    Show an error beside one input. inputId gets the input's ID.
    message gets the text that should be displayed.
*/
function showInputError(inputId, message) {
    /* Get the input using the ID sent into the function. */
    var input = document.getElementById(inputId);
    /*
        parentNode finds the form-group containing the input.
        Then the code finds the first error-message element inside it.
    */
    var errorBox =
        input.parentNode.getElementsByClassName("error-message")[0];
    /* Put the error text inside the error box. */
    errorBox.innerHTML = message;
}

/* Clear an old error before checking the input again. */
function clearInputError(inputId) {
    var input = document.getElementById(inputId);
    var errorBox =
        input.parentNode.getElementsByClassName("error-message")[0];
    /* An empty string removes the old message. */
    errorBox.innerHTML = "";
}
/*
    Validate one registration step. It returns true if the step is correct,or false if there is an input problem.
*/
function validateRegistrationStep(stepNumber) {
    /* Start by assuming that the step is valid. */
    var valid = true;
    /* Step 1 checks the name and phone number. */
    if (stepNumber === 0) {
        /* Get the values entered by the user. */
        var fullName = document.getElementById("fullName").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        /* Clear previous errors before checking again. */
        clearInputError("fullName");
        clearInputError("phoneNumber");
        /* The name cannot be empty. */
        if (fullName === "") {
            showInputError("fullName", "Please enter your full name.");
            valid = false;
        }
        /*
            The phone number is rejected when: it is empty,isNaN reports that it is not a number, it is shorter than 10 digits, it is longer than 11 digits
        */
        if (
            phoneNumber === "" ||
            isNaN(phoneNumber) === true ||
            phoneNumber.length < 10 ||
            phoneNumber.length > 11
        ) {
            showInputError(
                "phoneNumber",
                "Enter a phone number with 10 or 11 digits."
            );
            valid = false;
        }

    } else if (stepNumber === 1) {
        /* Step 2 checks the email address and password. */
        var email = document.getElementById("registerEmail").value;
        var password = document.getElementById("registerPassword").value;
        /* Clear previous Step 2 errors. */
        clearInputError("registerEmail");
        clearInputError("registerPassword");
        /*
            This is a basic email check. The email is rejected when it is empty,
            when @ is missing or appears first, or when a dot does not appear after @.
        */
        if (
            email === "" ||
            email.indexOf("@") < 1 ||
            email.indexOf(".") < email.indexOf("@") + 2
        ) {
            showInputError(
                "registerEmail",
                "Please enter a valid email address."
            );
            valid = false;
        }

        /* Require at least 6 password characters. */
        if (password.length < 6) {
            showInputError(
                "registerPassword",
                "Password must contain at least 6 characters."
            );
            valid = false;
        }

    } else if (stepNumber === 2) {
        /* Step 3 checks whether a drink was selected. */
        var favouriteDrink =
            document.getElementById("favouriteDrink").value;
        clearInputError("favouriteDrink");
        /* The first dropdown option uses an empty value. */
        if (favouriteDrink === "") {
            showInputError(
                "favouriteDrink",
                "Please choose your favourite drink."
            );
            valid = false;
        }
    }
    /* Send the final true or false result back. */
    return valid;
}


/* Show only the current form step and update the progress indicator. */
function showRegistrationStep() {
    /* Get all three fieldsets and all three progress labels. */
    var formSteps = document.getElementsByClassName("form-step");
    var progressSteps = document.getElementsByClassName("progress-step");
    var i;
    /* Remove active from every step first. */
    for (i = 0; i < formSteps.length; i++) {
        formSteps[i].className = "form-step";
        progressSteps[i].className = "progress-step";
    }
    /* Add active only to the current step. */
    formSteps[currentStep].className = "form-step active";
    progressSteps[currentStep].className = "progress-step active";
    /* Hide Back during Step 1 because there is no earlier step. */
    if (currentStep === 0) {
        backButton.classList.add("hidden");
    } else {
        backButton.classList.remove("hidden");
    }
    /*
        formSteps.length is 3, so the final position is 3 - 1 = 2.
        On the final step, hide Next and show Create Account.
    */
    if (currentStep === formSteps.length - 1) {
        nextButton.classList.add("hidden");
        registerButton.classList.remove("hidden");
    } else {
        nextButton.classList.remove("hidden");
        registerButton.classList.add("hidden");
    }
}


/* Move forward only when the current step passes validation. */
function goToNextStep() {
    if (validateRegistrationStep(currentStep) === true) {
        currentStep++;
        showRegistrationStep();
    }
}


/* Move back one step without allowing the value to go below 0. */
function goToPreviousStep() {
    if (currentStep > 0) {
        currentStep--;
        showRegistrationStep();
    }
}
/* Complete the simple simulated registration. */
function completeRegistration() {
    /* Stop when the final step is invalid. */
    if (validateRegistrationStep(2) === false) {
        return false;
    }

    /* Get all completed form values. */
    var fullName = document.getElementById("fullName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;
    var favouriteDrink = document.getElementById("favouriteDrink").value;

    /* .checked returns true or false for the newsletter checkbox. */
    var newsletter = document.getElementById("newsletter").checked;

    /*
        Save one simple simulated account in localStorage.
        This is not a real database, so the account is only available in this browser.
    */
    localStorage.setItem("willowName", fullName);
    localStorage.setItem("willowPhone", phoneNumber);
    localStorage.setItem("willowEmail", email);
    localStorage.setItem("willowPassword", password);
    localStorage.setItem("willowDrink", favouriteDrink);
    localStorage.setItem("willowNewsletter", newsletter);
    /* Show a success message using the registered name. */
    registerSuccess.innerHTML =
        "Account created for " +
        fullName +
        ". You can now use the login page.";
    /* Clear the form and return to Step 1. */
    registerForm.reset();
    currentStep = 0;
    showRegistrationStep();
    /* Prevent the normal form submission and page reload. */
    return false;
}

/* Only add registration events on the registration page. */
if (registerForm !== null) {
    nextButton.onclick = goToNextStep;
    backButton.onclick = goToPreviousStep;
    registerForm.onsubmit = completeRegistration;
    /* Set the correct display when the page first opens. */
    showRegistrationStep();
}


/* LOGIN SECTION*/

/* Get the login form and its message areas. */
var loginForm = document.getElementById("loginForm");
var loginMessage = document.getElementById("loginMessage");
var loginGreeting = document.getElementById("loginGreeting");

/* Check the entered login details against the saved registration. */
function checkLogin() {
    /* Get the values entered on the login page. */
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    /* Get the account information saved during registration. */
    var savedEmail = localStorage.getItem("willowEmail");
    var savedPassword = localStorage.getItem("willowPassword");
    var savedName = localStorage.getItem("willowName");
    /* Clear messages left from an earlier login attempt. */
    loginMessage.innerHTML = "";
    loginGreeting.innerHTML = "";

    /* Both fields are required. */
    if (email === "" || password === "") {
        loginMessage.innerHTML = "Please enter your email and password.";
    } else if (savedEmail === null || savedPassword === null) {
        /* null means no account was saved in this browser. */
        loginMessage.innerHTML =
            "No registered account was found in this browser.";
    } else if (email !== savedEmail || password !== savedPassword) {
        /* The login fails when either value does not match. */
        loginMessage.innerHTML = "The email or password is incorrect.";
    } else {
        /* All checks passed, so display the saved name. */
         /* Save the successful login status. */
    localStorage.setItem("willowLoggedIn", "true");
    /* Save the name of the currently logged-in user. */
    localStorage.setItem("willowCurrentUser", savedName);
    /* Show the greeting on the login page. */
    loginGreeting.innerHTML = "Welcome back, " + savedName + "!";
    /* Change Login to Hi, name in the navigation. */
    updateLoginLink();
    /* Clear the login fields. */
    loginForm.reset();
    }
    /* Prevent the form from reloading the page. */
    return false;
}

/* Only add the login event on a page containing loginForm. */
if (loginForm !== null) {
    loginForm.onsubmit = checkLogin;
}
