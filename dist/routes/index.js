import { Router } from "express";
import resizeImage from "./api/resizeImage.js";
import uploadImage from "./api/uploadImage.js";
import getImages from "./api/getImages.js";
const router = Router();
router.use("/resizeImage", resizeImage);
router.use("/uploadImage", uploadImage);
router.use("/getImages", getImages);
router.get("/", (req, res) => {
    res.send("Connected to main router.");
});
export default router;
