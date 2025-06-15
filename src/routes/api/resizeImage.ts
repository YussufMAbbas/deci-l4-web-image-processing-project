import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import processImage from "../../utilities/processImage.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resizeImage = Router();

resizeImage.post("/", async (req: Request, res: Response): Promise<void> => {
    const { imageName, width, height } = req.body;

    const w = parseInt(width);
    const h = parseInt(height);
    const imagePath = path.resolve(__dirname, "../../../images", imageName);
    const imageOutputFolderPath = path.resolve(
        __dirname,
        "../../../images/resized",
    );
    const imageOutputPath = path.resolve(
        imageOutputFolderPath,
        imageName + `-${w}x${h}.jpg`,
    );

    if (!imageName || !w || !h) {
        res.status(400).json({ error: "Missing or invalid required fields." });
        return;
    } else if (!fs.existsSync(imagePath)) {
        res.status(404).json({ path: imagePath, error: "Image not found." });
        return;
    }

    if (!fs.existsSync(imageOutputFolderPath)) {
        fs.mkdirSync(imageOutputFolderPath, { recursive: true });
        console.log("Resized images folder created.");
    }
    if (fs.existsSync(path.resolve(imageOutputPath))) {
        res.set("Content-Type", "image/jpeg");
        res.send(
            fs.readFileSync(
                path.resolve(
                    __dirname,
                    "../../../images/resized",
                    imageName + `-${w}x${h}.jpg`,
                ),
            ),
        );
        console.log("Image already exists.");
        return;
    }
    try {
        await processImage(imagePath, w, h, imageOutputPath);
    } catch (err) {
        console.error("Error processing image:", err);
        res.status(500).json({ error: "Error processing image." });
        return;
    }

    res.set("Content-Type", "image/jpeg");
    res.sendFile(imageOutputPath);
    console.log("Image was resized and saved successfully.");
});

export default resizeImage;
