const imageInput = document.getElementById("image-input");
const uploadSubmit = document.getElementById("upload-submit");
const imageSelect = document.getElementById("image-select");
const resizeSubmit = document.getElementById("resize-submit");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const resizedImage = document.getElementById("resized-image");
const imageGallery = document.getElementById("image-gallery");

function updateImages() {
    fetch("/api/getImages")
        .then((response) => response.json())
        .then((data) => {
            data.images.forEach((image) => {
                const option = document.createElement("option");
                option.textContent = image;
                option.value = image;
                if (imageSelect.querySelector(`option[value="${image}"]`)) {
                    return;
                }
                imageSelect.appendChild(option);
                const imageElement = document.createElement("img");
                imageElement.src = `/images/${image}`;
                imageElement.alt = image;
                imageGallery.appendChild(imageElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching images:", error);
            alert("Failed to load images. Please try again later.");
        });
}
updateImages();

uploadSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const file = imageInput.files[0];
    if (!file) {
        alert("Please select an image file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch("/api/uploadImage", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert(`Image uploaded successfully: ${data.imageName}`);
        updateImages();
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
    }
});

resizeSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const imageName = imageSelect.value;
    const width = parseInt(widthInput.value, 10);
    const height = parseInt(heightInput.value, 10);

    if (!imageName) {
        alert("Please select an image");
        return;
    }
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        alert("Please enter valid dimensions for width and height.");
        return;
    }

    try {
        const response = await fetch("/api/resizeImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                imageName,
                width,
                height,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        resizedImage.src = url;
        resizedImage.alt = `Resized Image - ${imageName}`;
        resizedImage.style.display = "block";
        alert("Image resized successfully!");
    } catch (error) {
        console.error("Error resizing image:", error);
        alert("Failed to resize image. Please try again.");
    }
});
