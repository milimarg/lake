import QrScanner from "./qr-scanner.min.js";

const video = document.querySelector('.qr-video');
const videoContainer = document.querySelector('.video-container');
const camQrResult = document.querySelector(".cam-qr-result");
const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
const fileQrResult = document.getElementById('file-qr-result');

const noCamera = document.querySelector(".no-camera");
const result = document.querySelector(".result");

const changeCamera = document.querySelector(".change-camera");
let cameraEnv = true;
let cameraBool;

let qrResult;

const isthaturl = document.querySelector(".isthaturl");

changeCamera.addEventListener("click", function() {
    cameraBool = cameraEnv ? "environment" : "user";
    scanner.setCamera(cameraBool);
    cameraEnv = !cameraEnv;
});

function checkContentType(content, label) {
    videoContainer
    if (content.includes("http")) {
        isthaturl.style.display = "block";
        label.addEventListener("click", function() {
            window.open(content, "_BLANK");
        });
    }
}

function setResult(label, result) {
    qrResult = result.data;
    checkContentType(qrResult, label);
    label.textContent = qrResult;
    camQrResultTimestamp.textContent = new Date().toString();
    label.style.color = 'teal';
    clearTimeout(label.highlightTimeout);
    label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
}

// ##### Web Cam Scanning #####

const scanner = new QrScanner(video, result => setResult(camQrResult, result), {
    onDecodeError: error => {
        camQrResult.textContent = error;
        camQrResult.style.color = 'inherit';
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
});

scanner.start().then(() => {
    QrScanner.listCameras(true);
});

QrScanner.hasCamera().then(hasCamera => {
    if (!hasCamera) {
        noCamera.style.display = "block";
        videoContainer.style.display = "none";
        result.style.display = "none";
    }
});

window.scanner = scanner;

scanner.setInversionMode("both");

// ####### File Scanning #######

QrScanner.scanImage(file, { returnDetailedScanResult: true })
    .then(result => setResult(fileQrResult, result))
    .catch(e => setResult(fileQrResult, { data: e || 'Pas de code QR trouvé.' }));