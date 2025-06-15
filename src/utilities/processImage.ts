import sharp from "sharp";

async function processImage(
    imagePath: string,
    w: number,
    h: number,
    imageOutputPath: string,
) {
    await sharp(imagePath).resize(w, h).toFile(imageOutputPath);
}

export default processImage;
