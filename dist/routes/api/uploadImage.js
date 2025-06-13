import { Router } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadImage = Router();
uploadImage.post("/", multer().single("image"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No image file uploaded." });
        return;
    }
    if (!req.file.mimetype.startsWith("image/")) {
        res.status(400).json({
            error: "Unsupported file type. Please upload a valid image.",
        });
        return;
    }
    const imageName = req.file.originalname + "-uploaded" + Date.now() + ".jpg";
    const imageOutputFolderPath = path.resolve(__dirname, "../../../images/");
    if (!fs.existsSync(imageOutputFolderPath)) {
        fs.mkdirSync(imageOutputFolderPath, { recursive: true });
        console.log("Uploaded images folder created.");
    }
    fs.writeFileSync(path.join(imageOutputFolderPath, imageName), req.file.buffer);
    res.status(200).json({
        message: "Image uploaded successfully.",
        imageName,
    });
});
export default uploadImage;
