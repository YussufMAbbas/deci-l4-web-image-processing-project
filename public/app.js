const imageInput = document.getElementById('image-input');
const uploadSubmit = document.getElementById('upload-submit');

uploadSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('/api/uploadImage', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert(`Image uploaded successfully: ${data.imageName}`);
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
    }
});