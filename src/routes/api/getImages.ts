import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getImages = Router();
getImages.get("/", (_req: Request, res: Response): void => {
    const imagesFolderPath = path.resolve(__dirname, "../../../images");

    if (!fs.existsSync(imagesFolderPath)) {
        res.status(404).json({ error: "Images folder not found." });
        return;
    }

    fs.readdir(imagesFolderPath, (err, files) => {
        if (err) {
            console.error("Error reading images folder:", err);
            res.status(500).json({ error: "Error reading images folder." });
            return;
        }

        const imageFiles = files;
        const filtered = imageFiles.filter((file) => file !== "resized");
        if (filtered.length === 0) {
            res.status(404).json({ error: "No images found." });
            return;
        }
        res.status(200).json({ images: filtered });
    });
});

export default getImages;
