import { Router } from "express";
import resizeImage from "./api/resizeImage.js";
import uploadImage from "./api/uploadImage.js";
const router = Router();
router.use("/resizeImage", resizeImage);
router.use("/uploadImage", uploadImage);
router.get("/", (req, res) => {
    res.send("Connected to main router.");
});
export default router;
