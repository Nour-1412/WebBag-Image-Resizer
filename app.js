// ==========================
// ELEMENTS
// ==========================

const imageInput = document.getElementById("imageInput");
const chooseImage = document.getElementById("chooseImage");
const dropArea = document.getElementById("dropArea");
const originalPreview = document.getElementById("originalPreview");
const resizedPreview = document.getElementById("resizedPreview");

const resizeWidth = document.getElementById("resizeWidth");
const resizeHeight = document.getElementById("resizeHeight");

const keepRatio = document.getElementById("keepRatio");
const formatSelect = document.getElementById("formatSelect");
const resizeBtn = document.getElementById("resizeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const originalSize = document.getElementById("originalSize");
const originalResolution = document.getElementById("originalResolution");
const originalFormat = document.getElementById("originalFormat");

const resizedSize = document.getElementById("resizedSize");
const resizedResolution = document.getElementById("resizedResolution");
const savedPercent = document.getElementById("savedPercent");
const qualityRange = document.getElementById("qualityRange");
const qualityValue = document.getElementById("qualityValue");
qualityRange.addEventListener("input", () => {

    qualityValue.textContent = qualityRange.value + "%";

});
let currentImage = null;
let currentFile = null;
let originalWidth = 0;
let originalHeight = 0;
// ==========================
// CHOOSE IMAGE
// ==========================

chooseImage.addEventListener("click", () => {

    imageInput.click();

});
// ==========================
// LOAD IMAGE
// ==========================

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];
    currentFile = file;

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        const img = new Image();

        img.onload = function(){

    currentImage = img;

    originalWidth = img.width;
    originalHeight = img.height;

    resizeWidth.value = originalWidth;
    resizeHeight.value = originalHeight;

    originalPreview.src = e.target.result;

    // Original Info

    originalSize.textContent =
        "Size: " + (file.size / 1024).toFixed(1) + " KB";

    originalResolution.textContent =
        "Resolution: " + img.width + " × " + img.height;

    originalFormat.textContent =
        "Format: " + file.type.replace("image/","").toUpperCase();

};

        img.src = e.target.result;

    };

    reader.readAsDataURL(file);

});
// ==========================
// KEEP ASPECT RATIO
// ==========================

resizeWidth.addEventListener("input", () => {

    if(!keepRatio.checked) return;

    const ratio = originalHeight / originalWidth;

    resizeHeight.value = Math.round(resizeWidth.value * ratio);

});
// ==========================
// RESIZE IMAGE
// ==========================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resizeBtn.addEventListener("click", () => {

    if (!currentImage) return;

    canvas.width = Number(resizeWidth.value);

    canvas.height = Number(resizeHeight.value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        currentImage,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const quality = qualityRange.value / 100;

const selectedFormat = formatSelect.value;

const resizedData = canvas.toDataURL(
    selectedFormat,
    quality
);

resizedPreview.src = resizedData;

// معلومات الصورة الجديدة

const resizedSizeBytes =
    Math.round((resizedData.length * 3) / 4);

resizedSize.textContent =
    "Size: " + (resizedSizeBytes / 1024).toFixed(1) + " KB";

resizedResolution.textContent =
    "Resolution: " + canvas.width + " × " + canvas.height;

const percent =
    ((currentFile.size - resizedSizeBytes) / currentFile.size) * 100;

savedPercent.textContent =
    "Saved: " + percent.toFixed(1) + "%";

downloadBtn.style.display = "inline-block";

});
// ==========================
// DOWNLOAD
// ==========================

// ==========================
// DOWNLOAD
// ==========================

downloadBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.href = resizedPreview.src;

    let extension = "png";

if (formatSelect.value === "image/jpeg") {

    extension = "jpg";

}

if (formatSelect.value === "image/webp") {

    extension = "webp";

}

link.download = "resized-image." + extension;

    link.click();

});
// ==========================
// DRAG & DROP
// ==========================

// منع المتصفح من فتح الصورة

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {

    dropArea.addEventListener(eventName, e => {

        e.preventDefault();
        e.stopPropagation();

    });

});

// عند دخول الصورة

["dragenter", "dragover"].forEach(eventName => {

    dropArea.addEventListener(eventName, () => {

        dropArea.classList.add("dragging");

    });

});

// عند الخروج

["dragleave", "drop"].forEach(eventName => {

    dropArea.addEventListener(eventName, () => {

        dropArea.classList.remove("dragging");

    });

});

// عند إفلات الصورة

dropArea.addEventListener("drop", e => {

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert("Please drop an image.");

        return;

    }

    imageInput.files = e.dataTransfer.files;

    imageInput.dispatchEvent(new Event("change"));

});

    

