/* Check the enquiry form before allowing it to be sent. */
function validateEnquiry() {
    var visitorName = document.getElementById("visitorName").value;
    var visitorEmail = document.getElementById("visitorEmail").value;
    var enquirySubject = document.getElementById("enquirySubject").value;
    var enquiryMessage = document.getElementById("enquiryMessage").value;

    /* Stop the form if any required field is empty. */
    if (visitorName === "" ||
        visitorEmail === "" ||
        enquirySubject === "" ||
        enquiryMessage === "") {

        alert("Please complete all fields before sending your enquiry.");
        return false;
    }

    /* Allow the completed form to be submitted to Formspree. */
    return true;
}