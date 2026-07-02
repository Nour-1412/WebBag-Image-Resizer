// ==========================
// ELEMENTS
// ==========================

const imageInput = document.getElementById("imageInput");
const chooseImage = document.getElementById("chooseImage");

const originalPreview = document.getElementById("originalPreview");
const resizedPreview = document.getElementById("resizedPreview");

const resizeWidth = document.getElementById("resizeWidth");
const resizeHeight = document.getElementById("resizeHeight");

const keepRatio = document.getElementById("keepRatio");

const resizeBtn = document.getElementById("resizeBtn");
const downloadBtn = document.getElementById("downloadBtn");

let currentImage = null;
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


