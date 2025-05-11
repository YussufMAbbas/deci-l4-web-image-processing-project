import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resizeImage = Router();

resizeImage.post("/", async (req: Request, res: Response): Promise<void> => {
    const { imageName, width, height } = req.body;

    const w = parseInt(width);
    const h = parseInt(height);
    const imagePath = path.resolve(__dirname, "../../../images", imageName);

    if (!imageName || !w || !h) {
        res.status(400).json({ error: "Missing or invalid required fields." });
        return;
    } else if (!fs.existsSync(imagePath)) {
        res.status(404).json({ path: imagePath, error: "Image not found." });
        return;
    }

    try {
        sharp(imagePath)
            .resize(w, h)
            .toBuffer()
            .then((data) => {
                res.set("Content-Type", "image/jpeg");
                res.send(data);
                return;
            });
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: "Error processing image." });
        return;
    }
});

export default resizeImage;
