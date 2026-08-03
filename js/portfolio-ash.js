var downloadCvBtn = document.getElementById("downloadCvBtn");
var cvMessage = document.getElementById("cvMessage");

function downloadCV() {
    cvMessage.textContent =
        "This is a simulated download — in a real deployment, this button would download Ash's CV as a PDF.";
}

if (downloadCvBtn !== null) {
    downloadCvBtn.onclick = downloadCV;
}
