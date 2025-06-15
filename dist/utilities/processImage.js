import sharp from 'sharp';
async function processImage(imagePath, w, h, imageOutputPath) {
    await sharp(imagePath).resize(w, h).toFile(imageOutputPath);
}
export default processImage;
