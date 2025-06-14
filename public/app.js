const imageInput = document.getElementById("image-input");
const uploadSubmit = document.getElementById("upload-submit");
const imageSelect = document.getElementById("image-select");

function updateImages() {
    fetch("/api/getImages")
        .then((response) => response.json())
        .then((data) => {
            data.images.forEach((image) => {
                const option = document.createElement("option");
                option.textContent = image;
                option.value = image;
                if (imageSelect.querySelector(`option[value="${image}"]`)) {
                    return; // Skip if the option already exists
                }
                imageSelect.appendChild(option);
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
