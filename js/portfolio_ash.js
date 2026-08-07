var downloadCvBtn = document.getElementById("downloadCvBtn");
var cvMessage = document.getElementById("cvMessage");

function downloadCV() {
    cvMessage.textContent =
        "This is only a simulated download";
}

if (downloadCvBtn !== null) {
    downloadCvBtn.onclick = downloadCV;
}
